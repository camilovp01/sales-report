import { Sale } from "./Sale";

export interface SaleRepository {
  getAll(): Promise<Sale[]>;
}
