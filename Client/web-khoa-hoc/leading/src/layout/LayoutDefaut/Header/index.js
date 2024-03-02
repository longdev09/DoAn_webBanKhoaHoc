import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCartShopping,
  faList,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
// import Tippy from "@tippyjs/react/headless"; // different import path!
import { Link } from "react-router-dom";
import routes from "~/config/routesConfig";
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as DanhMucServices from "~/api/DanhMucServices";
// import { Wrapper as SearchPopperWrapper } from "~/Component/Popper";
// import SearchItem from "~/Component/SearchItem";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

export default function Header() {
  const [search, setSearch] = useState();
  let navigate = useNavigate();
  const checkLogin = localStorage.getItem("login-user");
  const tenHocVien = localStorage.getItem("tenHV");
  const [danhMuc, setDanhMuc] = useState();

  const fetchApi = async () => {
    const res = await DanhMucServices.layDsDanhMuc();
    setDanhMuc(res);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  // console.log(danhMuc);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setKq([]);
  //   }, 0);
  // }, []);

  const handldSearch = () => {
    navigate(routes.search.replace(":search", search));
  };

  const handleLogOut = () => {
    localStorage.removeItem("maHV");
    localStorage.removeItem("tenHV");
    localStorage.removeItem("login-user");
    navigate(routes.home);
  };

  return (
    <div className={cx("main")}>
      <div className={cx("wrapper-main")}>
        <Link to={routes.home} className={cx("navbar-logo-menu")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333"
            className={cx("img-logo")}
          />
        </Link>

        <div className={cx("nav")}>
          <span>
            <FontAwesomeIcon icon={faList} />
          </span>
          <ul className={cx("nav-menu")}>
            {danhMuc &&
              danhMuc.map((item) => (
                <li className={cx("item")}>{item.tenDm}</li>
              ))}
          </ul>
        </div>
        {/* search input  */}
        <div className={cx("navbar-search")}>
          <div className={cx("navbar-item-search")}>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              className={cx("search-input")}
              placeholder="Tìm nội dung bất kỳ"
            />
            <button className={cx("btn-clear")}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <span className={cx("jamb")}></span>
            <button onClick={handldSearch} className={cx("btn-search")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        {checkLogin ? (
          <div className={cx("navbar-function")}>
            <Link to={routes.detailCart} className={cx("cart")}>
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              {/* <div className={cx("count-cart")}>
                <span>0</span>
              </div> */}
            </Link>
            <div className={cx("bell")}>
              <span>
                <FontAwesomeIcon icon={faBell} />
              </span>
            </div>
            <div className={cx("user")}>
              <span className={cx("logo-img")}>
                <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
              </span>

              {/* menu tai khoan  */}
              <ul className={cx("nav-user")}>
                <li className={cx("item-heading")}>
                  <span className={cx("logo-img")}>
                    <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
                  </span>
                  <span>{tenHocVien}</span>
                </li>

                <li className={cx("item-function")}>
                  <Link to={routes.detailMyCourse}>Khóa học của tôi</Link>
                </li>
                <li className={cx("item-function")}>
                  <Link to={routes.bill}>Lịch sử mua</Link>
                </li>

                <li className={cx("item-function")}>
                  <Link to={routes.setting}>Cài đặt</Link>
                </li>
                <li className={cx("item-function")}>
                  <span onClick={handleLogOut}>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={cx("action-account")}>
            <Button to={routes.loginUser} outLine>
              Đăng nhập
            </Button>
            <Button to={routes.registerUser}>Đăng Ký</Button>
          </div>
        )}
      </div>
    </div>
  );
}
