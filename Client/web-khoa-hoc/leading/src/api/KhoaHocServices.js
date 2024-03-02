import * as request from "~/utils/request";

export const layDsKhoaHoc = async () => {
  try {
    const res = await request.get(`/KhoaHoc/lay-danh-sach-khoa-hoc`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsKhoaHocAdmin = async () => {
  try {
    const res = await request.get(`/KhoaHoc/lay-ds-khoa-hoc-admin`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsKhoaHocDaMua = async (maHv) => {
  try {
    const res = await request.get(
      `/KhoaHoc/lay-danh-sach-khoa-hoc-da-mua?maHv=${maHv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinKhoaHocTheoMa = async (maKhoaHoc) => {
  try {
    const res = await request.get(
      `/KhoaHoc/lay-thong-tin-khoa-hoc-theo-ma?maKhoaHoc=${maKhoaHoc}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinKhoaHocTheoMaGv = async (maGv) => {
  try {
    const res = await request.get(
      `/KhoaHoc/lay-danh-sach-khoa-hoc-theo-ma-gv?maGv=${maGv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const TimThongTinKhoaHoc = async (tuKhoa) => {
  try {
    const res = await request.get(
      `/KhoaHoc/tim-kiem-khoa-hoc?tuKhoa=${tuKhoa}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const themKhoaHoc = async (data, urlImg) => {
  try {
    const res = await request.post(
      `/KhoaHoc/them-khoa-hoc?urlImg=${urlImg}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const capNhatGiaKhoaHoc = async (maKh, gia) => {
  try {
    const res = await request.put(
      `/KhoaHoc/cap-nhat-gia-khoa-hoc?maKh=${maKh}&gia=${gia}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const themChuong = async (maKh, data) => {
  try {
    const res = await request.post(
      `/ChuongKh/them-chuong-khoa-hoc?maKh=${maKh}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsChuong = async (maKh) => {
  try {
    const res = await request.get(
      `/ChuongKh/lay-danh-sach-chuong-kh?maKh=${maKh}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const themNdChuong = async (MaCH, data) => {
  try {
    const res = await request.post(
      `/NoiDungKh/tao-noi-dung-chuong?MaCH=${MaCH}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ThemVideoNoiDung = async (maNd, video) => {
  try {
    const res = await request.put(
      `/NoiDungKh/them-video-noi-dung?maNd=${maNd}&video=${video}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const layDsNdChuong = async (maCh) => {
  try {
    const res = await request.get(
      `/NoiDungKh/lay-danh-sach-noi-dung-chuong?MaCH=${maCh}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const capNhatTrangThai = async (maKh, trangThaiDuyet) => {
  try {
    const res = await request.put(
      `/KhoaHoc/duyet-khoa-hoc?maKh=${maKh}&trangThaiDuyet=${trangThaiDuyet}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
