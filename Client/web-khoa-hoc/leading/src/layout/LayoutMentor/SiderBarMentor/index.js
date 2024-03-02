import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faBriefcase,
  faVideo,
  faScaleBalanced,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/config/routesConfig";
import Button from "~/components/Button";
import Menu from "./Menu";
import classNames from "classnames/bind";
import style from "./SiderBarMentor.module.scss";
const cx = classNames.bind(style);

export default function SiderBarMentor() {
  let navigate = useNavigate();
  const handleDangXuat = async () => {
    localStorage.removeItem("maGv");
    navigate(routesConfig.mentorLogin);
  };
  return (
    <div className={cx("siderbar-wrapp")}>
      <div className={cx("siderbar-item")}>
        {/* // lo go  */}
        <div className={cx("item-logo")}>
          <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
        </div>
        <div className={cx("menu-list")}>
          <Menu
            to={routesConfig.mentorInfo}
            icon={<FontAwesomeIcon icon={faUser} />}
            text={"Thông tin của tôi"}
          />
          {/* <Menu
            to={routesConfig.mentorDashboards}
            icon={<FontAwesomeIcon icon={faTable} />}
            text={"Thống kê"}
          /> */}
          <Menu
            to={routesConfig.mentorManageCourse}
            icon={<FontAwesomeIcon icon={faVideo} />}
            text={"Khóa học"}
          />
          <Menu
            to={routesConfig.mentorCreateCourse_GioiThieu}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            text={"Tạo Khóa Học"}
          />
          <Menu
            to={routesConfig.mentorManageDiscount}
            icon={<FontAwesomeIcon icon={faScaleBalanced} />}
            text={"Tạo Giảm Giá"}
          />

          <div style={{ width: "200px" }}>
            <Button
              onClick={handleDangXuat}
              className={cx("custom-btn")}
              leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
            >
              Đăng Xuất
            </Button>
          </div>
        </div>

        {/* menu  */}
      </div>
    </div>
  );
}
