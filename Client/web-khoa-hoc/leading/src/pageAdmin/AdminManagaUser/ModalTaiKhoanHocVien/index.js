import LoadingItem from "~/components/LoadingItem";
import useLoading from "~/hook/useLoading";
import * as HocVienServices from "~/api/HocVienServices";
import classNames from "classnames/bind";
import style from "./ModalTaiKhoanHocVien.module.scss";
import { useState } from "react";
const cx = classNames.bind(style);

export default function ModalTaiKhoanHocVien({ close, maHv }) {
  const [tkHv, setTkHv] = useState();
  const fetchApi = async () => {
    const res = await HocVienServices.layThongTinTaiKhoanHv(maHv);
    setTkHv(res);
  };
  const loading = useLoading(fetchApi);
  console.log(tkHv);
  return (
    <div className={cx("wrapper")}>
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
                  <th className={cx("w-150")}>Mã tài khoản</th>
                  <th className={cx("w-150")}>Tên học viên</th>
                  <th className={cx("w-150")}>Tên đăng nhập</th>
                  <th className={cx("w-150")}>Mật khẩu</th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              {/* <tbody>
                {dsHv
                  ? dsHv.map((item) => (
                      <tr>
                        <td>{item.maHv}</td>

                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ width: "50px", marginRight: "10px" }}
                              src={item.hinh}
                              alt="null"
                            />
                            <span>{item.tenHv}</span>
                          </div>
                        </td>
                        <td>{item.ngaySinh}</td>
                        <td>{item.phai}</td>
                        <td>{item.sdt}</td>
                        <td>{item.diaChi}</td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                              onClick={openModalHv}
                              title={"Xem tài khoản"}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : "ssdsd"}
              </tbody> */}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
