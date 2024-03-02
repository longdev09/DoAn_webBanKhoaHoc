import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faVideo,
  faList,
  faUser,
  faRightToBracket,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import routesConfig from "~/config/routesConfig";
import Menu from "./Menu";
import classNames from "classnames/bind";
import style from "./SiderBarAdmin.module.scss";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

export default function SiderBarAdmin() {
  let navigate = useNavigate();
  const handleDangXuat = async () => {
    navigate(routesConfig.adminLogin);
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
            to={routesConfig.adminDashboard}
            icon={<FontAwesomeIcon icon={faTable} />}
            text={"Thống Kê"}
          />
          <Menu
            to={routesConfig.adminManageCourse}
            icon={<FontAwesomeIcon icon={faVideo} />}
            text={"Khóa Học"}
          />
          <Menu
            to={routesConfig.adminManageCategory}
            icon={<FontAwesomeIcon icon={faList} />}
            text={"Danh Mục"}
          />
          <Menu
            to={routesConfig.adminManageUser}
            icon={<FontAwesomeIcon icon={faUser} />}
            text={"Người Dùng"}
          />
          <Menu
            to={routesConfig.adminDanhGia}
            icon={<FontAwesomeIcon icon={faMoneyBill} />}
            text={"Đánh Giá"}
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
