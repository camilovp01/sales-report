import { SaleRepository } from "../domain/Sale.repository";

export default function getAll(salesRepository: SaleRepository) {
  return salesRepository.getAll();
}
