export interface Sale {
  id: string;
  client: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

export const initialSales: Sale[] = [
  { id: "V-001", client: "Martin Dupont", product: "Licence Pro", quantity: 2, unitPrice: 499, total: 998, date: "2026-03-27", status: "completed" },
  { id: "V-002", client: "Sophie Laurent", product: "Formation Premium", quantity: 1, unitPrice: 1200, total: 1200, date: "2026-03-26", status: "completed" },
  { id: "V-003", client: "Tech Solutions", product: "Pack Entreprise", quantity: 5, unitPrice: 899, total: 4495, date: "2026-03-25", status: "pending" },
  { id: "V-004", client: "Pierre Bernard", product: "Licence Standard", quantity: 1, unitPrice: 299, total: 299, date: "2026-03-24", status: "completed" },
  { id: "V-005", client: "Marie Leroy", product: "Support Annuel", quantity: 1, unitPrice: 599, total: 599, date: "2026-03-23", status: "cancelled" },
  { id: "V-006", client: "Digital Corp", product: "Pack Startup", quantity: 3, unitPrice: 699, total: 2097, date: "2026-03-22", status: "completed" },
  { id: "V-007", client: "Anne Moreau", product: "Licence Pro", quantity: 1, unitPrice: 499, total: 499, date: "2026-03-21", status: "pending" },
];
