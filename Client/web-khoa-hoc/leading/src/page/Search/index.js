import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import StarRating from "~/components/StarRating";
import classNames from "classnames/bind";
import style from "./Search.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import numeral from "numeral";
import routes from "~/config/routesConfig";
const cx = classNames.bind(style);

export default function Search() {
  const ulr = useParams();
  const [dsKh, setDsKh] = useState();
  const [loading, setLoading] = useState(false);
  const fetchApi = async () => {
    setLoading(true);
    const res = await KhoaHocServices.TimThongTinKhoaHoc(ulr.search);
    setLoading(false);

    setDsKh(res);
  };

  // const loading = useLoading(fetchApi);

  useEffect(() => {
    fetchApi();
  },[]);


  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {loading ? (
          <LoadingItem />
        ) : (
          <>
            <div className={cx("heading")}>
              <h2>Kết quả cho “{ulr.search}” </h2>
            </div>
            <div className={cx("course")}>
              <div className={cx("list-course")}>
                {dsKh &&
                  dsKh.map((item) => (
                    <Link
                      to={routes.detailCourse.replace(":makhoahoc", item.maKh)}
                      className={cx("item")}
                    >
                      <div className={cx("info-course")}>
                        <div className={cx("img")}>
                          <img src={item.hinhAnh} />
                        </div>
                        <div className={cx("c-courese")}>
                          <div className={cx("name-course")}>
                            <h4>{item.tenKh}</h4>
                          </div>
                          <div className={cx("name-mentor")}>
                            {/* {item.} */}
                          </div>
                          {/* <div className={cx("course-star")}>
                            <span className={cx("course-point")}>{10}</span>
                            <span className={cx("star")}>
                              <StarRating rating={"5"} />
                            </span>
                            <span className={cx("course-reviews")}>({10})</span>
                          </div> */}
                          {/* <div className={cx("describe")}>
                            <span>26 chương</span>
                            <span>• 340 bài giảng</span>
                            <span> • 22 giờ 39 phút tổng thời lượng</span>
                          </div> */}
                        </div>
                      </div>
                      <div className={cx("price-course")}>
                        <span>{numeral(item.donGia).format("0,0")} đ</span>
                        {/* <span>300000</span> */}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
