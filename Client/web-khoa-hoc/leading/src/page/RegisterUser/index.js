import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCustomToast from "~/hook/useCustomToast";
import routes from "~/config/routesConfig";
import { useNavigate } from "react-router-dom";
import { auth, providerGG } from "~/services/config_firebase";
import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import * as HocVienServices from "~/api/HocVienServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Input from "~/components/Input";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./RegisterUser.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);
export default function RegisterUser() {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  let navigate = useNavigate();

  const [dataRes, setDataRes] = useState({
    tenDN: "",
    matKhau: "",
  });

  const [inputsData, setInputsData] = useState({
    ten: "",
    sdt: "",
    matKhau: "",
    maXacNhan: "",
  });

  // dang ky bang tai khoan gg
  const handleResGg = async () => {
    const result = await signInWithPopup(auth, providerGG);
    const userEmail = result.user.email;
    const name = result.user.displayName;
    const res = await HocVienServices.RegisterUserGG(userEmail, name);
    if (res.message == "Succes") {
      localStorage.setItem("maHV", res.maHV);
      localStorage.setItem("tenHV", res.tenHV);
      localStorage.setItem("login-user", true);
      navigate(routes.home);
    } else {
      toast.error("Tài khoản đã tồn tại", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000, // Đóng tự động sau 3 giây
      });
    }
  };

  // dang ky bang sdt

  const handleChang = (fieldName, value) => {
    setInputsData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    setDataRes((pre) => ({
      ...pre,
      [fieldName]: value,
    }));
  };

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            senOtp();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  };
  const senOtp = async () => {
    try {
      const formattedPhoneNumber = "+84" + inputsData.sdt;
      onCaptchVerify();
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      console.log("Gửi thành công");
    } catch (error) {
      // Kiểm tra xem lỗi có phải là "auth/too-many-requests" không
      if (error.code === "auth/too-many-requests") {
        console.error(
          "Quá nhiều yêu cầu xác thực. Vui lòng thử lại sau một khoảng thời gian."
        );
      } else {
        console.error("Lỗi SMS:", error.message);
      }
    }
  };

  const areAllFieldsFilled = () => {
    return (
      inputsData.ten.trim() !== "" &&
      inputsData.matKhau.trim() !== "" &&
      inputsData.maXacNhan.trim() !== "" &&
      inputsData.sdt.trim() !== ""
    );
  };
  const areAllFieldsFilledSenCode = () => {
    return (
      inputsData.ten.trim() !== "" &&
      inputsData.matKhau.trim() !== "" &&
      inputsData.sdt.trim() !== ""
    );
  };
  const handelDangKy = async () => {};

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <div id="recaptcha-container"></div>
      <div className={cx("content")}>
        <div>
          <div className={cx("heading")}>
            <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
          </div>
          <div className={cx("wrapper-login")}>
            <div className={cx("title")}>
              <span>Đăng Ký</span>
            </div>

            {/* input du lieu  */}
            <div className={cx("input-group")}>
              <Input
                onChange={(value) => handleChang("ten", value)}
                pla={"Tên của bạn"}
              />
              <Input
                onChange={(value) => handleChang("sdt", value)}
                pla={"Số điện thoại của bạn"}
              />
              <Input
                onChange={(value) => handleChang("matKhau", value)}
                pla={"Mật khẩu của bạn"}
                type={"password"}
              />
            </div>

            <div className={cx("verification")}>
              <span>
                <Input
                  onChange={(value) => handleChang("maXacNhan", value)}
                  pla={"Nhập mã xác nhận "}
                  type={"password"}
                />
              </span>

              <span>
                <Button
                  disabled={!areAllFieldsFilledSenCode()}
                  disabledcss={!areAllFieldsFilledSenCode()}
                  onClick={senOtp}
                >
                  Gửi lại mã
                </Button>
              </span>
            </div>

            <div className={cx("btn-login")}>
              <Button
                disabled={!areAllFieldsFilled()}
                disabledcss={!areAllFieldsFilled()}
                w100
                onClick={handelDangKy}
              >
                Đăng ký
              </Button>
            </div>
            <div className={cx("or")}>or</div>

            <div className={cx("login-gg")}>
              <Button
                onClick={handleResGg}
                outLine
                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              >
                Đăng Ký với Google
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
