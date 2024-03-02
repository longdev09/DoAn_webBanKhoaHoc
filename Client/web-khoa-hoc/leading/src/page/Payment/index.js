import useLoading from "~/hook/useLoading";
import * as GioHangServices from "~/api/GioHangServices";
import LoadingItem from "~/components/LoadingItem";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Payment.module.scss";
import { useState } from "react";
import numeral from "numeral";
import * as HoaDonServices from "~/api/HoaDonServices";
const cx = classNames.bind(style);

export default function Payment() {
  const maHV = localStorage.getItem("maHV");
  const [dsCtGio, setDsCtGio] = useState();
  const [tongTien, setTongTien] = useState(0);
  const fetchApiGioHang = async () => {
    const res = await GioHangServices.layChiTietGioHangTheoMaHocVien(maHV);
    setDsCtGio(res);
    const tongTien = res.reduce((acc, item) => acc + item.donGia, 0);
    setTongTien(tongTien);
  };
  const loading = useLoading(fetchApiGioHang);
  console.log(dsCtGio)
  const handelThanhToan = async () => {
    const res = await HoaDonServices.taoThanhToan(tongTien, maHV);
    window.open(res.redirectUrl, "_blank");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("img-header")}>
          <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
        </div>

        <div className={cx("btn")}>
          <Button>Hủy</Button>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("main")}>
          <div className={cx("complete")}>
            <div style={{ marginLeft: "500px" }}>
              <div className={cx("heading")}>
                <h2>Thanh toán</h2>
              </div>
              <div className={cx("payment-methods")}>
                <h2>Phương Thức Thanh Toán</h2>
                <div className={cx("methods")}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="radio" checked />
                    <img src="https://i.gyazo.com/4914b35ab9381a3b5a1e7e998ee9550c.png" />
                  </div>
                  <span>Thanh toán bằng vnpay</span>
                </div>
              </div>
              <div className={cx("info-bill")}>
                <h2>Thông tin đặt hàng</h2>
                {loading ? (
                  <LoadingItem />
                ) : (
                  <div className={cx("list-item")}>
                    {dsCtGio &&
                      dsCtGio.map((item) => (
                        <div className={cx("item")}>
                          <div className={cx("img")}>
                            <img src={item.hinhAnh} />
                          </div>
                          <div className={cx("name-coure")}>
                            <span>{item.tenKh}</span>
                          </div>
                          <div className={cx("pice")}>
                            <span>{numeral(item.donGia).format("0,0")} đ</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={cx("bill")}>
            <div style={{ marginRight: "500px" }}>
              <div className={cx("payment-methods")}>
                <h2>Tổng tiền</h2>
                <div className={cx("price-origin")}>
                  <span>Giá gốc : </span>
                  <span>{numeral(tongTien).format("0,0")} ₫ </span>
                </div>
                <div className={cx("price")}>
                  <span>Tổng : </span>
                  <span>{numeral(tongTien).format("0,0")} ₫ </span>
                </div>
                <p>
                  Bằng việc hoàn tất giao dịch mua, bạn đồng ý với
                  <i style={{ color: "red" }}> Điều khoản dịch vụ</i> này.
                </p>

                <div>
                  <Button onClick={handelThanhToan} w100>
                    Hoàn tất thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
