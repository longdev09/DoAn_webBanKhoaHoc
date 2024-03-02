import * as request from "~/utils/request";

export const layDsDanhMuc = async () => {
  try {
    const res = await request.get(`/DanhMuc/lay-danh-sach-danh-muc`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const themDanhMuc = async (tenDanhMuc) => {
  try {
    const res = await request.post(
      `/DanhMuc/them-danh-muc?tenDanhMuc=${tenDanhMuc}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const suaDanhMuc = async (maDm, tenDm) => {
  try {
    const res = await request.put(
      `/DanhMuc/sua-danh-muc?maDm=${maDm}&tenDm=${tenDm}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
