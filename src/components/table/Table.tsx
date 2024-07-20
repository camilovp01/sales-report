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
    <div className={styles["search-container"]}>
      <div className={styles["search-container__input-wrapper"]}>
        <input
          className={styles["search-container__input"]}
          type="text"
          placeholder="Buscar"
        />
      </div>
      <div className={styles["search-container__table-wrapper"]}>
        <table className={styles["search-container__table"]}>
          <thead className={styles["search-container__table-head"]}>
            <tr>
              {headers.map((header) => (
                <th key={header.target}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {headers.map((header: Header, index: number) => {
                  if (header.type === "date") {
                    return (
                      <td
                        key={`${index} ${header.label}`}
                        className={styles.contentItem}
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
                        className={styles.contentItem}
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
                      className={styles.contentItem}
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
