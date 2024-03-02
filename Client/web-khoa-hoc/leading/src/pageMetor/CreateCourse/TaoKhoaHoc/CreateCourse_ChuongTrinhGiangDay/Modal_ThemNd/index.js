import input from "~/components/Input";
import classNames from "classnames/bind";
import style from "./Modal_ThemNd.module.scss";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { useParams } from "react-router-dom";
import * as KhoaHocServiecs from "~/api/KhoaHocServices";
import { useState } from "react";
import useCustomToast from "~/hook/useCustomToast";
const cx = classNames.bind(style);

export default function ModalThemNoiDung({ close, maCh }) {
  const [noiDung, setNoiDung] = useState({
    TenNd: "",
  });

  const { showErrorToast, showSuccessToast } = useCustomToast();
  const handleExit = () => {
    close();
    setNoiDung({
      TenNd: "",
    });
  };
  const handleChang = (index, value) => {
    setNoiDung((prve) => ({
      ...prve,
      [index]: value,
    }));
  };
  const handleSummit = async () => {
    const res = await KhoaHocServiecs.themNdChuong(maCh, noiDung);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    setNoiDung({
      TenNd: "",
    });
    close();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-chapter")}>
        <Input
          label={"Tên nội dung"}
          value={noiDung.TenNd}
          onChange={(value) => handleChang("TenNd", value)}
        />
      </div>
      <div className={cx("btn-add")}>
        <Button onClick={handleExit}>Hủy</Button>
        <Button onClick={handleSummit}>Thêm</Button>
      </div>
    </div>
  );
}
