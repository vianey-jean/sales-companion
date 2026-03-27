import { useState, useEffect, useCallback, useRef } from "react";
import { Sale } from "@/lib/sales-data";

const AUTO_BACKUP_INTERVAL = 300; // 5 minutes in seconds

export function useAutoBackup(sales: Sale[]) {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [autoBackupPending, setAutoBackupPending] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(AUTO_BACKUP_INTERVAL);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const previousSalesRef = useRef<string>(JSON.stringify(sales));

  // Detect data changes
  useEffect(() => {
    const currentData = JSON.stringify(sales);
    if (currentData !== previousSalesRef.current) {
      previousSalesRef.current = currentData;
      if (autoBackupEnabled) {
        setAutoBackupPending(true);
        setCountdownSeconds(AUTO_BACKUP_INTERVAL);
      }
    }
  }, [sales, autoBackupEnabled]);

  // Countdown timer
  useEffect(() => {
    if (!autoBackupPending || !autoBackupEnabled || countdownSeconds <= 0) return;

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          // Perform backup
          try {
            localStorage.setItem("venteflow_backup", JSON.stringify(sales));
            setLastBackupTime(new Date().toLocaleTimeString("fr-FR"));
          } catch (e) {
            console.error("Erreur sauvegarde:", e);
          }
          setAutoBackupPending(false);
          return AUTO_BACKUP_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoBackupPending, autoBackupEnabled, countdownSeconds, sales]);

  const stopAutoBackup = useCallback(() => {
    setAutoBackupEnabled(false);
    setAutoBackupPending(false);
    setCountdownSeconds(AUTO_BACKUP_INTERVAL);
  }, []);

  const startAutoBackup = useCallback(() => {
    setAutoBackupEnabled(true);
    // Check if data changed since last backup
    const lastBackup = localStorage.getItem("venteflow_backup");
    const currentData = JSON.stringify(sales);
    if (lastBackup !== currentData) {
      setAutoBackupPending(true);
      setCountdownSeconds(AUTO_BACKUP_INTERVAL);
    }
  }, [sales]);

  return {
    autoBackupEnabled,
    autoBackupPending,
    countdownSeconds,
    lastBackupTime,
    stopAutoBackup,
    startAutoBackup,
  };
}
