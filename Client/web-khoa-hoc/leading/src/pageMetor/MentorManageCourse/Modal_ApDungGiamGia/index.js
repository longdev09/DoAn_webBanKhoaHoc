import classNames from "classnames/bind";
import style from "./Modal_ApDungGiamGia.module.scss";
import Input from "~/components/Input";
import Dropdown from "react-dropdown";
import { useEffect, useState } from "react";
import * as GiamGiaServices from "~/api/GiamGiaServices";
import numeral from "numeral";
import Button from "~/components/Button";
import useCustomToast from "~/hook/useCustomToast";
const cx = classNames.bind(style);

export default function Modal_ApDungGiamGia({ kh }) {
  const maGv = localStorage.getItem("maGv");
  const [dataGiamGia, setDataGiamGia] = useState({
    MaGG: "",
    MaKh: "",
    NgayBatDau: "",
    NgayKetThuc: "",
  });
  const [dsMaGiamGia, setDsmaGiamGia] = useState();
  const [tienKhuyenMai, setTienKhuyenMai] = useState();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const fetchApiMaGg = async () => {
    const res = await GiamGiaServices.layDsGiamGia(maGv);
    setDsmaGiamGia(res);
  };
  useEffect(() => {
    fetchApiMaGg();
  }, []);

  const handleChang = (value, label) => {
    setTienKhuyenMai((kh.donGia * label) / 100);
    setDataGiamGia((prev) => ({
      ...prev,
      MaGG: value,
    }));
  };

  const handleChangeDate = (index, value) => {
    setDataGiamGia((prev) => ({
      ...prev,
      [index]: value,
    }));
    setDataGiamGia((prev) => ({
      ...prev,
      MaKh: kh.maKh,
    }));
  };

  const handleSumbit = async () => {
    const res = await GiamGiaServices.taoKhoaHocGiamGia(
      kh.donGia - tienKhuyenMai,
      dataGiamGia
    );
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {kh ? (
        <>
          <div className={cx("heading")}>
            <span>{kh.tenKh}</span>
          </div>
          <div className={cx("content")}>
            <div className={cx("group")}>
              <div className={cx("input-day")}>
                <Input
                  onChange={(value) => handleChangeDate("NgayBatDau", value)}
                  type={"date"}
                  label={"Ngày bắt đầu"}
                  placeholder={"Chọn ngày kết thúc"}
                />
              </div>
              <div className={cx("input-day")}>
                <Input
                  onChange={(value) => handleChangeDate("NgayKetThuc", value)}
                  type={"date"}
                  label={"Ngày kết thúc"}
                />
              </div>
            </div>
            <div className={cx("price-origin")}>
              <span>Giá gốc</span>
              <span>{numeral(kh.donGia).format("0,0")} vnd</span>
            </div>
            <div className={cx("price-sale")}>
              <span>Giảm giá được áp dụng</span>
              <span>{numeral(Math.floor(tienKhuyenMai)).format("0,0")}</span>
            </div>
            <div className={cx("price-sum")}>
              <span>Tổng tiền</span>
              <span>
                {numeral(tienKhuyenMai ? kh.donGia - tienKhuyenMai : "").format(
                  "0,0"
                )}
              </span>
            </div>
            <div className={cx("drop")}>
              <Dropdown
                className={cx("custom-drop")}
                options={
                  dsMaGiamGia &&
                  dsMaGiamGia.map((item) => ({
                    value: item.maGg, // Assuming MaDm is the property you want to use as the value
                    label: item.phanTramGiam, // Assuming TenDm is the property you want to display as the label
                  }))
                }
                onChange={(selectedOption) =>
                  handleChang(selectedOption.value, selectedOption.label)
                }
                placeholder="Select an option"
              />
            </div>
          </div>
          <div className={cx("btn")}>
            <Button onClick={handleSumbit}>Cập nhật</Button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
