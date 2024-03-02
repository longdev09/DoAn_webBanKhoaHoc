import useCustomToast from "~/hook/useCustomToast";
import { ToastContainer } from "react-toastify";
import routes from "~/config/routesConfig";
import { useNavigate } from "react-router-dom";
import Input from "~/components/Input";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Login.module.scss";
import { useState } from "react";
import * as AdminServices from "~/api/AdminServices";
const cx = classNames.bind(style);

export default function AdminLogin() {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const navigate = useNavigate();
  const [dataDangNhap, setDataDangNhap] = useState({
    tenDn: "",
    matKhau: "",
  });

  const handleChang = (index, value) => {
    setDataDangNhap((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSumbit = async () => {
    const res = await AdminServices.dangNhapAdmin(
      dataDangNhap.email,
      dataDangNhap.matKhau
    );
    if (res.status == "Succes") {
      showSuccessToast(res.message);
      navigate(routes.adminDashboard);
    } else {
      showErrorToast(res.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      {/* login  */}
      <div className={cx("content")}>
        <div>
          <div className={cx("heading")}>
            <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
          </div>
          <div className={cx("wrapper-login")}>
            <div className={cx("title")}>
              <span>Đăng nhập Tài Khoản Admin</span>
            </div>

            {/* input du lieu  */}
            <div className={cx("input-group")}>
              <Input
                onChange={(value) => handleChang("email", value)}
                pla={"Tên đăng nhập"}
              />
              <Input
                onChange={(value) => handleChang("matKhau", value)}
                pla={"Mật khẩu của bạn"}
                type={"password"}
              />
            </div>
            <div className={cx("btn-login")}>
              <Button onClick={handleSumbit} w100>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* footer  */}
      <div className={cx("footer")}>
        <span>©2023 Website được thực hiện bởi longDev</span>
      </div>
      <div className={cx("banner")}></div>
    </div>
  );
}
