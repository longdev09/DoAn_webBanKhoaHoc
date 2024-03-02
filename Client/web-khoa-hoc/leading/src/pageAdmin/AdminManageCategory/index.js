import * as DanhMucServices from "~/api/DanhMucServices";
import Button from "~/components/Button";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import classNames from "classnames/bind";
import style from "./AdminManageCategory.module.scss";
import { useState } from "react";
import Modal from "~/components/Modal";
import ModalCategory from "./ModalCategory";
import ModalEditCategory from "./ModalEditCategory";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);
export default function AdminManageCategory() {
  const [danhMuc, setDanhMuc] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [dm, setDm] = useState({
    maDm: "",
    tenDm: "",
  });

  const fetchApi = async () => {
    const res = await DanhMucServices.layDsDanhMuc();
    setDanhMuc(res);
  };
  const loading = useLoading(fetchApi);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsOpenEdit(false);
    fetchApi();
  };
  const openModalEdit = (maDm, tenDm) => {
    setIsOpenEdit(true);
    setDm((prev) => ({
      ...prev,
      maDm: maDm,
      tenDm: tenDm,
    }));
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <Modal
        title={"Thêm Danh Mục"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalCategory close={closeModal} />}
        className={cx("custom-modal")}
      />
      <Modal
        title={"Sửa Danh Mục"}
        showModal={modalIsOpenEdit}
        closeModal={closeModal}
        children={<ModalEditCategory close={closeModal} dm={dm} />}
        className={cx("custom-modal")}
      />
      <div className={cx("heading")}>
        <h2>Quản lý danh mục</h2>
        <div className={cx("create-course")}>
          <span>Tạo Danh Mục Mới</span>
          <span>
            <Button onClick={openModal}>Tạo Danh Mục Mới</Button>
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
                  <th className={cx("w-150")}>Mã Danh Mục</th>
                  <th className={cx("w-150")}>Tên Danh Mục</th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {danhMuc
                  ? danhMuc.map((item) => (
                      <tr>
                        <td>{item.maDm}</td>
                        <td>{item.tenDm}</td>
                        <td>
                          <Button
                            onClick={() => openModalEdit(item.maDm, item.tenDm)}
                          >
                            Sửa
                          </Button>
                        </td>
                      </tr>
                    ))
                  : "Không có khóa học nào !"}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
