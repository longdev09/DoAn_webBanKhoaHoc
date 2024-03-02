import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheck,
  faChevronDown,
  faDisplay,
  faCirclePlay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./Detail.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import numeral from "numeral";
import StarRating from "~/components/StarRating";
import * as DanhGiaServices from "~/api/DanhGiaServices";
import routesConfig from "~/config/routesConfig";
import * as GioHangServices from "~/api/GioHangServices";
import useCustomToast from "~/hook/useCustomToast";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

export default function DetailCourse() {
  const maKh = useParams();
  let navigate = useNavigate();
  const maHV = localStorage.getItem("maHV");
  const [dsDanhGia, setDsDanhGia] = useState();
  const ulr = useParams();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [kh, setKh] = useState();
  const [extractedTextArray, setExtractedTextArray] = useState([]);
  const handleOpen = () => {
    setIsContentVisible(!isContentVisible);
  };

  const fetchApi = async () => {
    const res = await KhoaHocServices.layThongTinKhoaHocTheoMa(ulr.makhoahoc);
    setKh(res);
    setExtractedTextArray(extractTextFromHTML(res.kqdd));
  };

  const fetchApiDanhGia = async () => {
    const res = await DanhGiaServices.layDanhSachDanhGiaTheoMaKhoaHoc(
      ulr.makhoahoc
    );
    setDsDanhGia(res);
  };
  useEffect(() => {
    fetchApiDanhGia();
  }, []);

  const loading = useLoading(fetchApi);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const items = doc.querySelectorAll("li");
    // Lấy nội dung văn bản từ mỗi thẻ <li>
    const textArray = Array.from(items).map((item) => item.textContent);
    return textArray;
  };

  const handleAddCart = async () => {
    if (maHV == null) {
      navigate(routesConfig.loginUser);
    } else {
      const res = await GioHangServices.themGioHang(maHV, maKh.makhoahoc);
      if (res.status == "Succes") {
        showSuccessToast(res.message);
      } else {
        showErrorToast(res.message);
      }
    }
  };
  return (
    <>
      {loading ? (
        <LoadingItem />
      ) : kh ? (
        <div className={cx("wrapper")}>
          <ToastContainer />
          {/* mo ta khoa hoc  */}
          <div className={cx("heading")}>
            <div className={cx("content")}>
              <div className={cx("text")}>
                {/* <div className={cx("arrow")}>
                  <span>Trang chủ</span> <span> => </span>{" "}
                  <span>Chi tiết sản phẩm</span>
                </div> */}
                <h1 className={cx("name-course")}>{kh.tenKh}</h1>

                <div className={cx("describe")}>
                  {/* <span>
                    All in one - Quản Lý State của ứng dụng React một cách hiệu
                    quả
                  </span> */}
                </div>

                <div className={cx("evaluate")}>
                  <span>Đánh giá</span>
                  <span className={cx("course-point")}>{kh.tongSao}</span>
                  <span className={cx("star")}>
                    <StarRating rating={kh.tongSao} />
                  </span>
                  {/* <span className={cx("course-reviews")}>(439)</span> */}
                </div>

                <div className={cx("menter-name")}>
                  <span>Được tạo bởi</span> <span>{kh.tenGV}</span>
                </div>
              </div>
            </div>
          </div>

          {/*them khoa hoc vao gio */}
          <div className={cx("course")}>
            <div style={{ display: "flex" }}>
              <div className={cx("wrapper")}>
                <div className={cx("result-course")}>
                  <h2>Kết quả bạn sẽ đạt được</h2>

                  <ul className={cx("list-result")}>
                    {extractedTextArray.map((item) => (
                      <li className={cx("item")}>
                        <span>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cx("w-course")}>
                  <h2>Nội dung khóa học</h2>
                  <div className={cx("duration")}>
                    <span>{kh.dsChuong.length} chương</span>
                    {/* <span>• 340 bài giảng</span> */}
                    {/* <span> • 22 giờ 39 phút tổng thời lượng</span> */}
                  </div>

                  {/* danh sach noi dung cac khoa hoc  */}
                  <div className={cx("list-course")}>
                    {kh.dsChuong.map((itemC) => (
                      <div className={cx("item-course")} onClick={handleOpen}>
                        <div className={cx("chapter")}>
                          <div className={cx("arrow")}>
                            <FontAwesomeIcon icon={faChevronDown} />
                          </div>
                          <div className={cx("title-chapter")}>
                            {itemC.tenChuong}
                          </div>
                          <div className={cx("count-content")}>
                            {itemC.noiDungChuongs.length} bài giảng
                          </div>
                        </div>
                        <div
                          className={cx("content-course")}
                          style={{
                            display: isContentVisible ? "block" : "none",
                          }}
                        >
                          {/* noi dung */}
                          <ul className={cx("list")}>
                            {itemC.noiDungChuongs.map((item) => (
                              <li className={cx("item")}>
                                <div className={cx("icon")}>
                                  <FontAwesomeIcon icon={faDisplay} />
                                </div>
                                <div className={cx("text")}>
                                  {item.tenNoiDung}
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

                <div className={cx("describe-course")}>
                  <h2>Mô tả</h2>
                  <div
                    className={cx("text")}
                    dangerouslySetInnerHTML={{ __html: kh.moTa }}
                  ></div>
                </div>

                <div className={cx("mentor")}>
                  <h2>Giảng viên</h2>
                  <div className={cx("info")}>
                    <div className={cx("name")}>
                      <h4>{kh.tenGV}</h4>
                    </div>
                    <div className={cx("instrutor")}>
                      <div className={cx("avata")}>
                        <img src={kh.hinhGV} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("evaluate-course")}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h2 style={{ marginRight: "20px", color: "yellow" }}>
                      <FontAwesomeIcon icon={faStar} />
                    </h2>
                    <h2>{kh.tongSao} xếp hạng khóa học</h2>
                  </div>

                  <div className={cx("list-user")}>
                    {dsDanhGia &&
                      dsDanhGia.map((item) => (
                        <div className={cx("item-user")}>
                          <div className={cx("info-user")}>
                            <div className={cx("avata")}>
                              {item.Hinh ? (
                                <img src={item.Hinh} />
                              ) : (
                                <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
                              )}
                            </div>
                            <div className={cx("content")}>
                              <span className={cx("name-user")}>
                                {item.tenHv}
                              </span>
                              <div className={cx("start-item")}>
                                <span className={cx("star")}>
                                  <StarRating rating={item.soSao} />
                                </span>
                                <span>{item.ngayDgFormatted}</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className={cx("cmt")}
                            dangerouslySetInnerHTML={{ __html: item.noiDung }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className={cx("add-to-cart")}>
                <div className={cx("wrapper-add-cart")}>
                  <div className={cx("pic-course")}>
                    <img src={kh.hinh} />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div className={cx("price")}>
                      {kh.giaDaGiam ? (
                        <>
                          <span>{numeral(kh.giaDaGiam).format("0,0")} đ</span>
                          <span>{numeral(kh.donGia).format("0,0")} đ</span>
                        </>
                      ) : (
                        <>
                          <span>{numeral(kh.donGia).format("0,0")} đ</span>
                          <span></span>
                        </>
                      )}
                    </div>
                    <div className={cx("price-sale")}>
                      {kh.giaDaGiam ? (
                        <>
                          <span>Giảm 86%</span>
                          {/* <span>
                            <FontAwesomeIcon icon={faClock} /> 6 ngày còn lại
                            với mức giá này!
                          </span> */}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={cx("btn")}>
                      <Button w100 onClick={handleAddCart}>
                        Thêm vào giỏ
                      </Button>
                      {/* <Button w100>Mua ngay</Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
