import Input from "~/components/Input";
import classNames from "classnames/bind";
import style from "./ModalCategory.module.scss";
import Button from "~/components/Button";
import * as DanhMucServices from "~/api/DanhMucServices";
import useCustomToast from "~/hook/useCustomToast";
import { useState } from "react";

const cx = classNames.bind(style);

export default function ModalCategory({ close }) {
  const [data, setData] = useState();
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const handleChang = (value) => {
    setData(value);
  };

  const handleSumbit = async () => {
    const res = await DanhMucServices.themDanhMuc(data);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    close();
  };
  return (
    <div className={cx("wrapper")}>
      <Input pla={"Tên danh mục"} onChange={(value) => handleChang(value)} />
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Button onClick={handleSumbit}>thêm</Button>
      </div>
    </div>
  );
}
