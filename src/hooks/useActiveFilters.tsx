import { useEffect, useState } from "react";

const useActiveFilters = <T extends object>(initialFilters: T) => {
  const [activeFilters, setActiveFilters] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedFilters = localStorage.getItem("filters");
      return storedFilters ? JSON.parse(storedFilters) : initialFilters;
    } else {
      return initialFilters;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("filters", JSON.stringify(activeFilters));
    }
  }, [activeFilters]);

  return [activeFilters, setActiveFilters] as const;
};

export default useActiveFilters;
