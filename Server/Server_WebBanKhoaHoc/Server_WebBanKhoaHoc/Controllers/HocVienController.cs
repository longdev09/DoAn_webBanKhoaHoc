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
    public class HocVienController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public HocVienController (DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        [HttpGet]
        [Route("lay-danh-sach-hoc-vien")]
        public IActionResult layDanhSachGiangVien()
        {
            var dsHocVien = db.HocViens.Where(t => true).ToList();
            if (dsHocVien == null)
            {
                return Ok(new { status = "Error ss" });
            }
            return Ok(dsHocVien);
        }


        [HttpGet]
        [Route("lay-thong-tin-hoc-vien-theo-mahv")]
        public IActionResult layThongTinHocVien(string maHv)
        {
            var dsHocVien = db.HocViens.Where(t => t.MaHv == maHv).FirstOrDefault();
            if (dsHocVien == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dsHocVien);
        }


        [HttpGet]
        [Route("lay-thong-tin-tai-khoan-hoc-vien")]
        public IActionResult layThongTinTaiKhoanHocVien(string maHv)
        {
            var manD = db.HocViens.Where(t => t.MaHv == maHv).Select(t => t.MaNd).FirstOrDefault();
            var taiKhoanHocVien = db.NguoiDungs.Where(t => t.MaNd == manD).FirstOrDefault();
            if (taiKhoanHocVien == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(taiKhoanHocVien);
        }

        [HttpPut]
        [Route("cap-nhat-lai-thong-tin-hoc-vien")]
        public IActionResult capNhatThongTinHocVien(HocVien hv)
        {
            var hvs = db.HocViens.Where(t => t.MaHv == hv.MaHv).FirstOrDefault();
            hvs.TenHv = hv.TenHv;
            hvs.NgaySinh = hv.NgaySinh;
            hvs.Email = hv.Email;
            hvs.Sdt = hv.Sdt;
            hvs.DiaChi = hv.DiaChi;
            //hvs.Hinh = hv.Hinh;
            db.SaveChanges();
            return Ok(new { status = "Succes", message = "Cập nhật thông tin thành công" });
        }
    }
}
