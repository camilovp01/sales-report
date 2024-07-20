"use client";

import Card from "@/components/card/Card";
import Filter, { FilterProps } from "@/components/filter/Filter";
import Table, { Header } from "@/components/table/Table";
import getAll from "@/modules/sales/application/getAll";
import { Sale } from "@/modules/sales/domain/Sale";
import { SaleRepository } from "@/modules/sales/domain/Sale.repository";
import { SaleApiRepository } from "@/modules/sales/infraestructure/SaleApiRepository";

import CheckboxFilter, {
  FilterCheckboxProps,
} from "@/components/filter/checkboxFilter/CheckboxFilter";
import InputFilter from "@/components/filter/inputFilter/InputFilter";
import dateComparison from "@/utils/dateComparison";
import { formatClpSymbol } from "@/utils/formatCurrency";
import moment from "moment";
import "moment/locale/es";
import { createContext, useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";

moment.locale("es");
const currentMonth = moment().format("MMMM");
const capitalizedMonth =
  currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

export const AppContext = createContext({
  changeFilter: (value: string) => {},
});

const getSales = async (): Promise<Sale[]> => {
  const saleRepository: SaleRepository = new SaleApiRepository();
  try {
    const sales = await getAll(saleRepository);
    return sales;
  } catch (error) {
    throw new Error("Error al obtener las ventas");
  }
};

const principalFilterOptions: FilterProps = {
  options: {
    currentDay: "Hoy",
    currentWeek: "Esta semana",
    currentMonth: capitalizedMonth,
  },
};

const checkboxFilter: FilterCheckboxProps = {
  options: {
    paymentLink: "Cobro con link de pago",
    terminal: "Cobro con datáfono",
    all: "Ver todos",
  },
};

const headers: Header[] = [
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

export default function SalesPage() {
  const [salesFiltered, setSalesFiltered] = useState<Sale[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    currentDay: false,
    currentWeek: false,
    currentMonth: false,
    searchValue: "",
  });
  const [sales, setSales] = useState<Sale[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>("");

  const searchSales = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue) {
      setActiveFilters({ ...activeFilters, searchValue: value });
    } else {
      setActiveFilters({ ...activeFilters, searchValue: "" });
    }
  };

  useEffect(() => {
    getSales().then((sales) => {
      setSalesFiltered(sales);
      setSales(sales);
    });
  }, []);

  useEffect(() => {
    switch (filterCriteria) {
      case "currentDay": {
        setActiveFilters({
          ...activeFilters,
          currentMonth: false,
          currentWeek: false,
          currentDay: true,
        });
        break;
      }
      case "currentWeek": {
        setActiveFilters({
          ...activeFilters,
          currentMonth: false,
          currentWeek: true,
          currentDay: false,
        });
        break;
      }
      case "currentMonth": {
        setActiveFilters({
          ...activeFilters,
          currentMonth: true,
          currentWeek: false,
          currentDay: false,
        });
        break;
      }
      default:
        setActiveFilters({
          ...activeFilters,
          currentMonth: false,
          currentWeek: false,
          currentDay: false,
        });
        break;
    }
  }, [filterCriteria]);

  useEffect(() => {
    const { currentDay, currentWeek, currentMonth, searchValue } =
      activeFilters;
    const salesFilterResult = sales.filter((sale) => {
      const createdAt = sale.createdAt;
      let isWithinTimeFrame = true;

      if (currentDay) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentDay");
      } else if (currentWeek) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentWeek");
      } else if (currentMonth) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentMonth");
      }

      let matchesSearch = true;

      if (searchValue) {
        const searchStr = searchValue.toString().toLowerCase();
        matchesSearch = Object.values(sale).some((value) =>
          value.toString().toLowerCase().includes(searchStr),
        );
      }
      return isWithinTimeFrame && matchesSearch;
    });
    setSalesFiltered(salesFilterResult);
  }, [activeFilters, sales]);

  const valueContext = useMemo(() => ({ changeFilter: setFilterCriteria }), []);

  const memoTable = useMemo(() => {
    return <Table headers={headers} items={salesFiltered}></Table>;
  }, [salesFiltered]);

  return (
    <AppContext.Provider value={valueContext}>
      <div className={styles["container"]}>
        <div className={styles["container__card"]}>
          <Card title="Total Ventas de Junio">
            <p>Todo</p>
          </Card>
        </div>
        <div className={styles["container-filters"]}>
          <Filter options={principalFilterOptions.options}></Filter>
          <div className={styles["container-filters__types"]}>
            <CheckboxFilter options={checkboxFilter.options}></CheckboxFilter>
          </div>
        </div>
      </div>
      <Card title={`Tus Ventas de ${capitalizedMonth}`}>
        <InputFilter onChange={searchSales}></InputFilter>
        {memoTable}
      </Card>
    </AppContext.Provider>
  );
}
