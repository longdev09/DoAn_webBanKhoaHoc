import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faPenToSquare,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./ItemNoiDung.module.scss";
import { useEffect, useState } from "react";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import Button from "~/components/Button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingItem from "~/components/LoadingItem";
import Modal from "~/components/Modal";
import ModalThemNoiDung from "../Modal_ThemNd";
const cx = classNames.bind(style);

export default function ItemNoiDung({ maCh }) {
  const maGv = localStorage.getItem("maGv");
  const [openAddVideo, setOpenAddVideo] = useState({});
  const [noiDung, setNoiDung] = useState();
  const [loadingVideos, setLoadingVideos] = useState({});
  const [ulrVideo, setUrlVideo] = useState({});

  const fetchApiNoiDung = async () => {
    const res = await KhoaHocServices.layDsNdChuong(maCh);

    const dsNdChuongSorted = [...res].sort((a, b) => a.stt - b.stt);
    setNoiDung(dsNdChuongSorted);
  };

  useEffect(() => {
    fetchApiNoiDung();
  }, []);

  const handleFileChange = async (e, maNd) => {
    const file = e.target.files[0];
    uploadVideo(file, maNd);
  };

  const uploadVideo = async (videoFile, maNd) => {
    let downloadURL;
    setLoadingVideos((prevLoadingVideos) => ({
      ...prevLoadingVideos,
      [maNd]: true,
    }));
    if (videoFile) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `${"GiangVien"}/${maGv}/${"video-khoa-hoc"}/${maCh}/${maNd}/${
          videoFile.name
        }`
      );
      await uploadBytes(storageRef, videoFile);
      downloadURL = await getDownloadURL(storageRef);
    }
    const encodedURL = encodeURIComponent(downloadURL);
    await KhoaHocServices.ThemVideoNoiDung(maNd, encodedURL);
    setLoadingVideos((prevLoadingVideos) => ({
      ...prevLoadingVideos,
      [maNd]: false,
    }));

    setUrlVideo((prev) => ({
      ...prev,
      [maNd]: videoFile,
      [videoFile]: videoFile,
    }));
  };

  const handleOpenAddVideo = (maNd) => {
    setOpenAddVideo((prev) => ({
      ...prev,
      [maNd]: !prev[maNd],
    }));
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    fetchApiNoiDung();
  };

  return (
    <div className={cx("list-item")}>
      <Modal
        title={"Nội dung mới"}
        showModal={modalIsOpen}
        closeModal={closeModal}
        children={<ModalThemNoiDung close={closeModal} maCh={maCh} />}
        className={cx("custom-modal")}
      />
      {noiDung &&
        noiDung.map((item, index) => (
          <div className={cx("item")}>
            <div className={cx("heading")}>
              <div className={cx("name-content")}>
                <span>
                  <FontAwesomeIcon icon={faDisplay} />
                </span>
                <span>{index + 1}. </span>
                <span>{item.tenNd}</span>
                <div className={cx("btn-edit")}>
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
              <div
                onClick={() => handleOpenAddVideo(item.maNd)}
                className={cx("add-video")}
              >
                <span>
                  <FontAwesomeIcon icon={faVideo} />
                </span>
              </div>
            </div>

            {/* upload video  */}
            <div
              className={cx("video")}
              style={{
                display: openAddVideo[item.maNd] ? "block" : "none",
              }}
            >
              <div className={cx("video-course")}>
                <div
                  className={cx("input-file")}
                  onClick={() =>
                    document.querySelector(`.input-select-${item.maNd}`).click()
                  }
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    className={`input-select-${item.maNd}`}
                    onChange={(e) => handleFileChange(e, item.maNd)}
                  />

                  {loadingVideos[item.maNd] ? (
                    <LoadingItem />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "50px",
                      }}
                    >
                      {ulrVideo[item.maNd] ? (
                        <span>Tải lên video thành công</span>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faVideo} />
                          <span>Tải lên video của bạn</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className={cx("add-nd")}>
        <Button
          onClick={openModal}
          // leftIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Tạo nội dung
        </Button>
      </div>
    </div>
  );
}
