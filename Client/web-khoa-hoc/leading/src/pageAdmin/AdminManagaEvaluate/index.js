import LoadingItem from "~/components/LoadingItem";
import Button from "~/components/Button";
import * as DanhGiaServices from "~/api/DanhGiaServices";
import { useState } from "react";
import useLoading from "~/hook/useLoading";
import classNames from "classnames/bind";
import style from "./AdminManagaEvaluate.module.scss";
const cx = classNames.bind(style);

export default function AdminManagaEvaluate() {
  const [dsDanhGia, setDsDanhGia] = useState();

  const fetchApi = async () => {
    const res = await DanhGiaServices.layDanhSachDanhGia();
    setDsDanhGia(res);
  };
  const loading = useLoading(fetchApi);
  console.log(dsDanhGia);
  const handleDelete = async(value) => {
    await DanhGiaServices.xoaDanhGia(value);
    fetchApi();

  }
  return (
  
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h2>Quản lý Đánh Giá</h2>
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
                  <th className={cx("w-150")}>Tên học viên</th>
                  <th className={cx("w-150")}>Hình</th>
                  <th className={cx("w-150")}>Số sao</th>
                  <th className={cx("w-150")}>Nội dung</th>
                  <th className={cx("w-150")}>Ngày</th>
                  <th className={cx("w-50")}>Action</th>
                </tr>
              </thead>

              <tbody>
                {dsDanhGia
                  ? dsDanhGia.map((item) => (
                      <tr>
                        <td>{item.tenHv}</td>
                        <td>{item.hinh}</td>
                        <td>{item.soSao}</td>
                        <td>{item.noiDung}</td>
                        <td>{item.ngayDgFormatted}</td>
                        <td>
                          <div className={cx("action")}>
                            <Button
                            onClick={() => handleDelete(item.maDg)}
                              title={"Xóa đánh giá"}
                            >  
                            Xóa
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
