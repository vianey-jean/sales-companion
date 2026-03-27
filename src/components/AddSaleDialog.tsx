import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Sale } from "@/lib/sales-data";

interface AddSaleDialogProps {
  onAdd: (sale: Sale) => void;
  nextId: number;
}

const AddSaleDialog = ({ onAdd, nextId }: AddSaleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ client: "", product: "", quantity: "1", unitPrice: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(form.quantity);
    const price = parseFloat(form.unitPrice);
    if (!form.client || !form.product || isNaN(qty) || isNaN(price)) return;

    onAdd({
      id: `V-${String(nextId).padStart(3, "0")}`,
      client: form.client,
      product: form.product,
      quantity: qty,
      unitPrice: price,
      total: qty * price,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    });
    setForm({ client: "", product: "", quantity: "1", unitPrice: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
          <Plus className="h-4 w-4 mr-2" /> Nouvelle vente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Ajouter une vente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Client</Label>
            <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Nom du client" />
          </div>
          <div className="space-y-2">
            <Label>Produit</Label>
            <Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="Nom du produit" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Prix unitaire (€)</Label>
              <Input type="number" min="0" step="0.01" value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
            </div>
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Ajouter</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSaleDialog;
