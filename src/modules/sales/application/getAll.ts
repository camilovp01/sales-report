import fromatDate from "@/utils/formatDate";
import { Sale } from "../domain/Sale";
import { SaleRepository } from "../domain/Sale.repository";
import { StatusType } from "../domain/StatusType";

export default async function getAll(
  salesRepository: SaleRepository
): Promise<Sale[]> {
  const sales = await salesRepository.getAll();
  return sales.map((item: Sale) => {
    item.createdAt = fromatDate(item.createdAt, "DD/MM/YYYY - hh:mm:ss");
    item.status = formatSalesType(item.status);
    return item;
  });
}

const formatSalesType = (salesType: string): string => {
  return StatusType[salesType as keyof typeof StatusType];
};
