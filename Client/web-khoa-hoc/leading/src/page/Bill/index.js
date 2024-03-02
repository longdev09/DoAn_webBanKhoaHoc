import * as HoaDonServices from "~/api/HoaDonServices";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import Modal from "~/components/Modal";
import ModalChiTietHoaDon from "./Modal_ChiTietBill";
import numeral from "numeral";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Bill.module.scss";
import { useState } from "react";

const cx = classNames.bind(style);

export default function Bill() {
  const maHv = localStorage.getItem("maHV");
  const [maHd, setMaHd] = useState();
  const [dsHd, setDsHd] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchApiHoaDon = async () => {
    const res = await HoaDonServices.layDsHoaDonMuaKhoaHoc(maHv);
    setDsHd(res);
  };

  const loading = useLoading(fetchApiHoaDon);

  const openModal = (maHd) => {
    setIsOpen(true);
    setMaHd(maHd);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title={"Chi tiết đơn hàng"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalChiTietHoaDon close={closeModal} maHd={maHd} />}
        className={cx("custom-modal")}
      />
      <div className={cx("content")}>
        <div className={cx("heading")}>
          <h3>Lịch sử mua </h3>
        </div>
        <div className={cx("container")}>
          {loading ? (
            <LoadingItem />
          ) : (
            <div className={cx("table-content")}>
              <table className={cx("table-list")}>
                <colgroup>
                  <col style={{ width: "50px" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className={cx("w-300")}>Mã hóa đơn</th>
                    <th className={cx("w-150")}>Phương thức thanh toán</th>
                    <th className={cx("w-300")}>Tổng tiền </th>
                    <th className={cx("w-300")}>Ngày thanh toán</th>
                    <th className={cx("w-150")}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dsHd
                    ? dsHd.map((item) => (
                        <tr>
                          <td>{item.maHd}</td>
                          <td>{item.ptTt}</td>
                          <td>{numeral(item.tongTien).format("0,0")} đ</td>
                          <td>{item.ngayThanhToan}</td>
                          <td>
                            <Button onClick={() => openModal(item.maHd)}>
                              Xem chi tiết
                            </Button>
                          </td>
                        </tr>
                      ))
                    : "ssdsd"}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
