import numeral from "numeral";
import * as HoaDonServices from "~/api/HoaDonServices";
import LoadingItem from "~/components/LoadingItem";
import classNames from "classnames/bind";
import style from "./ModalChiTiet.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(style);

export default function ModalChiTietHoaDon({ close, maHd }) {
  const [dsCt, setDsCt] = useState();
  const [loading, setLoading] = useState(true);
  const fetchApi = async () => {
    setLoading(true);
    const res = await HoaDonServices.layDsChiTietHoaDonMuaKhoaHoc(maHd);
    setDsCt(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, [maHd]);

  return (
    <div className={cx("list-item")}>
      {loading ? (
        <LoadingItem />
      ) : (
        dsCt.map((item) => (
          <div className={cx("item")}>
            <div className={cx("heading")}>
              <div className={cx("img")}>
                <img src={item.hinhAnh} />
              </div>
              <div className={cx("info-course")}>
                <div className={cx("name-course")}>
                  <h4>{item.tenKh}</h4>
                </div>
                <div className={cx("name-mentor")}>{item.tenGv}</div>
              </div>
            </div>

            <div className={cx("price-course")}>
              <span> {numeral(item.donGia).format("0,0")} đ</span>
              {/* <span>1.000.000 đ</span> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
