import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Input from "~/components/Input";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./RegisterMentor.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as GiangVienServices from "~/api/GiangVienServices";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useCustomToast from "~/hook/useCustomToast";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

export default function RegisterMentor() {
  const [loadingU, setLoadingU] = useState(false);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const [dataGiangVien, setDataGiangVien] = useState({
    TeGv: "",
    GioiThieu: "",
    NgaySinh: "",
    Phai: "",
    Sdt: "",
    Email: "",
  });

  const option = ["Nam", "Nữ"];

  const [imgAvata, setImgAvata] = useState();
  const [imgCmndMacTruoc, setImgCmndMacTruoc] = useState();
  const [imgCmndMacSau, setImgCmndMacSau] = useState();

  const handleChang = (index, value) => {
    setDataGiangVien((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleFileChangeAvata = (e) => {
    if (e.target.files[0]) {
      setImgAvata(e.target.files[0]);
    }
  };
  const handleFileChangeCmndMacTruoc = (e) => {
    if (e.target.files[0]) {
      setImgCmndMacTruoc(e.target.files[0]);
    }
  };
  const handleFileChangeCmndMacSau = (e) => {
    if (e.target.files[0]) {
      setImgCmndMacSau(e.target.files[0]);
    }
  };
  const themInfo = async (image, maGv) => {
    let downloadURL;
    // them anh len storage
    if (image) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `${"GiangVien"}/${maGv}/${"thong-tin"}/${image.name}`
      );
      await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
    }

    return downloadURL;
  };
  const handleSumbit = async () => {
    setLoadingU(true);
    const res = await GiangVienServices.taoTaiKhoanNguoiDungGiangVien(
      dataGiangVien.Email
    );
    if (res.status == "Succes") {
      const ulrAvata = encodeURIComponent(await themInfo(imgAvata, res.maGv));
      const ulrMacTruoc = encodeURIComponent(
        await themInfo(imgCmndMacTruoc, res.maGv)
      );
      const ulrMacSau = encodeURIComponent(
        await themInfo(imgCmndMacSau, res.maGv)
      );
      const ress = await GiangVienServices.taoGiangVien(
        res.maGv,
        res.maNd,
        ulrAvata,
        ulrMacTruoc,
        ulrMacSau,
        dataGiangVien
      );
      if (ress.status == "Succes") {
        showSuccessToast(ress.message);
      } else {
        showErrorToast(ress.message);
      }
    } else {
      showErrorToast(res.message);
    }
    setLoadingU(false);
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer />
      <div id="recaptcha-container"></div>
      <div className={cx("content")}>
        <div>
          <div className={cx("heading")}>
            <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
          </div>
          <div className={cx("wrapper-login")}>
            <div className={cx("title")}>
              <span>Đăng Ký Tài Khoản Giảng Viên</span>
            </div>
            {/* input du lieu  */}
            <div className={cx("info-mentor")}>
              <div className={cx("input-group")}>
                <div className={cx("item-input")}>
                  <Input
                    pla={"Họ tên của bạn"}
                    onChange={(value) => handleChang("TenGv", value)}
                  />
                </div>
                <div className={cx("item-input")}>
                  <Input
                    type={"date"}
                    pla={"Ngày sinh"}
                    onChange={(value) => handleChang("NgaySinh", value)}
                  />
                </div>
              </div>
            </div>
            <div className={cx("info-mentor")}>
              <div className={cx("input-group")}>
                <div className={cx("item-input")}>
                  <Input
                    pla={"Số điện thoại"}
                    onChange={(value) => handleChang("Sdt", value)}
                  />
                </div>
                <div className={cx("item-input")}>
                  <Input
                    pla={"Email"}
                    onChange={(value) => handleChang("Email", value)}
                  />
                </div>
              </div>
            </div>
            <div className={cx("info-mentor")}>
              <div className={cx("input-group")}>
                <div className={cx("item-input")} style={{ width: "100%" }}>
                  <Dropdown
                    className={cx("custom-drop")}
                    placeholder="Giới tính"
                    options={option.map((item) => ({
                      value: item,
                    }))}
                    onChange={(selectedOption) =>
                      handleChang("Phai", selectedOption.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cx("info-mentor")}>
              <div className={cx("input-group")}>
                <div className={cx("item-input")} style={{ width: "100%" }}>
                  <ReactQuill
                    placeholder="Giới thiệu về bạn"
                    className={cx("text-edit")}
                    theme="snow"
                    onChange={(value) => handleChang("GioiThieu", value)}
                  />
                </div>
              </div>
            </div>

            <div className={cx("info-mentor")}>
              <div className={cx("input-group")}>
                <div className={cx("item-input")}>
                  <div
                    className={cx("input-file")}
                    onClick={() =>
                      document.querySelector(".input-select-avata").click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      className="input-select-avata"
                      onChange={handleFileChangeAvata}
                    />

                    {imgAvata ? (
                      <img
                        src={URL.createObjectURL(imgAvata)}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <div className={cx("text-img")}>
                        <span>Ảnh đại diện của bạn</span>
                        <FontAwesomeIcon icon={faImage} size="xl" />
                      </div>
                    )}
                  </div>
                </div>
                <div className={cx("item-input")}>
                  <div
                    className={cx("input-file")}
                    onClick={() =>
                      document
                        .querySelector(".input-select-cmnd-mac-truoc")
                        .click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      className="input-select-cmnd-mac-truoc"
                      onChange={handleFileChangeCmndMacTruoc}
                    />

                    {imgCmndMacTruoc ? (
                      <img
                        src={URL.createObjectURL(imgCmndMacTruoc)}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <div className={cx("text-img")}>
                        <span>Cmnd mặc trước</span>
                        <FontAwesomeIcon icon={faImage} size="xl" />
                      </div>
                    )}
                  </div>
                </div>
                <div className={cx("item-input")}>
                  <div
                    className={cx("input-file")}
                    onClick={() =>
                      document
                        .querySelector(".input-select-cmnd-mac-sau")
                        .click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      className="input-select-cmnd-mac-sau"
                      onChange={handleFileChangeCmndMacSau}
                    />

                    {imgCmndMacSau ? (
                      <img
                        src={URL.createObjectURL(imgCmndMacSau)}
                        width={150}
                        height={150}
                      />
                    ) : (
                      <div className={cx("text-img")}>
                        <span>Cmnd mặc sau</span>
                        <FontAwesomeIcon icon={faImage} size="xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("btn-login")}>
              <Button
                w100
                onClick={handleSumbit}
                disabled={loadingU}
                disabledcss={loadingU}
                leftIcon={
                  loadingU ? <FontAwesomeIcon icon={faSpinner} spin /> : ""
                }
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* footer  */}
      {/* <div className={cx("footer")}>
        <span>©2023 Website được thực hiện bởi longDev</span>
      </div>
      <div className={cx("banner")}></div> */}
    </div>
  );
}
