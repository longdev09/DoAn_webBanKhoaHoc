import input from "~/components/Input";
import classNames from "classnames/bind";
import style from "./Modal_ThemChuong.module.scss";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import * as KhoaHocServiecs from "~/api/KhoaHocServices";
import { useState } from "react";
import useCustomToast from "~/hook/useCustomToast";
const cx = classNames.bind(style);

export default function ModalThemChuong({ close }) {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const ulr = useParams();
  const [chuong, setChuong] = useState({
    TenCh: "",
  });

  const handleExit = () => {
    close();
    setChuong({
      TenCh: "",
    });
  };
  const handleChang = (index, value) => {
    setChuong((prve) => ({
      ...prve,
      [index]: value,
    }));
  };
  const handleSummit = async () => {
    const res = await KhoaHocServiecs.themChuong(ulr.maKh, chuong);

    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    setChuong({
      TenCh: "",
    });
    close();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-chapter")}>
        <Input
          label={"Tên chương"}
          value={chuong.TenCh}
          onChange={(value) => handleChang("TenCh", value)}
        />
      </div>
      <div className={cx("btn-add")}>
        <Button onClick={handleExit}>Hủy</Button>
        <Button onClick={handleSummit}>Thêm</Button>
      </div>
    </div>
  );
}
