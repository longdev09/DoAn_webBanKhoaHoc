import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./AdminLearning.module.scss";
import { useParams } from "react-router-dom";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import Button from "~/components/Button";
const cx = classNames.bind(style);

export default function AdminLearning() {
  const ulr = useParams();
  const [kh, setKh] = useState();
  const [video, setVideo] = useState();

  const [isContentVisible, setIsContentVisible] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchApi = async () => {
    const res = await KhoaHocServices.layThongTinKhoaHocTheoMa(ulr.makhoahoc);
    setKh(res);
  };
  const loading = useLoading(fetchApi);

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const items = doc.querySelectorAll("li");
    // Lấy nội dung văn bản từ mỗi thẻ <li>
    const textArray = Array.from(items).map((item) => item.textContent);
    return textArray;
  };

  const handleOpentChappter = (maChuong) => {
    setIsContentVisible((prev) => ({
      ...prev,
      [maChuong]: !prev[maChuong],
    }));
  };
  const handleSetVideo = (maNoiDung, video) => {
    setSelectedItem(maNoiDung);
    setVideo(video);
    console.log(video);
  };
  useEffect(() => {
    const videoPlayer = document.getElementById("videoPlayer");

    const handleCanPlay = () => {
      videoPlayer.play();
      videoPlayer.removeEventListener("canplay", handleCanPlay);
    };

    if (videoPlayer) {
      videoPlayer.addEventListener("canplay", handleCanPlay);

      videoPlayer.load();
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, [video]);

  
  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <LoadingItem />
      ) : (
        <div className={cx("content-learning")}>
          <div className={cx("video-wrapp")}>
            <div className={cx("video-bg")}>
              <div className={cx("video-js")}>
                <video
                  width="100%"
                  height="100%"
                  controls
                  id="videoPlayer"
                  autoPlay
                >
                  <source type="video/mp4" src={video} />
                </video>
              </div>
            </div>

            <div className={cx("video-content")}>
              <div className={cx("name-course")}>
                <h3>Cài đặt môi trường</h3>
              </div>
              <div>
                <p>
                  Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám
                  thính" xem F8 sắp có gì mới nhé!
                </p>
              </div>
            </div>
          </div>
          <div className={cx("track-wrapp")}>
            <div className={cx("track-container")}>
              <h2>Nội dung khóa học</h2>
              <div className={cx("list-course")}>
                {kh.dsChuong.map((item) => (
                  <div className={cx("item-course")}>
                    <div
                      onClick={() => handleOpentChappter(item.maChuong)}
                      className={cx("chapter")}
                    >
                      <div className={cx("title-chapter")}>
                        {item.tenChuong}
                      </div>
                      <div className={cx("arrow")}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    </div>
                    <div
                      className={cx("content-course")}
                      style={{
                        display: isContentVisible[item.maChuong]
                          ? "block"
                          : "none",
                      }}
                    >
                      <ul className={cx("list")}>
                        {item.noiDungChuongs.map((itemNd) => (
                          <li
                            onClick={() =>
                              handleSetVideo(itemNd.maNoiDung, itemNd.video)
                            }
                            className={cx("item", {
                              selected: selectedItem === itemNd.maNoiDung,
                            })}
                          >
                            <div className={cx("text")}>
                              {itemNd.tenNoiDung}
                            </div>
                            <div className={cx("time")}>00:07</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
