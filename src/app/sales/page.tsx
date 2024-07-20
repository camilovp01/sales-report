import Card from "@/components/card/Card";
import Filter from "@/components/filter/Filter";
import Table, { Header } from "@/components/table/Table";
import getAll from "@/modules/sales/application/getAll";
import { Sale } from "@/modules/sales/domain/Sale";
import { SaleRepository } from "@/modules/sales/domain/Sale.repository";
import { SaleApiRepository } from "@/modules/sales/infraestructure/SaleApiRepository";

import styles from "./page.module.scss";

const getSales = async (): Promise<Sale[]> => {
  const saleRepository: SaleRepository = new SaleApiRepository();
  try {
    const sales = await getAll(saleRepository);
    return sales;
  } catch (error) {
    throw new Error("Error al obtener las ventas");
  }
};

const header: Header[] = [
  { label: "Transacción", target: "status" },
  { label: "Fecha y Hora", target: "createdAt", type: "date" },
  { label: "Método de Pago", target: "paymentMethod" },
  { label: "ID Transacción", target: "id" },
  { label: "Monto", target: "amount", type: "currency" },
];

export default async function SalesPage() {
  const sales = await getSales();

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["container__card"]}>
          <Card title="Total Ventas de Junio">
            <p>Todo</p>
          </Card>
        </div>
        <Filter></Filter>
      </div>
      <Card title={`Tus Ventas de`}>
        <Table headers={header} items={sales}></Table>
      </Card>
    </>
  );
}
