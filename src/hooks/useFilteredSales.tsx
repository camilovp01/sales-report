import { Filters } from "@/app/sales/interfaces/Filters";
import { Sale } from "@/modules/sales/domain/Sale";
import { SaleType } from "@/modules/sales/domain/SaleType";
import dateComparison from "@/utils/dateComparison";
import { useEffect, useState } from "react";

const useFilteredSales = (sales: Sale[], activeFilters: Filters) => {
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);

  useEffect(() => {
    const {
      currentDay,
      currentWeek,
      currentMonth,
      searchValue,
      linkSales,
      terminalSales,
      allSales,
    } = activeFilters;

    const salesFilterResult = sales.filter((sale) => {
      const createdAt = sale.createdAt;
      let isWithinTimeFrame = true;
      let matchesSearch = true;
      let matchesCheckbox = true;

      if (currentDay) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentDay");
      } else if (currentWeek) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentWeek");
      } else if (currentMonth) {
        isWithinTimeFrame = dateComparison(String(createdAt), "currentMonth");
      }

      if (searchValue) {
        const searchStr = searchValue.toString().toLowerCase();
        matchesSearch = Object.values(sale).some((value) =>
          value.toString().toLowerCase().includes(searchStr),
        );
      }

      if (linkSales || terminalSales || allSales) {
        matchesCheckbox = false;
        if (linkSales && sale.salesType === SaleType.PAYMENT_LINK) {
          matchesCheckbox = true;
        }
        if (terminalSales && sale.salesType === SaleType.TERMINAL) {
          matchesCheckbox = true;
        }
        if (allSales) {
          matchesCheckbox = true;
        }
      }

      return isWithinTimeFrame && matchesSearch && matchesCheckbox;
    });

    setFilteredSales(salesFilterResult);
  }, [activeFilters, sales]);

  return filteredSales;
};

export default useFilteredSales;
