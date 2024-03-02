
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useCustomToast from "~/hook/useCustomToast";
import * as GioHangServices from "~/api/GioHangServices";
import numeral from "numeral";
import classNames from "classnames/bind";
import style from "./CouresItem.module.scss";
import Button from "../Button";
import routesConfig from "~/config/routesConfig";
import StarRating from "../StarRating";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(style);

export default function CouresItem({ item }) {
  const [loadingU, setLoadingU] = useState(false);
  let navigate = useNavigate();
  const maHV = localStorage.getItem("maHV");
  const { showErrorToast, showSuccessToast } = useCustomToast();
  // them vao gio
  const handleAddCart = async () => {
    setLoadingU(true);
    if (maHV == null) {
      navigate(routesConfig.loginUser);
    } else {
      const res = await GioHangServices.themGioHang(maHV, item.maKh);
      if (res.status == "Succes") {
        showSuccessToast(res.message);
      } else {
        showErrorToast(res.message);
      }
    }
    setLoadingU(false);
  };
  return (
    <div className={cx("course-link")}>
      <Link
        to={routesConfig.detailCourse.replace(":makhoahoc", item.maKh)}
        className={cx("course-logo")}
      >
        <img className={cx("course-logo-item")} src={item.hinhAnh} />
      </Link>

      <div className={cx("course-describe")}>
        <h2 className={cx("course-title")}>{item.tenKh}</h2>

        <span className={cx("course-name-mentor")}>{item.tenGv}</span>
        <div className={cx("course-star")}>
          <span className={cx("course-point")}>{item.tongSao}</span>
          <span className={cx("star")}>
            <StarRating rating={item.tongSao} />
          </span>
          <span className={cx("course-reviews")}>({item.tongDg})</span>
        </div>
        <div className={cx("course-price")}>
          {item.giaGiam ? (
            <>
              <span className={cx("price")}>
                {numeral(item.donGia).format("0,0")} ₫
              </span>
              <span className={cx("reduced-price")}>
                {numeral(item.giaGiam).format("0,0")} ₫
              </span>
            </>
          ) : (
            <>
              {/* <span className={cx("price")}>
                {numeral(item.donGia).format("0,0")}
              </span> */}
              <span className={cx("reduced-price")}>
                {numeral(item.donGia).format("0,0")} ₫
              </span>
            </>
          )}
        </div>
        <div className={cx("btn-add-cart")}>
          <Button
            leftIcon={loadingU ? <FontAwesomeIcon icon={faSpinner} spin /> : ""}
            disabled={loadingU}
            disabledcss={loadingU}
            onClick={handleAddCart}
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
}
