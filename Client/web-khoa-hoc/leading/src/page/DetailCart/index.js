import { ToastContainer } from "react-toastify";
import routes from "~/config/routesConfig";
import useCustomToast from "~/hook/useCustomToast";
import useLoading from "~/hook/useLoading";
import numeral from "numeral";
import LoadingItem from "~/components/LoadingItem";
import * as GioHangServices from "~/api/GioHangServices";
import classNames from "classnames/bind";
import style from "./DetailCart.module.scss";
import Button from "~/components/Button";
import { useState } from "react";
import Header from "~/layout/LayoutDefaut/Header";
const cx = classNames.bind(style);

export default function DetailCart() {
  const maHV = localStorage.getItem("maHV");
  const [dsKhGio, setDsKhGio] = useState();
  const [tongTien, setTongTien] = useState(0);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const fetchApiGioHang = async () => {
    const res = await GioHangServices.layChiTietGioHangTheoMaHocVien(maHV);
    setDsKhGio(res);
    const tongTien = res.reduce((acc, item) => acc + item.donGia, 0);
    setTongTien(tongTien);
  };
  const handelXoa = async (maKh) => {
    const res = await GioHangServices.xoaGioHang(maKh);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
      fetchApiGioHang();
    } else {
      showErrorToast(res.message);
    }
  };
  const loading = useLoading(fetchApiGioHang);
  return (
    <>
      {loading ? (
        <LoadingItem />
      ) : (
        <div className={cx("wrapper")}>
          <ToastContainer />
          {dsKhGio ? (
            <>
              <div className={cx("heading")}>
                <h1>Giỏ hàng</h1>
                <span>{dsKhGio.length} khóa học trong giỏ hàng</span>
              </div>

              <div className={cx("content")}>
                <div className={cx("list-item")}>
                  {dsKhGio.map((item) => (
                    <div className={cx("item")}>
                      <div className={cx("img")}>
                        <img src={item.hinhAnh} />
                      </div>
                      <div className={cx("info-course")}>
                        <div className={cx("name-course")}>
                          <h4>{item.tenKh}</h4>
                        </div>
                        <div className={cx("name-mentor")}>{item.tenGv}</div>
                        <div className={cx("describe")}>
                          <span>26 chương</span>
                          <span>• 340 bài giảng</span>
                          <span> • 22 giờ 39 phút tổng thời lượng</span>
                        </div>
                      </div>
                      <div className={cx("price-course")}>
                        <span> {numeral(item.donGia).format("0,0")} đ</span>
                        <span>1.000.000 đ</span>
                      </div>
                      <div className={cx("btn")}>
                        <Button onClick={() => handelXoa(item.maKh)} outLine>
                          Xóa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("price")}>
                  <h3>Tổng tiền: </h3>
                  <div className={cx("sum-price")}>
                    <span>{numeral(tongTien).format("0,0")} đ</span>
                  </div>
                  <div>
                    <Button to={routes.payment} w100>
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            "dsd"
          )}
        </div>
      )}
    </>
  );
}
