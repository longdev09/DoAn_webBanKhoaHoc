import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as GiangVienServices from "~/api/GiangVienServices";
import LoadingItem from "~/components/LoadingItem";
import classNames from "classnames/bind";
import style from "./ModalTaiKhoanGiangVien.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
const cx = classNames.bind(style);

export default function ModalTaiKhoanGiangVien({ maGv }) {
  const [loadingBtn, setLoadinBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tk, setTk] = useState();
  const [gv, setGv] = useState();

  const fetchApi = async () => {
    setLoading(true);
    const res = await GiangVienServices.layThongTinGiangVienTheoMa(maGv);
    const ress = await GiangVienServices.layThongTinGVTheoMa(maGv);
    setGv(ress);
    setTk(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, [maGv]);

  const handleSetDuyet = async (maNd) => {
    const res = await GiangVienServices.suaTrangThaiTaiKhoanGiangVien(
      maNd,
      "Duyệt"
    );
    fetchApi();
  };
  const handleSetTuChoi = async (maNd) => {
    setLoadinBtn(true);
    const res = await GiangVienServices.suaTrangThaiTaiKhoanGiangVien(
      maNd,
      "Từ chối"
    );
    setLoadinBtn(false);
    fetchApi();
  };
  const handleSetKhoa = async (maNd) => {
    setLoadinBtn(true);
    const res = await GiangVienServices.suaTrangThaiTaiKhoanGiangVien(
      maNd,
      "Khóa"
    );
    setLoadinBtn(false);
    fetchApi();
  };
  const handleMo = async (maNd) => {
    setLoadinBtn(true);
    const res = await GiangVienServices.suaTrangThaiTaiKhoanGiangVien(
      maNd,
      "Duyệt"
    );
    setLoadinBtn(false);
    fetchApi();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {loading ? (
          <LoadingItem />
        ) : (
          <>
            <div className={cx("table-content")}>
              <table className={cx("table-list")}>
                <colgroup>
                  <col style={{ width: "50px" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className={cx("w-150")}>Mã tài khoản</th>
                    <th className={cx("w-150")}>Tên đăng nhập</th>
                    <th className={cx("w-150")}>Mật khẩu</th>
                    <th className={cx("w-150")}>Trạng thái</th>

                    <th className={cx("w-50")}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {tk ? (
                    <tr>
                      <td>{tk.maNd}</td>

                      <td>{tk.tenDn}</td>
                      <td>{tk.matKhau}</td>
                      <td>{tk.trangThai}</td>
                      <td>
                        {tk.trangThai == "Chưa Duyệt" ? (
                          <div className={cx("action")}>
                            <Button
                              onClick={() => handleSetDuyet(tk.maNd)}
                              disabled={loadingBtn}
                              disabledcss={loadingBtn}
                              leftIcon={
                                loadingBtn ? (
                                  <FontAwesomeIcon icon={faSpinner} spin />
                                ) : (
                                  ""
                                )
                              }
                            >
                              Duyệt
                            </Button>
                            <Button
                              disabled={loadingBtn}
                              disabledcss={loadingBtn}
                              leftIcon={
                                loadingBtn ? (
                                  <FontAwesomeIcon icon={faSpinner} spin />
                                ) : (
                                  ""
                                )
                              }
                              onClick={() => handleSetTuChoi(tk.maNd)}
                            >
                              Từ chối
                            </Button>
                          </div>
                        ) : tk.trangThai == "Khóa" ? (
                          <Button
                            disabled={loadingBtn}
                            disabledcss={loadingBtn}
                            leftIcon={
                              loadingBtn ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                              ) : (
                                ""
                              )
                            }
                            onClick={() => handleMo(tk.maNd)}
                          >
                            Mở
                          </Button>
                        ) : (
                          <Button
                            disabled={loadingBtn}
                            disabledcss={loadingBtn}
                            leftIcon={
                              loadingBtn ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                              ) : (
                                ""
                              )
                            }
                            onClick={() => handleSetKhoa(tk.maNd)}
                          >
                            Khóa
                          </Button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    "ssdsd"
                  )}
                </tbody>
              </table>
            </div>

            <div className={cx("info")}>
              <div className={cx("heading")}>
                <h4>Thông tin cccd</h4>
              </div>
              <div className={cx("content")}>
                <img src={gv.hinh} />
                <img src={gv.cmndMacSau} />
                <img src={gv.cmndMacTruoc} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
