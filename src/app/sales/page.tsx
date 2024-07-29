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
  CHECKBOX_FILTER,
  HEADERS,
  PRINCIPAL_FILTER_OPTIONS,
} from "@/constants/constants";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";

import Detail from "@/components/detail/Detail";
import withTooltip from "@/components/tooltip/witchTooltip";
import useActiveFilters from "@/hooks/useActiveFilters";
import { AppContext } from "@/hooks/useAppContext";
import useFilteredSales from "@/hooks/useFilteredSales";
import { buildTitleResume, buildTitleTable } from "@/utils/buildTitles";
import { formatClpSymbol } from "@/utils/formatCurrency";
import { Info } from "lucide-react";
import { Filters } from "./interfaces/Filters";

moment.locale("es");

const currentMonth = moment().format("MMMM");
const capitalizedMonth =
  currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
PRINCIPAL_FILTER_OPTIONS.options.currentMonth = capitalizedMonth;

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
  const [activeFilters, setActiveFilters] = useActiveFilters<Filters>({
    currentDay: false,
    currentWeek: false,
    currentMonth: true,
    terminalSales: false,
    linkSales: false,
    allSales: false,
    searchValue: "",
  });
  const [sales, setSales] = useState<Sale[]>([]);
  const [saleDetail, setSaleDetail] = useState<Sale>();
  const [filterCriteria, setFilterCriteria] = useState<string>();
  const [filterCheckbox, setFilterCheckbox] = useState<object>({});
  const [titleResume, setTitleResume] = useState<string>("");
  const [titleTable, setTitleTable] = useState<string>("");
  const [rangeDate, setRangeDate] = useState<string>("");
  const salesFiltered = useFilteredSales(sales, activeFilters);
  const IconWithTooltip = withTooltip(
    Info,
    "Este es el total de las ventas filtradas",
  );

  const searchSales = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      searchValue: lowerCaseValue || "",
    }));
  };

  const getBalance = (): string => {
    return formatClpSymbol(
      salesFiltered.reduce((sum, sale) => sum + sale.amount, 0),
    );
  };

  const getDateFromFilter = (): string => {
    if (activeFilters.currentDay) {
      return moment().format("DD [de] MMMM YYYY");
    }
    if (activeFilters.currentWeek) {
      return (
        moment().startOf("week").format("DD [de] MMMM YYYY") +
        " - " +
        moment().format("DD [de] MMMM YYYY")
      );
    }
    if (activeFilters.currentMonth) {
      return (
        moment().startOf("month").format("DD [de] MMMM YYYY") +
        " - " +
        moment().endOf("month").format("DD [de] MMMM YYYY")
      );
    }
    return "";
  };

  const showDetail = (sale: Sale) => {
    document.documentElement.classList.add("no-scroll");
    setSaleDetail(sale);
  };

  const hideDetail = () => {
    document.documentElement.classList.remove("no-scroll");
    setSaleDetail(undefined);
  };

  const valueContext = useMemo(
    () => ({
      changeFilter: setFilterCriteria,
      changeCheckbox: setFilterCheckbox,
    }),
    [],
  );

  const memoTable = useMemo(() => {
    return (
      <Table
        onClickFn={showDetail}
        headers={HEADERS}
        items={salesFiltered}
      ></Table>
    );
  }, [salesFiltered]);

  useEffect(() => {
    getSales().then((sales) => {
      setSales(sales);
    });
  }, []);

  useEffect(() => {
    if (filterCriteria === undefined) return;
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

  useEffect(() => {
    setTitleResume(buildTitleResume(activeFilters, capitalizedMonth));
    setTitleTable(buildTitleTable(activeFilters, capitalizedMonth));
    const newRangeDate = getDateFromFilter();
    setRangeDate(newRangeDate);
  }, [activeFilters]);

  return (
    <AppContext.Provider value={valueContext}>
      <div className={styles["container"]}>
        <div className={styles["container__card"]}>
          <Card title={titleResume} icon={<IconWithTooltip size={16} />}>
            <div className={styles["card__wrapper"]}>
              <p
                className={`${styles["card__total"]} ${styles["card__total--gradient"]}`}
              >
                {getBalance()}
              </p>
              <span>{rangeDate}</span>
            </div>
          </Card>
        </div>
        <div className={styles["container-filters"]}>
          <Filter
            options={PRINCIPAL_FILTER_OPTIONS.options}
            defaultValue={{ ...activeFilters }}
          ></Filter>
          <div className={styles["container-filters__types"]}>
            <div className={styles["container-filters__types"]}>
              <CheckboxFilter
                options={CHECKBOX_FILTER.options}
                defaultChecked={{ ...activeFilters }}
              ></CheckboxFilter>
            </div>
          </div>
        </div>
      </div>
      <Card title={titleTable}>
        <InputFilter
          onChange={searchSales}
          defaultValue={activeFilters.searchValue}
        ></InputFilter>
        {memoTable}
      </Card>
      {saleDetail && (
        <Detail saleDetail={saleDetail} onHide={hideDetail}></Detail>
      )}
    </AppContext.Provider>
  );
}
