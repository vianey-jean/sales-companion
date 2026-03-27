import { Shield, StopCircle, RotateCcw } from "lucide-react";

interface ParametresSectionProps {
  autoBackupEnabled: boolean;
  autoBackupPending: boolean;
  countdownSeconds: number;
  lastBackupTime: string | null;
  onStopBackup: () => void;
  onStartBackup: () => void;
}

const ParametresSection = ({
  autoBackupEnabled,
  autoBackupPending,
  countdownSeconds,
  lastBackupTime,
  onStopBackup,
  onStartBackup,
}: ParametresSectionProps) => {
  return (
    <div className="bg-card rounded-lg border p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-accent" />
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Zone Administrateur
        </span>
        {autoBackupEnabled && autoBackupPending && countdownSeconds > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent animate-pulse font-mono">
            Sauvegarde auto dans {Math.floor(countdownSeconds / 60)} min{" "}
            {String(countdownSeconds % 60).padStart(2, "0")} s
          </span>
        )}
        {autoBackupEnabled ? (
          <button
            onClick={onStopBackup}
            title="Arrêter la sauvegarde automatique"
            className="ml-1 p-1 rounded-md hover:bg-destructive/10 transition-colors"
          >
            <StopCircle className="w-4 h-4 text-destructive" />
          </button>
        ) : (
          <button
            onClick={onStartBackup}
            title="Redémarrer la sauvegarde automatique"
            className="ml-1 p-1 rounded-md hover:bg-success/10 transition-colors"
          >
            <PlayCircle className="w-4 h-4 text-success" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Sauvegarde automatique</span>
          <span className={`font-medium ${autoBackupEnabled ? "text-success" : "text-destructive"}`}>
            {autoBackupEnabled ? "Activée" : "Désactivée"}
          </span>
        </div>
        {lastBackupTime && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dernière sauvegarde</span>
            <span className="font-mono text-xs text-muted-foreground">{lastBackupTime}</span>
          </div>
        )}
        {!autoBackupEnabled && (
          <p className="text-xs text-destructive/80 mt-2">
            ⚠ La sauvegarde automatique est arrêtée. Les nouvelles données ne seront pas sauvegardées tant que vous ne la redémarrez pas.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParametresSection;
