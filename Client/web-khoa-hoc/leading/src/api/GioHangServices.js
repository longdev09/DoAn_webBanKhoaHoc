import * as request from "~/utils/request";

export const layChiTietGioHangTheoMaHocVien = async (maHV) => {
  try {
    const res = await request.get(
      `/GioHang/lay-chi-tiet-gio-hang-theo-ma-hoc-vien?maHV=${maHV}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const themGioHang = async (maHV, maKH) => {
  try {
    const res = await request.post(
      `/GioHang/them-gio-hang?maHV=${maHV}&maKH=${maKH}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const xoaGioHang = async (maKh) => {
  try {
    const res = await request.Delete(`/GioHang/xoa-ct-gio-hang?maKh=${maKh}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
