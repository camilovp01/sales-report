import moment from "moment";

export default function dateComparison(
  dateString: string,
  criteria: string
): boolean {
  const date = moment(dateString, "DD/MM/YYYY - HH:mm:ss");

  const today = moment().startOf("day");

  switch (criteria) {
    case "currentDay":
      return date.isSame(today, "day");
    case "currentWeek": {
      const startOfWeek = moment().startOf("week");
      const endOfWeek = moment().endOf("week");
      return date.isBetween(startOfWeek, endOfWeek, null, "[]");
    }
    case "currentMonth": {
      const startOfMonth = moment().startOf("month");
      const endOfMonth = moment().endOf("month");
      return date.isBetween(startOfMonth, endOfMonth, null, "[]");
    }
    default:
      return false;
  }
}
