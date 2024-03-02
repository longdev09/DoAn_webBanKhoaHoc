import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Header_Course from "~/components/Header_Course";
import Input from "~/components/Input";
import classNames from "classnames/bind";
import style from "./CreateCourse_GioiThieu.module.scss";
import routes from "~/config/routesConfig";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Button from "~/components/Button";
import * as DanhMucServices from "~/api/DanhMucServices";
import * as KhoaHocServiecs from "~/api/KhoaHocServices";
import LoadingItem from "~/components/LoadingItem";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useCustomToast from "~/hook/useCustomToast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

export default function CreateCourse_GioiThieu() {
  let nav = useNavigate();
  const maGv = localStorage.getItem("maGv");
  const [khoaHoc, setKhoaHoc] = useState({
    MaGv: maGv,
    MaDm: "",
    TieuDe: "",
    Mota: "",
    KetQuaDatDuoc: "",
  });
  const [maKh, setMaKh] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingSummit, setLoadingSummit] = useState(false);
  const [image, setImage] = useState(null);
  const [dsDanhMuc, setDsDanhMuc] = useState();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChang = (index, value) => {
    setKhoaHoc((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const fetchApiDanhMuc = async () => {
    setLoading(true);
    const res = await DanhMucServices.layDsDanhMuc();
    setDsDanhMuc(res);
    setKhoaHoc((prev) => ({
      ...prev,
      MaDm: res[0].maDm,
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchApiDanhMuc();
  }, []);

  const handleSummbit = async () => {
    let downloadURL;
    setLoadingSummit(true);
    // them anh len storage
    if (image) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `${"GiangVien"}/${khoaHoc.MaGv}/${"background-course"}/${image.name}`
      );
      await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
    }
    const encodedURL = encodeURIComponent(downloadURL);
    const res = await KhoaHocServiecs.themKhoaHoc(khoaHoc, encodedURL);
    setLoadingSummit(false);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
      setMaKh(res.maKh);
    } else {
      showErrorToast(res.message);
    }
    nav(routes.mentorCreateCourse_ChuongTrinhHoc.replace(":maKh", res.maKh));
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      {loading ? (
        <LoadingItem />
      ) : (
        <Header_Course
          title={"Tạo khóa học mới"}
          icon={<FontAwesomeIcon icon={faPlus} />}
          chidren={
            <div className={cx("wrapper-course")}>
              <h2>Giới Thiệu</h2>
              <div className={cx("title-course")}>
                <Input
                  label={"Tiêu đề khóa học"}
                  onChange={(value) => handleChang("TieuDe", value)}
                />
              </div>
              <div className={cx("result-course")}>
                <span>Kết quả đạt được</span>
                <ReactQuill
                  className={cx("text-edit")}
                  theme="snow"
                  value={khoaHoc.KetQuaDatDuoc}
                  onChange={(value) => handleChang("KetQuaDatDuoc", value)}
                />
              </div>
              <div className={cx("result-course")}>
                <span>Mô tả khóa học</span>
                <ReactQuill
                  className={cx("text-edit")}
                  theme="snow"
                  value={khoaHoc.Mota}
                  onChange={(value) => handleChang("Mota", value)}
                />
              </div>
              <div className={cx("sub-course")}>
                <div className={cx("img-course")}>
                  <span>Ảnh đại diện cho khóa học</span>
                  <div
                    className={cx("input-file")}
                    onClick={() =>
                      document.querySelector(".input-select").click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      className="input-select"
                      onChange={handleFileChange}
                    />

                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faImage} size="xl" />
                    )}
                  </div>
                </div>
                <div className={cx("category")}>
                  <span>Danh mục cho khóa học</span>
                  <Dropdown
                    className={cx("custom-drop")}
                    options={
                      dsDanhMuc &&
                      dsDanhMuc.map((item) => ({
                        value: item.maDm, // Assuming MaDm is the property you want to use as the value
                        label: item.tenDm, // Assuming TenDm is the property you want to display as the label
                      }))
                    }
                    onChange={(selectedOption) =>
                      handleChang("MaDm", selectedOption.value)
                    }
                    // value={
                    //   dsDanhMuc &&
                    //   dsDanhMuc[0] && {
                    //     value: dsDanhMuc[0].maDm,
                    //     label: dsDanhMuc[0].tenDm,
                    //   }
                    // }
                    placeholder="Chọn danh mục khóa học"
                  />
                </div>
              </div>

              <div className={cx("btn-add")}>
                <Button
                  disabled={loadingSummit}
                  disabledcss={loadingSummit}
                  onClick={handleSummbit}
                  leftIcon={
                    loadingSummit ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      ""
                    )
                  }
                >
                  Bước tiếp theo
                </Button>
              </div>
              {/* <div className={cx("btn")}>
                <Button
                  to={routes.mentorCreateCourse_ChuongTrinhHoc.replace(
                    ":maKh",
                    maKh
                  )}
                >
                  Bước Tiếp Theo
                </Button>
              </div> */}
            </div>
          }
        />
      )}
    </div>
  );
}
