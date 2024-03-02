import * as request from "~/utils/request";

export const layDanhSachHv = async () => {
  try {
    const res = await request.get(`/HocVien/lay-danh-sach-hoc-vien`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// lay thong tin hoc vien

export const layThongTinHv = async (maHv) => {
  try {
    const res = await request.get(
      `/HocVien/lay-thong-tin-hoc-vien-theo-mahv?maHv=${maHv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinTaiKhoanHv = async (mahv) => {
  try {
    const res = await request.get(
      `/HocVien/lay-thong-tin-tai-khoan-hoc-vien?mahv=${mahv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// tao tai khoan hoc vien
export const RegisterUserEmail = async (data) => {
  try {
    const res = await request.post(
      `/NguoiDung/tao-tai-khoan-hoc-vien-email`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// tao tai khoan hoc vien
export const RegisterUserGG = async (email, tenHV) => {
  try {
    const res = await request.post(
      `/NguoiDung/tao-tai-khoan-hoc-vien-bang-gg?email=${email}&tenHV=${tenHV}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Dang nhap

export const DangNhapBangGG = async (email) => {
  try {
    const res = await request.get(
      `/NguoiDung/dang-nhap-tai-khoan-hoc-vien-bang-gg?email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const capNhatThongTin = async (data) => {
  try {
    const res = await request.put(
      `/HocVien/cap-nhat-lai-thong-tin-hoc-vien`,data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

