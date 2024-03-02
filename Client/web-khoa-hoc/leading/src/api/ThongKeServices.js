import * as request from "~/utils/request";

export const adminthongKeTheoNgay = async (day) => {
  try {
    const res = await request.get(
      `/ThongKe/thong-ke-doanh-thu-theo-ngay?day=${day}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const adminthongKeTheoThang = async (day) => {
  try {
    const res = await request.get(
      `/ThongKe/thong-ke-doanh-thu-theo-thang?day=${day}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const adminthongKeTheoNam = async (day) => {
  try {
    const res = await request.get(
      `/ThongKe/thong-ke-doanh-thu-theo-nam?day=${day}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const thongKeKhoaHocMuaNhieuNhat = async () => {
  try {
    const res = await request.get(
      `/ThongKe/top10-khoa-hoc-duoc-mua-nhieu-nhat`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const tongSoHvGv = async () => {
  try {
    const res = await request.get(
      `/ThongKe/dem-tong-so-hoc-vien-va-giang-vien`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const thongKeXuatExcel = async (day) => {
  try {
    const res = await request.get(
      `/ThongKe/lay-thong-tin-hoa-don-trong-nam?day=${day}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};



