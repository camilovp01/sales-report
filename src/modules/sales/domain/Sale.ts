export interface Sale {
  id: string;
  status: string;
  paymentMethod: string;
  salesType: string;
  createdAt: string | Date;
  transactionReference: number;
  amount: number;
  franchise?: string;
}
