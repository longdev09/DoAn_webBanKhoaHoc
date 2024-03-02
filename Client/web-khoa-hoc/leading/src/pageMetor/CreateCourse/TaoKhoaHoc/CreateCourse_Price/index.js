import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamation } from "@fortawesome/free-solid-svg-icons";
import Input from "~/components/Input";
import Header_Course from "~/components/Header_Course";
import classNames from "classnames/bind";
import style from "./CreateCourse_Price.module.scss";
import { useState } from "react";
import numeral from "numeral";
import Button from "~/components/Button";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import { useParams } from "react-router-dom";
import useCustomToast from "~/hook/useCustomToast";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

export default function CreateCourse_Price() {
  const url = useParams();
  const [gia, setGia] = useState();

  const handleGia = (value) => {
    setGia(value);
  };

  const { showErrorToast, showSuccessToast } = useCustomToast();
  const fetchApi = async () => {
    const res = await KhoaHocServices.capNhatGiaKhoaHoc(url.maKh, gia);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
  };

  const handleSumit = () => {
    fetchApi();
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <Header_Course
        title={"Tạo khóa học mới"}
        icon={<FontAwesomeIcon icon={faPlus} />}
        content={"Chương trình giảng dạy"}
        chidren={
          <div className={cx("wrapper-course")}>
            <div className={cx("heading")}>
              <h2>Giá khóa học</h2>
              <div className={cx("sub-note")}>
                <span>
                  <FontAwesomeIcon icon={faExclamation} />
                </span>
                <span>
                  Lưu ý: Giá khóa học sau khi cập nhật sẽ là cố định và không
                  thay đổi, bạn có thể giảm giá bằng các khuyến mãi
                </span>
              </div>
            </div>
            <div className={cx("content")}>
              <h3>Giá khóa học của bạn</h3>
              <div>
                <Input
                  value={gia}
                  onChange={(value) => handleGia(value)}
                  label={"Giá khóa học (*)"}
                />
              </div>
              <div className={cx("price")}>
                <span>Giá bán: </span>
                <span>{numeral(gia).format("0,0")}</span>
                <span>VND</span>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleSumit}>Cập nhập</Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
