export type CompletedOrder = {
  number: string;
  customerName: string;
  createdAt: string;
  items: {
    name: string;
    size: number;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  discounts: number;
  total: number;
};
