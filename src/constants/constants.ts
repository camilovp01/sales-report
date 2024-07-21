import { FilterCheckboxProps } from "@/components/filter/checkboxFilter/CheckboxFilter";
import { FilterProps } from "@/components/filter/Filter";
import { Header } from "@/components/table/Table";
import { formatClpSymbol } from "@/utils/formatCurrency";

// environment
export const apiUrl =
  process.env.API_URL ?? "https://bold-fe-api.vercel.app/api";

export const localApiUrl =
  process.env.LOCAL_API_URL ?? "https://sales-report-bold.vercel.app";

//filters
export const principalFilterOptions: FilterProps = {
  options: {
    currentDay: "Hoy",
    currentWeek: "Esta semana",
    currentMonth: "",
  },
};

export const checkboxFilter: FilterCheckboxProps = {
  options: {
    linkSales: "Cobro con link de pago",
    terminalSales: "Cobro con datáfono",
    allSales: "Ver todos",
  },
};

//table headers
export const headers: Header[] = [
  {
    label: "Transacción",
    target: "status",
    type: "transaction",
    fieldToValidateIcon: "salesType",
  },
  { label: "Fecha y Hora", target: "createdAt" },
  {
    label: "Método de Pago",
    target: "paymentMethod",
    type: "paymentMethod",
    fieldToValidateIcon: "franchise",
  },
  { label: "ID Transacción", target: "id" },
  {
    label: "Monto",
    target: "amount",
    type: "currency",
    format: formatClpSymbol,
  },
];
