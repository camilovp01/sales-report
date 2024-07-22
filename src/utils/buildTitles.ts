import { Filters } from "@/app/sales/interfaces/Filters";

export const buildTitleResume = (filters: Filters, month: string): string => {
  if (filters.currentDay) {
    return "Total ventas de hoy";
  }
  if (filters.currentWeek) {
    return "Total ventas de esta semana";
  }
  if (filters.currentMonth) {
    return `Total ventas de ${month}`;
  }
  return "Total ventas";
};

export const buildTitleTable = (filters: Filters, month: string): string => {
  if (filters.currentDay) {
    return "Tus ventas de hoy";
  }
  if (filters.currentWeek) {
    return "Tus ventas de esta semana";
  }
  if (filters.currentMonth) {
    return `Tus ventas de ${month}`;
  }
  return "Tus ventas";
};
