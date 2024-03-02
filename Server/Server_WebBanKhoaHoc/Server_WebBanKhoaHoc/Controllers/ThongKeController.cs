using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;

        public ThongKeController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("thong-ke-doanh-thu-theo-ngay")]
        public IActionResult thongKeDoanhThuTheoNgay(DateTime day)
        {
            var doanhThuNgay = db.Hoadons.Where(t => t.NgayThanhToan.Value.Day == day.Day).Sum(r => r.TongTien);
            return Ok(doanhThuNgay);
        }

        [HttpGet]
        [Route("thong-ke-doanh-thu-theo-thang")]
        public IActionResult thongKeDoanhThuTheoThang(DateTime day)
        {
            var doanhThuThang = db.Hoadons.Where(t => t.NgayThanhToan.Value.Year == day.Year && t.NgayThanhToan.Value.Month == day.Month).Sum(r => r.TongTien);
            return Ok(doanhThuThang);
        }

        [HttpGet]
        [Route("thong-ke-doanh-thu-theo-nam")]
        public IActionResult thongKeDoanhThuTheoNam(DateTime day)
        {
            var doanhThuNam = db.Hoadons.Where(t => t.NgayThanhToan.Value.Year == day.Year).Sum(r => r.TongTien);
            return Ok(doanhThuNam);
        }


        [HttpGet]
        [Route("top10-khoa-hoc-duoc-mua-nhieu-nhat")]
        public IActionResult Top10KHMuaNhieuNhat()
        {
            var top10 = db.KhoaHocs
           .Join(db.Cthds, kh => kh.MaKh, cthd => cthd.MaKh, (kh, cthd) => new { KhoaHoc = kh, CTHD = cthd })
           .GroupBy(joined => new { joined.KhoaHoc.MaKh, joined.KhoaHoc.TieuDe })
           .Select(grouped => new {
               MaKH = grouped.Key.MaKh,
               TieuDe = grouped.Key.TieuDe,
               SoLuongMua = grouped.Count()
           })
           .OrderByDescending(x => x.SoLuongMua)
           .Take(10)
           .ToList();
            List<object> khs = new List<object>();
            foreach (var khoah in top10)
            {
                var khoc = db.KhoaHocs.Where(t => t.MaKh == khoah.MaKH)
                    .Select(r => new {
                        maKh = r.MaKh,
                        tenKh = r.TieuDe,
                        tenGV = r.MaGvNavigation.TenGv,
                        soLuongBan = khoah.SoLuongMua
                    }).FirstOrDefault();
                khs.Add(khoc);
            }
            return Ok(khs);
        }

        [HttpGet]
        [Route("dem-tong-so-hoc-vien-va-giang-vien")]
        public IActionResult ThongKeHocVienVaGiangVien()
        {
            // Đếm tổng số học viên
            int tongSoHocVien = db.HocViens.Count();

            // Đếm tổng số giảng viên
            int tongSoGiangVien = db.GiangViens.Count();

            // Trả về dữ liệu dưới dạng JSON
            return Ok(new
            {
                TongSoHocVien = tongSoHocVien,
                TongSoGiangVien = tongSoGiangVien
            });
        }

        [HttpGet]
        [Route("lay-thong-tin-hoa-don-trong-nam")]
        public IActionResult thongKeHoaDon(DateTime day)
        {
            var hoaDons = db.Hoadons
                .Where(t => t.NgayThanhToan.Value.Year == day.Year)
                .Select(r => new
                {
                    maHD = r.MaHd,
                    taiKhoan = r.MaHvNavigation.MaNdNavigation.TenDn,
                    pttt = r.MaPtNavigation.TenPt,
                    tongTien = r.TongTien,
                    ngayTT = r.NgayThanhToan,
                }).ToList();
            List<object> dsHoaDon = new List<object>();
            List<object> cthds = new List<object>();
            foreach (var hoaDon in hoaDons)
            {
                var hd = new
                {
                    hoaDon.maHD,
                    hoaDon.taiKhoan,
                    hoaDon.pttt,
                    hoaDon.tongTien,
                    hoaDon.ngayTT,
                    cthds = db.Cthds
                        .Where(ct => ct.MaHd == hoaDon.maHD)
                        .Select(e => new
                        {
                            tenKhoaHoc = e.MaKhNavigation.TieuDe,
                            donGia = e.DonGia
                        }).ToList()
                };
                dsHoaDon.Add(hd);
            }

            return Ok(dsHoaDon);
        }



    }
}
