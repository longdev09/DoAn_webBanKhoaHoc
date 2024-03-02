import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { auth, providerGG } from "~/services/config_firebase";
import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import * as HocVienServices from "~/api/HocVienServices";
import Input from "~/components/Input";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./LoginUser.module.scss";
import routes from "~/config/routesConfig";

const cx = classNames.bind(style);

export default function LoginUser() {
  let navigate = useNavigate();
  const handleResGg = async () => {
    const result = await signInWithPopup(auth, providerGG);
    const res = await HocVienServices.DangNhapBangGG(result.user.email);
    if (res.message == "Succes") {
      localStorage.setItem("maHV", res.maHV);
      localStorage.setItem("tenHV", res.tenHV);
      localStorage.setItem("login-user", true);
      navigate(routes.home);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {/* login  */}
      <div className={cx("content")}>
        <div>
          <div className={cx("heading")}>
            <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
          </div>
          <div className={cx("wrapper-login")}>
            <div className={cx("title")}>
              <span>Đăng nhập</span>
            </div>

            {/* input du lieu  */}
            <div className={cx("input-group")}>
              <Input pla={"Email của bạn"} />
              <Input pla={"Mật khẩu của bạn"} type={"password"} />
            </div>
            <div className={cx("reset-pass")}>
              <Button className={cx("custom-btn-reset")} outLine>
                Quên mật khẩu ?
              </Button>
            </div>
            <div className={cx("btn-login")}>
              <Button w100>Đăng nhập</Button>
            </div>
            <div className={cx("or")}>or</div>

            <div className={cx("login-gg")}>
              <Button
                onClick={handleResGg}
                outLine
                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              >
                Đăng nhập với Google
              </Button>
            </div>
            <div className={cx("reg-acc")}>
              <span>Bạn chưa có tài khoản ? </span>
              <Button
                to={routes.registerUser}
                outLine
                className={cx("custom-btn-reset")}
              >
                Đăng ký ngay ?
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
