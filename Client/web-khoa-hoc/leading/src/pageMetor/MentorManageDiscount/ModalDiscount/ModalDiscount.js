import Input from "~/components/Input";
import * as GiamGiaServices from "~/api/GiamGiaServices";
import classNames from "classnames/bind";
import style from "./ModalDiscount.module.scss";
import Button from "~/components/Button";
import { useState } from "react";

const cx = classNames.bind(style);

export default function ModalDiscount({ close }) {
  const maGv = localStorage.getItem("maGv");
  const [data, setData] = useState();

  const handleChang = (value) => {
    setData(value);
  };

  const handleSumbit = async () => {
    await GiamGiaServices.taoGiamGia(maGv, data);
    close();
  };
  return (
    <div className={cx("wrapper")}>
      <Input
        pla={"Phần trăm giảm giá"}
        onChange={(value) => handleChang(value)}
      />
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Button onClick={handleSumbit}>thêm</Button>
      </div>
    </div>
  );
}
