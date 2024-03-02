import * as request from "~/utils/request";

export const layThongTinHocVien = async (maHv) => {
  try {
    const res = await request.post(
      `/HocVien/lay-thong-tin-hoc-vien-theo-mahv?maHv=${maHv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const taoThanhToan = async (tongtien, maHv) => {
  try {
    const res = await request.post(
      `/ThanhToan/tao-thanh-toan?tongtien=${tongtien}&maHv=${maHv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsHoaDonMuaKhoaHoc = async (maHv) => {
  try {
    const res = await request.get(
      `/HoaDon/lay-danh-sach-hoa-don-mua-khoa-hoc?maHv=${maHv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsChiTietHoaDonMuaKhoaHoc = async (maHd) => {
  try {
    const res = await request.get(
      `/HoaDon/lay-danh-sach-chi-tiet-hoa-don-mua-khoa-hoc?maHd=${maHd}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
