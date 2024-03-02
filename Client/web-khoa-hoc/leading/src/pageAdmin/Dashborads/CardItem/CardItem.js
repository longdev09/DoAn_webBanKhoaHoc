import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./CardItem.module.scss";
const cx = classNames.bind(style);

export default function CardItem({ title, subTitle, giaTri }) {
  return (
    <div className={cx("item-card")}>
      <div className={cx("card-title")}>
        <span>{title}</span>
        <span>{subTitle}</span>
      </div>
      <div className={cx("card-total")}>
        <div className={cx("text")}>
          <span>{giaTri}</span>
          {/* <span style={{ color: "#19b159" }}>
            55% <b>Tăng</b>
          </span> */}
        </div>
        <div className={cx("icon")}>
          <span>
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              style={{ color: "#404bda" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
