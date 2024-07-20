export const formatClpSymbol = (value: number) => {
  return `$ ${value.toLocaleString("es-CL")}`;
};

export const formatUsdWithoutSymbol = (value: number) => {
  return parseFloat(value.toFixed(2)).toLocaleString("en-US");
};

export const formatClp = (value: number) => {
  return `${formatClpSymbol(value)} CLP`;
};

export const formatUsd = (value: number) => {
  return `${formatUsdWithoutSymbol(value)} USD`;
};
