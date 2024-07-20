import { SaleRepository } from "../domain/Sale.repository";

export default function getAll(salesRepository: SaleRepository) {
  console.log("asas");

  return salesRepository.getAll();
}
