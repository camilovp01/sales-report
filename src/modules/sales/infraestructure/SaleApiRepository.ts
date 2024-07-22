import { LOCAL_API_URL } from "@/constants/constants";

import { Sale } from "../domain/Sale";
import { SaleRepository } from "../domain/Sale.repository";

export class SaleApiRepository implements SaleRepository {
  async getAll(): Promise<Sale[]> {
    const response = await fetch(`${LOCAL_API_URL}/api/sales`, {
      method: "GET",
    });
    const data = await response.json();
    return data.data;
  }
}
