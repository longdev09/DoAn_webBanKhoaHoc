import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import Button from "~/components/Button";
import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import classNames from "classnames/bind";
import style from "./AdminManageCourse.module.scss";
import { useState } from "react";
import routes from "~/config/routesConfig";
const cx = classNames.bind(style);

export default function AdminManageCourse() {
  const [dsKh, setDsKh] = useState();
  const fetchApi = async () => {
    const res = await KhoaHocServices.layDsKhoaHocAdmin();
    setDsKh(res);
  };

  const loading = useLoading(fetchApi);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h2>Quản lý khóa học</h2>
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
                  <th className={cx("w-150")}>Mã khóa học</th>
                  <th className={cx("w-150")}>Tiêu đề</th>
                  <th className={cx("w-150")}>Tên giảng viên </th>
                  <th className={cx("w-150")}>Đơn giá </th>
                  <th className={cx("w-150")}>Danh mục </th>
                  <th className={cx("w-150")}>Trạng thái </th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {dsKh
                  ? dsKh.map((item) => (
                      <tr>
                        <td>{item.maKh}</td>

                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.hinh}
                              alt="null"
                            />
                            <span>{item.tenKh}</span>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.anhGv}
                              alt="null"
                            />
                            <span>{item.tenGv}</span>
                          </div>
                        </td>
                        <td>{numeral(item.gia).format("0,0")}</td>
                        <td>{item.tenDm}</td>
                        <td>{item.trangThai}</td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                              title={"Xem chi tiết"}
                              to={routes.adminDetailCourse.replace(
                                ":makhoahoc",
                                item.maKh
                              )}
                            >
                              <FontAwesomeIcon icon={faEye} />
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
