import classNames from "classnames/bind";
import style from "./Footer.module.scss";
const cx = classNames.bind(style);

export default function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("item")}>
          <h3>Logo</h3>
          <div className={cx("text")}>
            <span>Số điện thoại : </span>
            <span>0366.734.760</span>
          </div>
          <div className={cx("text")}>
            <span>Email : </span>
            <span>longbachnguyen09dev@gmail.com</span>
          </div>
          <div className={cx("text")}>
            <span>
              Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
              Giấy, TP. Hà Nội
            </span>
          </div>
        </div>
        <div className={cx("item")}>
          <h3>Logo</h3>
          <div className={cx("text")}>
            <span>Số điện thoại : </span>
            <span>0366.734.760</span>
          </div>
          <div className={cx("text")}>
            <span>Email : </span>
            <span>longbachnguyen09dev@gmail.com</span>
          </div>
          <div className={cx("text")}>
            <span>
              Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
              Giấy, TP. Hà Nội
            </span>
          </div>
        </div>
        <div className={cx("item")}>
          <h3>Logo</h3>
          <div className={cx("text")}>
            <span>Số điện thoại : </span>
            <span>0366.734.760</span>
          </div>
          <div className={cx("text")}>
            <span>Email : </span>
            <span>longbachnguyen09dev@gmail.com</span>
          </div>
          <div className={cx("text")}>
            <span>
              Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
              Giấy, TP. Hà Nội
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
