import { createContext, useContext } from "react";

export const AppContext = createContext({
  changeFilter: (value: string) => {},
  changeCheckbox: (objt: object) => {},
});

export default function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
