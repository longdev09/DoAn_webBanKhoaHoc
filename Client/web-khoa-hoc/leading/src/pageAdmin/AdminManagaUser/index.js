import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import Button from "~/components/Button";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import classNames from "classnames/bind";
import style from "./AdminManagaUser.module.scss";
import { useState } from "react";
import routes from "~/config/routesConfig";
import * as HocVienServices from "~/api/HocVienServices";
import * as GiangVienServices from "~/api/GiangVienServices";
import Modal from "~/components/Modal";
import ModalTaiKhoanHocVien from "./ModalTaiKhoanHocVien";
import ModalTaiKhoanGiangVien from "./ModalTaiKhoanGiangVien";
const cx = classNames.bind(style);

export default function AdminManageUsers() {
  const [maHVDc, setMaHvDc] = useState();
  const [maGvDc, setMaGvDc] = useState();

  const [hv, setHv] = useState(true);
  const [gv, setGv] = useState(false);

  const [dsHv, setDsHv] = useState();
  const [dsGv, setDsGv] = useState();

  const [showModalTaiKhoan, setShowModalTaiKhoan] = useState();

  const [showModalTaiKhoanGv, setShowModalTaiKhoanGv] = useState();

  const fetchApiHv = async () => {
    const res = await HocVienServices.layDanhSachHv();
    setDsHv(res);
  };

  const fetchApiGv = async () => {
    const res = await GiangVienServices.layThongTinGiangVien();
    setDsGv(res);
  };

  const loadingHv = useLoading(fetchApiHv);
  const loadingGv = useLoading(fetchApiGv);
  const handleHv = () => {
    setHv(true);
    setGv(false);
  };
  const handleGv = () => {
    setHv(false);
    setGv(true);
  };

  const openModalHv = (maHv) => {
    setMaHvDc(maHv);
    setShowModalTaiKhoan(true);
  };
  const closeModalHv = () => {
    setShowModalTaiKhoan(false);
  };

  const openModalGv = (maGv) => {
    setShowModalTaiKhoanGv(true);
    setMaGvDc(maGv);
  };
  const closeModalGv = () => {
    setShowModalTaiKhoanGv(false);
  };
  return (
    <div className={cx("wrapper")}>
      {/* <Modal
        title={"Chương mới"}
        showModal={showModalTaiKhoan}
        closeModal={closeModalHv}
        children={<ModalTaiKhoanHocVien close={closeModalHv} maHv={maHVDc} />}
        className={cx("custom-modal")}
      /> */}

      <Modal
        title={"Tài khoản giảng viên"}
        showModal={showModalTaiKhoanGv}
        closeModal={closeModalGv}
        children={<ModalTaiKhoanGiangVien maGv={maGvDc} />}
        className={cx("custom-modalGv")}
      />

      <div className={cx("heading")}>
        <h2>Quản lý Người Dùng</h2>
      </div>

      <div className={cx("nav-menu")}>
        <div onClick={handleHv} className={cx("item-menu", { active: hv })}>
          <span>Danh Sách Học Viên</span>
        </div>
        <div onClick={handleGv} className={cx("item-menu", { active: gv })}>
          <span>Danh Sách Giảng Viên</span>
        </div>
      </div>
      <div className={cx("content")} style={{ display: hv ? "block" : "none" }}>
        {loadingHv ? (
          <LoadingItem />
        ) : (
          <div className={cx("table-content")}>
            <table className={cx("table-list")}>
              <colgroup>
                <col style={{ width: "50px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={cx("w-150")}>Mã học viện</th>
                  <th className={cx("w-150")}>Tên học viên</th>
                  <th className={cx("w-150")}>Ngày sinh</th>
                  <th className={cx("w-150")}>Phái</th>
                  <th className={cx("w-150")}>Số điện thoại</th>
                  <th className={cx("w-150")}>Địa chỉ</th>

                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {dsHv
                  ? dsHv.map((item) => (
                      <tr>
                        <td>{item.maHv}</td>

                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.hinh}
                              alt="null"
                            />
                            <span>{item.tenHv}</span>
                          </div>
                        </td>
                        <td>{item.ngaySinh}</td>
                        <td>{item.phai}</td>
                        <td>{item.sdt}</td>
                        <td>{item.diaChi}</td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                              onClick={() => openModalHv(item.maHv)}
                              title={"Xem tài khoản"}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : "ssdsd"}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={cx("content")} style={{ display: gv ? "block" : "none" }}>
        {loadingGv ? (
          <LoadingItem />
        ) : (
          <div className={cx("table-content")}>
            <table className={cx("table-list")}>
              <colgroup>
                <col style={{ width: "50px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={cx("w-150")}>Mã giảng viên</th>
                  <th className={cx("w-150")}>Tên giảng viên </th>
                  <th className={cx("w-150")}>Ngày sinh</th>
                  <th className={cx("w-150")}>Phái </th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {dsGv
                  ? dsGv.map((item) => (
                      <tr>
                        <td>{item.maGv}</td>

                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.hinh}
                              alt="null"
                            />
                            <span>{item.tenGv}</span>
                          </div>
                        </td>
                        <td>{item.ngaySinh}</td>
                        <td>{item.phai}</td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                              title={"Xem chi tiết"}
                              onClick={() => openModalGv(item.maGv)}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </div>
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
  );
}
