import moment from "moment";

export default function fromatDate(
  date: Date | string,
  format: string
): string {
  return moment(date).format(format);
}
