import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./SettingUser.module.scss";
import Input from "~/components/Input";
import Button from "~/components/Button";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import * as HocVienServices from "~/api/HocVienServices";
import { ToastContainer } from "react-toastify";
import useCustomToast from "~/hook/useCustomToast";
const cx = classNames.bind(style);

export default function SettingUser() {
  const maHvs = localStorage.getItem("maHV");
  const [imgAvata, setImgAvata] = useState();
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [data, setData] = useState({
    maHv: maHvs,
    tenHv: "",
    sdt: "",
    ngaySinh: "",
    diaChi: "",
    email: "",
  });
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const [hv, setHv] = useState();
  const maHv = localStorage.getItem("maHV");
  const fetchApi = async () => {
    const res = await HocVienServices.layThongTinHv(maHv);
    setHv(res);
    setData((prev) => ({
      ...prev,
      tenHv: res.tenHv,
      sdt: res.sdt,
      ngaySinh: res.ngaySinh,
      diaChi: res.diaChi,
      email: res.email,
    }));
  };
  const loading = useLoading(fetchApi);

  const handleChang = (index, value) => {
    setData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleCapNhat = async () => {
    setLoadingbtn(true);
    const res = await HocVienServices.capNhatThongTin(data);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
      fetchApi();
    } else {
      showErrorToast(res.message);
    }
    setLoadingbtn(false);
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      {loading ? (
        <LoadingItem />
      ) : (
        <div className={cx("content")}>
          <div className={cx("heading")}>
            <h1>Cài Đặt</h1>
            <ul className={cx("list-nav")}>
              <li>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span>Thông tin cá nhân</span>
              </li>
            </ul>
          </div>
          <div className={cx("container")}>
            <div className={cx("heading")}>
              <h3>Thông tin cá nhân</h3>
            </div>
            <div>
              <Input
                label={"Họ và tên"}
                value={data.tenHv}
                onChange={(value) => handleChang("tenHv", value)}
              />
              <Input
                label={"Địa chỉ"}
                value={data.diaChi}
                onChange={(value) => handleChang("diaChi", value)}
              />
              <Input
                label={"Ngày sinh"}
                type={"date"}
                value={data.ngaySinh}
                onChange={(value) => handleChang("ngaySinh", value)}
              />

              <Input
                label={"Số điện thoại"}
                // disabled={data.sdt ? "disabled" : ""}
                value={data.sdt}
                onChange={(value) => handleChang("sdt", value)}
              />
              <Input
                label={"Email"}
                // disabled={data.email ? "disabled" : ""}
                value={data.email}
                onChange={(value) => handleChang("email", value)}
              />

              {/* <div style={{ marginTop: "20px" }}>
              <Dropdown
                className={cx("custom-drop")}
                placeholder="Giới tính"
                options={option.map((item) => ({
                  value: item,
                }))}
                //   onChange={(selectedOption) =>
                //     handleChang("Phai", selectedOption.value)
                //   }
              />
            </div> */}
              {/* <div className={cx("item-input")} style={{ marginTop: "20px" }}>
                <div
                  className={cx("input-file")}
                  onClick={() =>
                    document.querySelector(".input-select-avata").click()
                  }
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    className="input-select-avata"
                    //   onChange={handleFileChangeAvata}
                  />

                  {imgAvata ? (
                    <img
                      src={ URL.createObjectURL(imgAvata) }
                      width={150}
                      height={150}
                    />
                  ) : (
                    <div className={cx("text-img")}>
                      <span>Ảnh đại diện của bạn</span>
                      {data.hinh ? "sdsd" : <FontAwesomeIcon icon={faImage} size="xl" />}
                      
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={loadingbtn}
                disabledcss={loadingbtn}
                leftIcon={
                  loadingbtn ? <FontAwesomeIcon icon={faSpinner} spin /> : ""
                }
                onClick={handleCapNhat}
              >
                Cập Nhật
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
