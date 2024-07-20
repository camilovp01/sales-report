import { AppContext } from "@/app/sales/page";
import { useContext } from "react";

export default function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
