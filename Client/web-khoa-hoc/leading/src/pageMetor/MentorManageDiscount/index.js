import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./MentorManageDiscount.module.scss";
import { useState } from "react";
import * as GiamGiaServices from "~/api/GiamGiaServices";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import ModalDiscount from "./ModalDiscount/ModalDiscount";
const cx = classNames.bind(style);

export default function MentorManageDiscount() {
  const maGv = localStorage.getItem("maGv");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dsGiamGia, setDsGiamGia] = useState();
  const fetchApiGiamGia = async () => {
    const res = await GiamGiaServices.layDsGiamGia(maGv);
    setDsGiamGia(res);
  };

  const loading = useLoading(fetchApiGiamGia);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    fetchApiGiamGia();
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title={"Tạo giảm giá"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalDiscount close={closeModal} />}
        className={cx("custom-modal")}
      />
      <div className={cx("heading")}>
        <h2>Quản lý giảm giá</h2>
        <div className={cx("create-course")}>
          <span>Tạo Giảm giá mới</span>
          <span>
            <Button onClick={openModal}>Tạo Giảm giá mới</Button>
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
                  <th className={cx("w-150")}>Mã giảm giá</th>
                  <th className={cx("w-150")}>Phần trăm giảm</th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {dsGiamGia
                  ? dsGiamGia.map((item) => (
                      <tr>
                        <td>{item.maGg}</td>
                        <td>{item.phanTramGiam} %</td>
                        <td>
                          <div className={cx("action")}>
                            <Button>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                            <Button>
                              <FontAwesomeIcon icon={faTrash} />
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
