import * as KhoaHocServiecs from "~/api/KhoaHocServices";
import ListCoures from "./ListCoures";
import HomeReason from "./HomeReason";
import SlickComp from "~/components/SlickComp/SlickComp";
import MentorItem from "./Mentor";
import HomeLeadingTodyItem from "./HomeLeadingToday";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./Home.module.scss";
import { useEffect, useState } from "react";
import useLoading from "~/hook/useLoading";
import Loading from "~/components/Loading";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import routes from "~/config/routesConfig";
const cx = classNames.bind(style);

export default function Home() {
  const [dsKhoaHoc, setDsKhoaHoc] = useState();

  // call api

  const fetchApidsKhoaHoc = async () => {
    const res = await KhoaHocServiecs.layDsKhoaHoc();
    setDsKhoaHoc(res);
  };

  const loading = useLoading(fetchApidsKhoaHoc);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("home-wrapper")}>
          <ToastContainer />
          {/* banner  */}
          <div className={cx("home-banner")}>
            <div className={cx("banner")}>
              <h1>Free Online Courses With Certificates & Diplomas</h1>
              <div className={cx("describe")}>Hãy học khi còn có thế</div>
              <div className={cx("img-banner")}>
                <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/banner%2Fbanner-image.svg?alt=media&token=6de5ea24-05f2-41d9-9e0e-7a0fd36dbe16" />
              </div>
            </div>

            <div className={cx("banner-bottom")}>
              <div className={cx("text")}>
                <span>
                  <FontAwesomeIcon icon={faPeopleGroup} />
                </span>
                30 triệu+ Người học
              </div>
              <div className={cx("text")}>6 triệu+ Tốt nghiệp</div>
              <div className={cx("text")}>1000+ Giảng viên ưu tú</div>
              <div className={cx("text")}>10 triệu+ Video chất lượng</div>
            </div>
          </div>

          {/* cac khóa học phổ bi  */}
          <ListCoures
            title={"Các khóa học bạn nên bắt đầu"}
            arrayKhoaHoc={dsKhoaHoc}
          />

          <div className={cx("wrapper-nav")}>
            <div className={cx("bg")}></div>
            <div className={cx("nav-list")}>
              <div className={cx("title")}>
                <h1>Khám phá hơn 10.000 khóa học trực tuyến</h1>
              </div>
              <div className={cx("list")}>
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
              </div>
              <div className={cx("list")}>
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
                <HomeLeadingTodyItem />
              </div>
            </div>
          </div>

          <ListCoures arrayKhoaHoc={dsKhoaHoc} />
          <HomeReason />

          <div className={cx("wrapp-mentor")}>
            <div className={cx("title")}>
              <h1>Đội ngủ giảng viên ưu tú</h1>
            </div>
            <div className={cx("list-mentor")}>
              <SlickComp
                slidesToShow={5}
                arraySide={[
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                  <MentorItem />,
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
