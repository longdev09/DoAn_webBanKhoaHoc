import classNames from "classnames/bind";
import style from "./DetailMyCourse.module.scss";
import Button from "~/components/Button";
import { useState } from "react";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routesConfig";
const cx = classNames.bind(style);

export default function DetailMyCourse() {
  let navigate = useNavigate();
  const maHv = localStorage.getItem("maHV");
  const [dsKh, setDsKh] = useState();

  const fetchApi = async () => {
    const res = await KhoaHocServices.layDsKhoaHocDaMua(maHv);
    setDsKh(res);
  };

  const handleHoc = (maKh) => {
    navigate(routes.learning.replace(":makhoahoc", maKh));
  };
  console.log(dsKh);
  const loading = useLoading(fetchApi);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("heading")}>
          <h3>Khóa học của tôi</h3>
        </div>
        <div className={cx("container")}>
          <div className={cx("fill-course")}>
            <div>Giang Vieng</div>
            <div>Tim Kiem</div>
          </div>
          {loading ? (
            <LoadingItem />
          ) : (
            <div className={cx("list-course")}>
              {dsKh &&
                dsKh.map((item) => (
                  <div className={cx("item-course")}>
                    <div className={cx("img-course")}>
                      <img src={item.hinhAnh} />
                    </div>
                    <div className={cx("content-course")}>
                      <div className={cx("name-course")}>
                        <span>{item.tenKh}</span>
                      </div>
                      <div className={cx("name-mentor")}>{item.tenGv}</div>
                      <div className={cx("progress-bar")}></div>
                    </div>
                    <div className={cx("btn")}>
                      <Button onClick={() => handleHoc(item.maKh)}>
                        Học tiếp
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
