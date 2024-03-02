using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.ClassSupport
{
    public class TimKiem
    {

        public readonly DB_QLKHOAHOCContext db = new DB_QLKHOAHOCContext();
        public TimKiem(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }
        public TimKiem()
        {
        }
           
        public List<KhoaHoc> timKiem(List<KhoaHoc> kh, string tuKhoa)
        {

            List<KhoaHoc> ketQua = new List<KhoaHoc>();

            foreach (var khoaHoc in kh)
            {
                var gv = db.GiangViens.Where(t => t.MaGv == khoaHoc.MaGv).FirstOrDefault();
                var danhMuc = db.DanhMucKhs.Where(t => t.MaDm == khoaHoc.MaDm).FirstOrDefault();
                if (gv != null && gv.TenGv.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
                if (khoaHoc.TieuDe.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.Mota.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.KetQuaDatDuoc.ToLower().Contains(tuKhoa.ToLower())
                    && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
                if (danhMuc != null && danhMuc.TenDm.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
            }
            return ketQua;
        }
    }
}
