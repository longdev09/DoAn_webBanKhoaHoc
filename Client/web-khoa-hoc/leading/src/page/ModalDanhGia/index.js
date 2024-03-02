import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./ModalDanhGia.module.scss";
import Button from "~/components/Button";
import * as DanhGiaServices from "~/api/DanhGiaServices";
import useCustomToast from "~/hook/useCustomToast";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

export default function ModalDanhGia({ close }) {
  const maHV = localStorage.getItem("maHV");
  const url = useParams();
  const [dataCmt, setDataCmt] = useState({
    maKh: url.makhoahoc,
    maHv: maHV,
    soSao: 0,
    noiDung: "",
  });
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const [value, setValue] = useState("");
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  useEffect(() => {
    setDataCmt((pre) => ({
      ...pre,
      soSao: currentValue,
      noiDung: value,
    }));
  }, [value, currentValue]);

  console.log(dataCmt);
  const handleSumit = async () => {
    const res = await DanhGiaServices.danhGiaKhoaHoc(
      dataCmt.maHv,
      dataCmt.maKh,
      dataCmt.noiDung,
      dataCmt.soSao
    );
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    setDataCmt((pre) => ({
      ...pre,
      maKh: url.makhoahoc,
      maHv: maHV,
      soSao: 0,
      noiDung: "",
    }));
    setCurrentValue(0);
    setValue("");
    close();
  };
  return (
    <div className={cx("wrapp")}>
      <div className={cx("container")}>
        <div className={cx("cmt-content")}>
          <div className={cx("evaluate")}>
            <div className={cx("star")}>
              <div>Mức độ đánh giá</div>
              <div className={cx("star-danhgia")}>
                {stars.map((item, index) => (
                  <FontAwesomeIcon
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    className={cx("custom-start")}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    icon={faStar}
                  />
                ))}
              </div>
            </div>
            <div className={cx("cmt")}>
              <ReactQuill
                value={value}
                className={cx("text-edit")}
                theme="snow"
                onChange={setValue}
              />
            </div>
            <div className={cx("btn")}>
              <Button onClick={handleSumit}>Gửi</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
