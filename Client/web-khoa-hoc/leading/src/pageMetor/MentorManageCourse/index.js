import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import style from "./MentorManageCourse.module.scss";
import Button from "~/components/Button";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import { useState } from "react";
import numeral from "numeral";
import Modal from "~/components/Modal";
import Modal_ApDungGiamGia from "./Modal_ApDungGiamGia";
import routes from "~/config/routesConfig";

const cx = classNames.bind(style);

export default function MentorManageCourse() {
  const maGv = localStorage.getItem("maGv");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dsKh, setDsKh] = useState();
  const [selectKh, setSelectKh] = useState({
    maKh: "",
    tenKh: "",
    donGia: "",
  });
  const fetchApiDsKh = async () => {
    const res = await KhoaHocServices.layThongTinKhoaHocTheoMaGv(maGv);
    setDsKh(res);
  };

  const loading = useLoading(fetchApiDsKh);

  const openModal = (maKh, tenKh, donGia) => {
    setSelectKh((prev) => ({
      ...prev,
      maKh: maKh,
      tenKh: tenKh,
      donGia: donGia,
    }));
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={cx("wrapper")}>
      {/* <ToastContainer /> */}
      <Modal
        title={"Áp dụng giảm giá"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<Modal_ApDungGiamGia kh={selectKh} />}
        className={cx("custom-modal")}
      />
      <div className={cx("heading")}>
        <h2>Quản lý khóa học</h2>

        <div className={cx("create-course")}>
          <span>Bắt đầu tạo khóa học</span>
          <span>
            <Button>Tạo khóa học của bạn</Button>
          </span>
        </div>
      </div>
      <div className={cx("content")}>
        {loading ? (
          <LoadingItem />
        ) : (
          <div className={cx("table-content")}>
            <table className={cx("table-list")}>
              <colgroup>
                <col style={{ width: "50px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={cx("w-150")}>Mã khóa học</th>
                  <th className={cx("w-150")}>Tiêu đề</th>
                  <th className={cx("w-150")}>Đơn giá </th>
                  <th className={cx("w-150")}>Danh mục </th>
                  <th className={cx("w-150")}>Giảm giá </th>
                  <th className={cx("w-50")}>Action</th>

                  {/* <th className={cx("w-150")}>Giá giảm</th> */}
                </tr>
              </thead>

              <tbody>
                {dsKh
                  ? dsKh.map((item) => (
                      <tr>
                        <td>{item.maKh}</td>

                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.hinh}
                              alt="null"
                            />
                            <span>{item.tenKh}</span>
                          </div>
                        </td>
                        <td>{numeral(item.gia).format("0,0")}</td>
                        <td>{item.tenDm}</td>
                        <td>
                          {item.giaGiam ? (
                            <>
                              <div className={cx("sale")}>
                                <span>
                                  {numeral(item.giaGiam).format("0,0")}
                                </span>
                                <span>{item.ngayBatDau}</span>
                                <span>{item.ngayKetThuc}</span>
                              </div>
                            </>
                          ) : (
                            <Button
                              onClick={() =>
                                openModal(item.maKh, item.tenKh, item.gia)
                              }
                              outLine
                            >
                              Áp dụng
                            </Button>
                          )}
                        </td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                              to={routes.detailCourse.replace(
                                ":makhoahoc",
                                item.maKh
                              )}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                            <Button
                              utton
                              to={routes.mentorCreateCourse_ChuongTrinhHoc.replace(
                                ":maKh",
                                item.maKh
                              )}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                            <Button>
                              <FontAwesomeIcon icon={faLock} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : "ssdsd"}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
