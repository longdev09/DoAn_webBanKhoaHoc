import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./AdminDetailCourse.module.scss";
import { useState } from "react";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import useLoading from "~/hook/useLoading";
import LoadingItem from "~/components/LoadingItem";
import * as KhoaHocServices from "~/api/KhoaHocServices";
import numeral from "numeral";
import StarRating from "~/components/StarRating";
import AdminLearning from "./AdminLearning";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routesConfig";

const cx = classNames.bind(style);

export default function AdminDetailCourse() {
  const navigate = useNavigate();
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

  const loading = useLoading(fetchApi);

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const items = doc.querySelectorAll("li");
    // Lấy nội dung văn bản từ mỗi thẻ <li>
    const textArray = Array.from(items).map((item) => item.textContent);
    return textArray;
  };

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);

  const handle1 = () => {
    setShow1(true);
    setShow2(false);
  };
  const handle2 = () => {
    setShow1(false);
    setShow2(true);
  };

  const handleDuyet = async () => {
    await KhoaHocServices.capNhatTrangThai(ulr.makhoahoc, "Đang bán");
    navigate(routes.adminManageCourse);
  };

  const handleTuChoi = async () => {
    await KhoaHocServices.capNhatTrangThai(ulr.makhoahoc, "Từ chối");
    navigate(routes.adminManageCourse);
  };
  return (
    <>
      <div className={cx("header")}>
        <div className={cx("img")}>
          <img src="https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333" />
        </div>
        <div className={cx("menu")}>
          <div onClick={handle1} className={cx("menu-item", { active: show1 })}>
            <span>1</span>
            <span>Giới thiệu khóa học</span>
          </div>
          <div onClick={handle2} className={cx("menu-item", { active: show2 })}>
            <span>2</span>
            <span>Chương trình giảng dạy</span>
          </div>
        </div>
        <div className={cx("btn")}>
          <Button onClick={handleDuyet}>Phê duyệt </Button>
          <Button onClick={handleTuChoi}>Từ chối</Button>
        </div>
      </div>

      {loading ? (
        <LoadingItem />
      ) : kh ? (
        <div
          className={cx("wrapper")}
          style={{ display: show1 ? "block" : "none" }}
        >
          {/* mo ta khoa hoc  */}
          <div className={cx("heading")}>
            <div className={cx("content")}>
              <div className={cx("text")}>
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

                {/* <div className={cx("evaluate-course")}>
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
                    <h2>4,7 xếp hạng khóa học</h2>
                  </div>

                  <div className={cx("list-user")}>
                    <div className={cx("item-user")}>
                      <div className={cx("info-user")}>
                        <div className={cx("avata")}>
                          <img src="https://img-c.udemycdn.com/user/50x50/212560756_4232.jpg" />
                        </div>
                        <div className={cx("content")}>
                          <span className={cx("name-user")}>
                            Đặng Thị Minh Châu
                          </span>
                          <div className={cx("start-item")}>
                            <span className={cx("star")}>
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>12/02/2023</span>
                          </div>
                        </div>
                      </div>

                      <div className={cx("cmt")}>
                        <p>
                          Khóa học chỉnh chu, anh eric chu đáo cẩn thận, cần xem
                          chậm lại để nắm được những kiến thức anh chỉ.
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                    {/* <div className={cx("price-sale")}>
                      {kh.giaDaGiam ? (
                        <>
                          <span>Giảm 86%</span>
                          <span>
                            <FontAwesomeIcon icon={faClock} /> 6 ngày còn lại
                            với mức giá này!
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div> */}
                    {/* <div className={cx("btn")}>
                      <Button w100>Thêm vào giỏ</Button>
                      <Button w100>Mua ngay</Button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* leading */}
      <div style={{ display: show2 ? "block" : "none" }}>
        <AdminLearning />
      </div>
    </>
  );
}
