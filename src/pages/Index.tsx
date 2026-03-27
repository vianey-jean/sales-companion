import { useState } from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import KpiCard from "@/components/KpiCard";
import SalesTable from "@/components/SalesTable";
import AddSaleDialog from "@/components/AddSaleDialog";
import { initialSales, Sale } from "@/lib/sales-data";

const Index = () => {
  const [sales, setSales] = useState<Sale[]>(initialSales);

  const totalRevenue = sales.filter((s) => s.status !== "cancelled").reduce((sum, s) => sum + s.total, 0);
  const completedSales = sales.filter((s) => s.status === "completed").length;
  const uniqueClients = new Set(sales.map((s) => s.client)).size;
  const avgOrder = completedSales > 0 ? totalRevenue / completedSales : 0;

  const handleAddSale = (sale: Sale) => setSales([sale, ...sales]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight">VenteFlow</h1>
          </div>
          <AddSaleDialog onAdd={handleAddSale} nextId={sales.length + 1} />
        </div>
      </header>

      {/* Content */}
      <main className="container py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Chiffre d'affaires"
            value={`${totalRevenue.toLocaleString("fr-FR")} €`}
            icon={DollarSign}
            trend={{ value: "+12.5%", positive: true }}
            subtitle="vs mois dernier"
          />
          <KpiCard
            title="Ventes terminées"
            value={String(completedSales)}
            icon={ShoppingCart}
            trend={{ value: "+3", positive: true }}
            subtitle="cette semaine"
          />
          <KpiCard
            title="Clients actifs"
            value={String(uniqueClients)}
            icon={Users}
            trend={{ value: "+2", positive: true }}
            subtitle="nouveaux"
          />
          <KpiCard
            title="Panier moyen"
            value={`${Math.round(avgOrder).toLocaleString("fr-FR")} €`}
            icon={TrendingUp}
            trend={{ value: "+8.2%", positive: true }}
            subtitle="vs mois dernier"
          />
        </div>

        {/* Sales Table */}
        <SalesTable sales={sales} />
      </main>
    </div>
  );
};

export default Index;
