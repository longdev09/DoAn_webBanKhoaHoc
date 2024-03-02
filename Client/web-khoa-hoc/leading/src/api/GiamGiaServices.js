import * as request from "~/utils/request";

export const layDsGiamGia = async (maGv) => {
  try {
    const res = await request.get(
      `/GiamGia/lay-danh-sach-giam-gia?maGv=${maGv}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const taoKhoaHocGiamGia = async (tongTienGiam, data) => {
  try {
    const res = await request.put(
      `/GiamGia/tao-khoa-hoc-giam-gia?tongTienGiam=${tongTienGiam}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const taoGiamGia = async (maGv, phanTramGiam) => {
  try {
    const res = await request.post(
      `/GiamGia/tao-giam-gia?maGv=${maGv}&phanTramGiam=${phanTramGiam}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
