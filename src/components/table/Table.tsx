import moment from "moment";

import styles from "./table.module.scss";

export interface Header {
  label: string;
  target: string;
  type?: string;
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
  onClickFn?: (item: any) => void;
  onClickHeader?: (header: Header, orderType: "asc" | "desc") => void;
}

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
              >
                {headers.map((header: Header, index: number) => {
                  if (header.type === "date") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles["table-container__table-data"]}
                      >
                        <div className={styles.item}>
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
                          <div className={styles.item}>
                            {header.format(item[header.target])}
                          </div>
                        ) : (
                          <div className={styles.item}>
                            {item[header.target]}
                          </div>
                        )}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={`${index} ${header.label}`}
                      className={styles["table-container__table-data"]}
                    >
                      <div className={styles.item}>{item[header.target]}</div>
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
