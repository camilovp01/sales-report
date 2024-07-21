"use client";

import Card from "@/components/card/Card";
import Filter from "@/components/filter/Filter";
import Table from "@/components/table/Table";
import getAll from "@/modules/sales/application/getAll";
import { Sale } from "@/modules/sales/domain/Sale";
import { SaleRepository } from "@/modules/sales/domain/Sale.repository";
import { SaleApiRepository } from "@/modules/sales/infraestructure/SaleApiRepository";

import CheckboxFilter from "@/components/filter/checkboxFilter/CheckboxFilter";
import InputFilter from "@/components/filter/inputFilter/InputFilter";
import {
  checkboxFilter,
  headers,
  principalFilterOptions,
} from "@/constants/constants";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";

import { AppContext } from "@/hooks/useAppContext";
import useFilteredSales from "@/hooks/useFilteredSales";
import { Filters } from "./interfaces/Filters";

moment.locale("es");

const currentMonth = moment().format("MMMM");
const capitalizedMonth =
  currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
principalFilterOptions.options.currentMonth = capitalizedMonth;

const getSales = async (): Promise<Sale[]> => {
  const saleRepository: SaleRepository = new SaleApiRepository();
  try {
    const sales = await getAll(saleRepository);
    return sales;
  } catch (error) {
    throw new Error("Error al obtener las ventas");
  }
};

export default function SalesPage() {
  const [activeFilters, setActiveFilters] = useState<Filters>({
    currentDay: false,
    currentWeek: false,
    currentMonth: false,
    terminalSales: false,
    linkSales: false,
    allSales: false,
    searchValue: "",
  });
  const [sales, setSales] = useState<Sale[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>("");
  const [filterCheckbox, setFilterCheckbox] = useState<object>({});
  const salesFiltered = useFilteredSales(sales, activeFilters);

  const searchSales = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      searchValue: lowerCaseValue || "",
    }));
  };

  useEffect(() => {
    getSales().then((sales) => {
      setSales(sales);
    });
  }, []);

  useEffect(() => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      currentDay: filterCriteria === "currentDay",
      currentWeek: filterCriteria === "currentWeek",
      currentMonth: filterCriteria === "currentMonth",
    }));
  }, [filterCriteria]);

  useEffect(() => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      ...filterCheckbox,
    }));
  }, [filterCheckbox]);

  const valueContext = useMemo(
    () => ({
      changeFilter: setFilterCriteria,
      changeCheckbox: setFilterCheckbox,
    }),
    [],
  );

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
            <CheckboxFilter
              options={checkboxFilter.options}
              defaultChecked={{ ...activeFilters }}
            ></CheckboxFilter>
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
