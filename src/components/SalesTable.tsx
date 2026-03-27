import { Sale } from "@/lib/sales-data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusMap = {
  completed: { label: "Terminée", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "En cours", className: "bg-accent/10 text-accent border-accent/20" },
  cancelled: { label: "Annulée", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const SalesTable = ({ sales }: { sales: Sale[] }) => (
  <div className="bg-card rounded-lg border animate-fade-in">
    <div className="p-6 border-b">
      <h2 className="text-lg font-display font-semibold">Ventes récentes</h2>
      <p className="text-sm text-muted-foreground mt-1">{sales.length} transactions</p>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Réf</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Produit</TableHead>
          <TableHead className="text-center">Qté</TableHead>
          <TableHead className="text-right">Montant</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-center">Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => {
          const status = statusMap[sale.status];
          return (
            <TableRow key={sale.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">{sale.id}</TableCell>
              <TableCell className="font-medium">{sale.client}</TableCell>
              <TableCell className="text-muted-foreground">{sale.product}</TableCell>
              <TableCell className="text-center">{sale.quantity}</TableCell>
              <TableCell className="text-right font-medium">{sale.total.toLocaleString("fr-FR")} €</TableCell>
              <TableCell className="text-right text-muted-foreground text-sm">
                {new Date(sale.date).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={status.className}>{status.label}</Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

export default SalesTable;
