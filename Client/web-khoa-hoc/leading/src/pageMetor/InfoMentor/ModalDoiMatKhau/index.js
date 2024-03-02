import * as GiangVienServices from "~/api/GiangVienServices";
import useCustomToast from "~/hook/useCustomToast";

import classNames from "classnames/bind";
import style from "./ModalDoiMatKhau.module.scss";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { useState } from "react";

const cx = classNames.bind(style);

export default function ModalDoiMatKhau({ close }) {
  const maGv = localStorage.getItem("maGv");
  const [data, setData] = useState({ matKhauCu: "", matKhauMoi: "" });
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const handleChang = (index, value) => {
    setData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  const handleSumbit = async () => {
    const res = await GiangVienServices.doiMatKhauGiangVien(
      maGv,
      data.matKhauCu,
      data.matKhauMoi
    );
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    setData((prev) => ({
      ...prev,
      matKhauCu: "",
      matKhauMoi: "",
    }));
    close();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("group-input")}>
        <div>
          <Input
            label={"Nhập mật khẩu cũ"}
            onChange={(value) => handleChang("matKhauCu", value)}
          />
          <Input
            label={"Nhập mật khẩu mới"}
            onChange={(value) => handleChang("matKhauMoi", value)}
          />
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleSumbit}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
}
