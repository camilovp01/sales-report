import { BOLD_FEE } from "@/constants/constants";
import { Sale } from "@/modules/sales/domain/Sale";
import { SaleType } from "@/modules/sales/domain/SaleType";
import { StatusType } from "@/modules/sales/domain/StatusType";
import { formatClpSymbol } from "@/utils/formatCurrency";
import { CircleCheck, CircleX, Link, SmartphoneNfc, X } from "lucide-react";
import styles from "./detail.module.scss";

export interface DetailProps {
  saleDetail: Sale;
  onHide: () => void;
}

export default function Detail({ saleDetail, onHide }: Readonly<DetailProps>) {
  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.detail}>
        <div className={styles["close-wrapper"]}>
          <X
            size={16}
            className={styles["close-wrapper__icon"]}
            onClick={onHide}
          />
        </div>
        <div className={`${styles["header"]}`}>
          {saleDetail.status === StatusType.SUCCESSFUL ? (
            <CircleCheck size={36} className={styles["icon--success"]} />
          ) : (
            <CircleX size={36} className={styles["icon--reject"]} />
          )}
          <p className={`${styles["header__status"]}`}>¡{saleDetail.status}!</p>
          <p className={`${styles["header__amount"]}`}>
            {formatClpSymbol(saleDetail?.amount)}
          </p>
          <span className={`${styles["header__date"]}`}>
            {saleDetail?.createdAt.toString()}
          </span>
        </div>
        <div className={styles.resume}>
          <div className={styles["resume__item"]}>
            <p className={styles["resume__label"]}>Id Transacción Bold</p>
            <p className={styles["resume__value--black"]}>{saleDetail.id}</p>
          </div>
          <div className={styles["resume__item"]}>
            <p className={styles["resume__label"]}>Deducción Bold</p>
            <p className={styles["resume__value--red"]}>
              {saleDetail.status !== StatusType.REJECTED
                ? formatClpSymbol(saleDetail?.amount * BOLD_FEE * -1)
                : formatClpSymbol(0)}
            </p>
          </div>
          <hr />
          <div className={styles["resume__item"]}>
            <p className={styles["resume__label"]}>Método de pago</p>
            <p className={styles["resume__value"]}>
              {saleDetail.paymentMethod}
            </p>
          </div>
          <div className={styles["resume__item"]}>
            <p className={styles["resume__label"]}>Tipo de pago</p>
            <p className={styles["resume__value--black"]}>
              {saleDetail.salesType === SaleType.PAYMENT_LINK ? (
                <>
                  <Link className={styles["resume__icon"]} size={12} />
                  Link de pagos
                </>
              ) : (
                <>
                  <SmartphoneNfc className={styles["resume__icon"]} size={12} />
                  Datafono
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
