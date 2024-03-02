import * as request from "~/utils/request";

export const layThongTinGiangVien = async () => {
  try {
    const res = await request.get(`/GiangVien/lay-danh-sach-giang-vien`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinGiangVienTheoMa = async (maGv) => {
  try {
    const res = await request.get(
      `/GiangVien/lay-thong-tin-giang-vien-theo-maGv?maGv=${maGv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinGVTheoMa = async (maGv) => {
  try {
    const res = await request.get(
      `/GiangVien/lay-thong-tin-gv-theo-maGv?maGv=${maGv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const suaTrangThaiTaiKhoanGiangVien = async (maNd, trangThai) => {
  try {
    const res = await request.put(
      `/NguoiDung/sua-trang-thai-tai-khoan-giang-vien?maNd=${maNd}&trangThai=${trangThai}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const taoTaiKhoanNguoiDungGiangVien = async (email) => {
  try {
    const res = await request.post(
      `/NguoiDung/tao-tai-khoan-nguoi-dung-giang-vien?email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const dangNhapGiangVien = async (email, matKhau) => {
  try {
    const res = await request.get(
      `/NguoiDung/dang-nhap-giang-vien?email=${email}&matKhau=${matKhau}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const taoGiangVien = async (
  MaGv,
  MaNd,
  Hinh,
  anhCmndMacTruoc,
  anhCmndMacSau,
  data
) => {
  try {
    const res = await request.post(
      `/GiangVien/tao-giang-vien?MaGv=${MaGv}&MaNd=${MaNd}&Hinh=${Hinh}&anhCmndMacTruoc=${anhCmndMacTruoc}&anhCmndMacSau=${anhCmndMacSau}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const capNhatThongTinGiangVien = async (data) => {
  try {
    const res = await request.put(
      `/GiangVien/cap-nhat-thong-tin-giang-vien`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const doiMatKhauGiangVien = async (maGv, matKhauCu, matKhauMoi) => {
  try {
    const res = await request.put(
      `/NguoiDung/doi-mat-khau-giang-vien?maGv=${maGv}&matKhauCu=${matKhauCu}&matKhauMoi=${matKhauMoi}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
