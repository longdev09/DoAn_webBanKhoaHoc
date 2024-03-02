import ReactQuill from "react-quill";
import classNames from "classnames/bind";
import style from "./InfoMentor.module.scss";
import Input from "~/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "react-dropdown/style.css";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import * as GiangVienServices from "~/api/GiangVienServices";
import { useState } from "react";
import Button from "~/components/Button";
import { ToastContainer } from "react-toastify";
import useCustomToast from "~/hook/useCustomToast";
import Modal from "~/components/Modal";
import ModalDoiMatKhau from "./ModalDoiMatKhau";
const cx = classNames.bind(style);
export default function InfoMentor() {
  const maGv = localStorage.getItem("maGv");
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({
    maGv: "",
    maNd: "",
    tenGv: "",
    gioiThieu: "",
    hinh: "",
    ngaySinh: "",
    phai: "",
    sdt: "",
    email: "",
    linkInfor: "",
    cmndMacTruoc: "",
    cmndMacSau: "",
  });
  const option = ["Nam", "Nữ"];
  const fetchApi = async () => {
    const res = await GiangVienServices.layThongTinGVTheoMa(maGv);
    setData((prev) => ({
      ...prev,
      maGv: res.maGv,
      maNd: res.maNd,
      tenGv: res.tenGv,
      gioiThieu: res.gioiThieu,
      hinh: res.hinh,
      ngaySinh: res.ngaySinh,
      phai: res.phai,
      sdt: res.sdt,
      email: res.email,
      linkInfor: res.linkInfor,
      cmndMacTruoc: res.cmndMacTruoc,
      cmndMacSau: res.cmndMacSau,
    }));
  };
  const loading = useLoading(fetchApi);

  const handleChang = (index, value) => {
    setData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSumit = async () => {
    setLoadingBtn(true);
    const res = await GiangVienServices.capNhatThongTinGiangVien(data);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    setLoadingBtn(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title={"Đổi mật khẩu tài khoản"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalDoiMatKhau close={closeModal} />}
        className={cx("custom-modal")}
      />
      <ToastContainer />
      {loading ? (
        <LoadingItem />
      ) : (
        <>
          <div className={cx("heading")}>
            <h2>Thông tin cá nhân</h2>
          </div>
          <div className={cx("content")}>
            <div className={cx("avata")}>
              <span className={cx("icon-avata")}>
                <img src={data.hinh} />
              </span>
            </div>
            <div className={cx("group-input")}>
              <div>
                <Input
                  label={"Họ tên của bạn"}
                  value={data.tenGv}
                  onChange={(value) => handleChang("tenGv", value)}
                />
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <ReactQuill
                    className={cx("text-edit")}
                    theme="snow"
                    placeholder="Giới thiệu"
                    value={data.gioiThieu}
                    onChange={(value) => handleChang("gioiThieu", value)}
                  />
                </div>

                <Input
                  value={new Date(data.ngaySinh).toISOString().split("T")[0]}
                  label={"Ngày sinh"}
                  type={"date"}
                  onChange={(value) => handleChang("ngaySinh", value)}
                />
                <Input
                  disabled={"disabled"}
                  value={data.sdt}
                  label={"Số điện thoại"}
                  onChange={(value) => handleChang("sdt", value)}
                />
                <Input
                  disabled={"disabled"}
                  value={data.email}
                  label={"Email"}
                  onChange={(value) => handleChang("email", value)}
                />
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "350px", marginRight: "10px" }}
                  src={data.cmndMacSau}
                />
                <img style={{ width: "350px" }} src={data.cmndMacTruoc} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  disabled={loadingBtn}
                  disabledcss={loadingBtn}
                  leftIcon={
                    loadingBtn ? <FontAwesomeIcon icon={faSpinner} spin /> : ""
                  }
                  onClick={handleSumit}
                >
                  Cập nhật thông tin
                </Button>
                <Button
                  disabled={loadingBtn}
                  disabledcss={loadingBtn}
                  leftIcon={
                    loadingBtn ? <FontAwesomeIcon icon={faSpinner} spin /> : ""
                  }
                  onClick={openModal}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
