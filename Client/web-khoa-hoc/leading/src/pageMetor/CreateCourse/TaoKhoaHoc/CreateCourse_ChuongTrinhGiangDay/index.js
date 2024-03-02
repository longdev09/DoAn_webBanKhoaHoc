import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header_Course from "~/components/Header_Course";
import classNames from "classnames/bind";
import style from "./CreateCourse_ChuongTrinhGiangDay.module.scss";
import Button from "~/components/Button";
import ItemChuong from "./Item_Chuong";
import { useState } from "react";
import Modal from "~/components/Modal";
import ModalThemChuong from "./Modal_ThemChuong";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import { useParams } from "react-router-dom";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import { ToastContainer } from "react-toastify";
import routes from "~/config/routesConfig";
const cx = classNames.bind(style);

export default function CreateCourse_ChuongTrinhGiangDay() {
  const ulr = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dsChuong, setDsChuong] = useState();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    fetchApiChuong();
  };

  const fetchApiChuong = async () => {
    const res = await KhoaHocServices.layDsChuong(ulr.maKh);
    setDsChuong(res);
  };

  const loading = useLoading(fetchApiChuong);
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <Modal
        title={"Chương mới"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalThemChuong close={closeModal} />}
        className={cx("custom-modal")}
      />
      <Header_Course
        title={"Tạo khóa học mới"}
        icon={<FontAwesomeIcon icon={faPlus} />}
      />

      <div className={cx("wrapper-course")}>
        {loading ? (
          <LoadingItem height={"100px"} />
        ) : (
          <ItemChuong dsChuong={dsChuong} />
        )}

        <div className={cx("btn-add-chapter")}>
          <Button onClick={openModal}>Thêm Chương</Button>
        </div>

        <div className={cx("btn-step")}>
          <Button
            w100
            to={routes.mentorCreateCourse_Price.replace(":maKh", ulr.maKh)}
          >
            Bước tiếp theo
          </Button>
        </div>
      </div>
    </div>
  );
}
