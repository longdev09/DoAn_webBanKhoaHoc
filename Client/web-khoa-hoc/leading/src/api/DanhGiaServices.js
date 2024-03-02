import * as request from "~/utils/request";

export const danhGiaKhoaHoc = async (maHV, maKH, noiDung, soSao) => {
  try {
    const res = await request.post(
      `/DanhGia/them-danh-gia?maHV=${maHV}&maKH=${maKH}&noiDung=${noiDung}&soSao=${soSao}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDanhSachDanhGiaTheoMaKhoaHoc = async (maKhoaHoc) => {
  try {
    const res = await request.get(
      `/DanhGia/lay-danh-sach-danh-gia-theo-khoa-hoc?maKhoaHoc=${maKhoaHoc}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const layDanhSachDanhGia = async () => {
  try {
    const res = await request.get(
      `/DanhGia/lay-danh-sach-danh-gia`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const xoaDanhGia = async (maDg) => {
  try {
    const res = await request.Delete(
      `/DanhGia/xoa-danh-gia?maDg=${maDg}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
