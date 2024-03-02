import Input from "~/components/Input";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import * as DanhMucServices from "~/api/DanhMucServices";
import useCustomToast from "~/hook/useCustomToast";
import { useEffect } from "react";
import { useState } from "react";

export default function ModalEditCategory({ close, dm }) {
  const [data, setData] = useState({
    maDm: dm.maDm,
    tenDm: dm.tenDm,
  });
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const handleChang = (value) => {
    setData((prev) => ({
      ...prev,
      tenDm: value,
    }));
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      maDm: dm.maDm,
      tenDm: dm.tenDm,
    }));
  }, [dm]);


  const handleSumbit = async () => {
    const res = await DanhMucServices.suaDanhMuc(data.maDm, data.tenDm);
    if (res.status == "Succes") {
      showSuccessToast(res.message);
    } else {
      showErrorToast(res.message);
    }
    close();
  };
  return (
    <div>
      <Input
        value={data.tenDm}
        pla={"Tên danh mục"}
        onChange={(value) => handleChang(value)}
      />
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Button onClick={handleSumbit}>Sửa</Button>
      </div>
    </div>
  );
}
