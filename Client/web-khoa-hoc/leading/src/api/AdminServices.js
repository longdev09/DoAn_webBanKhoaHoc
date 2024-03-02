import * as request from "~/utils/request";

export const dangNhapAdmin = async (tenDn, matKhau) => {
  try {
    const res = await request.get(
      `/NguoiDung/dang-nhap-admin?tenDn=${tenDn}&matKhau=${matKhau}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
