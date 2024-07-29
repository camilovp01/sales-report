import moment from "moment";

import { FranchiseType } from "@/modules/sales/domain/FranchiseType";
import { PaymentType } from "@/modules/sales/domain/PaymentType";
import { SaleType } from "@/modules/sales/domain/SaleType";
import { Link, SmartphoneNfc } from "lucide-react";
import Image from "next/image";
import styles from "./table.module.scss";

export interface Header {
  label: string;
  target: string;
  secondTarget?: string;
  type?: string;
  fieldToValidateIcon?: string;
  format?: (value: number) => string;
}

interface WithId {
  id: string;
}

interface WithIdAndProperties extends WithId {
  [key: string]: any;
}

export interface TableProps {
  items: WithIdAndProperties[];
  headers: Header[];
  onClickFn: (item: any) => void;
  onClickHeader?: (header: Header, orderType: "asc" | "desc") => void;
}

const renderIconSwitch = (param: string, franchise?: string) => {
  switch (param) {
    case PaymentType.CARD:
      if (franchise === FranchiseType.MASTERCARD) {
        return (
          <Image
            src={"/images/master.png"}
            alt="Mastercard"
            width={24}
            height={14}
          ></Image>
        );
      }
      if (franchise === FranchiseType.VISA) {
        return (
          <Image
            src={"/images/visa.png"}
            alt="Visa"
            width={24}
            height={24}
          ></Image>
        );
      }
      break;
    case PaymentType.DAVIPLATA:
      return (
        <Image
          src={"/images/daviplata.png"}
          alt="Daviplata"
          width={24}
          height={24}
        ></Image>
      );
    case PaymentType.NEQUI:
      return (
        <Image
          src={"/images/nequi.png"}
          alt="Nequi"
          width={24}
          height={24}
        ></Image>
      );
    case PaymentType.PSE:
      return (
        <Image src={"/images/pse.png"} alt="pse" width={24} height={24}></Image>
      );
    case PaymentType.BANCOLOMBIA:
      return (
        <Image
          src={"/images/bancolombia.png"}
          alt="bancolombia"
          width={24}
          height={24}
        ></Image>
      );
    default:
      return "";
  }
};

export default function Table({
  items,
  headers,
  onClickFn,
  onClickHeader,
}: Readonly<TableProps>) {
  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-container__table-wrapper"]}>
        <table className={styles["table-container__table"]}>
          <thead className={styles["table-container__table-head"]}>
            <tr className={styles["table-container__table-row"]}>
              {headers.map((header) => (
                <th
                  className={styles["table-container__table-header"]}
                  key={header.target}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles["table-container__table-body"]}>
            {items.map((item) => (
              <tr
                key={item.id}
                className={styles["table-container__table-row"]}
                onClick={() => onClickFn(item)}
              >
                {headers.map((header: Header, index: number) => {
                  if (header.type === "date") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles["table-container__table-data"]}
                      >
                        <div>
                          {moment(item[header.target]).format(
                            "DD/MM/YYYY hh:mm:ss",
                          )}
                        </div>
                      </td>
                    );
                  }
                  if (header.type === "currency") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles["table-container__table-data"]}
                      >
                        {header.format ? (
                          <div
                            className={
                              styles["table-container__table--currency"]
                            }
                          >
                            {header.format(item[header.target])}
                          </div>
                        ) : (
                          <div>{item[header.target]}</div>
                        )}
                      </td>
                    );
                  }
                  if (header.type === "transaction") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles["table-container__table-data"]}
                      >
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <span>
                            {header.fieldToValidateIcon &&
                            item[header.fieldToValidateIcon] ===
                              SaleType.PAYMENT_LINK ? (
                              <Link
                                className={styles["table-container__icon"]}
                              />
                            ) : (
                              <SmartphoneNfc
                                className={styles["table-container__icon"]}
                              />
                            )}
                          </span>
                          {item[header.target]}
                        </div>
                      </td>
                    );
                  }
                  if (header.type === "paymentMethod") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles["table-container__table-data"]}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            minWidth: " 120px",
                          }}
                        >
                          <span>
                            {header?.fieldToValidateIcon &&
                              renderIconSwitch(
                                item[header.target],
                                item[header?.fieldToValidateIcon],
                              )}
                          </span>
                          {header?.secondTarget && item[header.target] !== "PSE"
                            ? `**** ${item[header.secondTarget]}`
                            : item[header.target]}
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={`${index} ${header.label}`}
                      className={styles["table-container__table-data"]}
                    >
                      <div>{item[header.target]}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
