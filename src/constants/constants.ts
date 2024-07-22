import { FilterCheckboxProps } from "@/components/filter/checkboxFilter/CheckboxFilter";
import { FilterProps } from "@/components/filter/Filter";
import { Header } from "@/components/table/Table";
import { formatClpSymbol } from "@/utils/formatCurrency";

// environment
export const API_URL =
  process.env.API_URL ?? "https://bold-fe-api.vercel.app/api";

export const LOCAL_API_URL =
  process.env.LOCAL_API_URL ?? "https://sales-report-bold.vercel.app";

export const BOLD_FEE = 0.03;

//filters
export const PRINCIPAL_FILTER_OPTIONS: FilterProps = {
  options: {
    currentDay: "Hoy",
    currentWeek: "Esta semana",
    currentMonth: "",
  },
};

export const CHECKBOX_FILTER: FilterCheckboxProps = {
  options: {
    linkSales: "Cobro con link de pago",
    terminalSales: "Cobro con datáfono",
    allSales: "Ver todos",
  },
};

//table headers
export const HEADERS: Header[] = [
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
