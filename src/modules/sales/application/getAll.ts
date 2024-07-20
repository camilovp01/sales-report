import moment from "moment";
import { Sale } from "../domain/Sale";
import { SaleRepository } from "../domain/Sale.repository";

export default async function getAll(
  salesRepository: SaleRepository,
): Promise<Sale[]> {
  const sales = await salesRepository.getAll();
  sales.map(
    (item: Sale) =>
      (item.createdAt = moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss")),
  );
  return sales;
}
