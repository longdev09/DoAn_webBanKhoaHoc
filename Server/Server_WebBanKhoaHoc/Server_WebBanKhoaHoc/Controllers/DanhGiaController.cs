using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.ClassSupport;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhGiaController : ControllerBase
    {

        private readonly DB_QLKHOAHOCContext db;
        public DanhGiaController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        [HttpPost]
        [Route("them-danh-gia")]
        public IActionResult taoDanhGia(string maHV, string maKH, string noiDung, int soSao)
        {
            DanhGium newDanhGia = new DanhGium();
            newDanhGia.MaDg = TaoMaTuDong.GenerateRandomCode("DG");
            newDanhGia.MaHv = maHV;
            newDanhGia.MaKh = maKH;
            newDanhGia.NoiDung = noiDung;
            newDanhGia.SoSao = soSao;
            newDanhGia.NgayDg = DateTime.Now;
            db.DanhGia.Add(newDanhGia);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes", message = "Đánh giá khóa học thành công" });
            }
            return Ok(new { status = "Error", message = "Đánh giá khóa học thất bại" });
        }

        [HttpGet]
        [Route("lay-danh-sach-danh-gia-theo-khoa-hoc")]
        public IActionResult layDanhSachDanhGia(string maKhoaHoc)
        {
            var dsDanhGia = db.DanhGia.Where(t => t.MaKh == maKhoaHoc).ToList();
            List<object> dgs = new List<object>();
            foreach (var dg in dsDanhGia)
            {
                var data = db.DanhGia.Where(t => t.MaDg == dg.MaDg).Select(r => new { r.MaHvNavigation.TenHv, r.MaHvNavigation.Hinh, r.SoSao, r.NoiDung, NgayDgFormatted = FormatDate.FmDate(r.NgayDg) }).FirstOrDefault();
                dgs.Add(data);
            }
            return Ok(dgs);
        }

        [HttpGet]
        [Route("lay-danh-sach-danh-gia")]
        public IActionResult layDanhSachDG()
        {
            var dsDanhGia = db.DanhGia.Where(t => true).ToList();
            List<object> dgs = new List<object>();
            foreach (var dg in dsDanhGia)
            {
                var data = db.DanhGia.Where(t => t.MaDg == dg.MaDg).Select(r => new {r.MaDg, r.MaHvNavigation.TenHv, r.MaHvNavigation.Hinh, r.SoSao, r.NoiDung, NgayDgFormatted = FormatDate.FmDate(r.NgayDg) }).FirstOrDefault();
                dgs.Add(data);
            }
            return Ok(dgs);
        }

        [HttpDelete]
        [Route("xoa-danh-gia")]
        public IActionResult xoaDanhGia(string maDg)
        {
            var dg = db.DanhGia.Where(t => t.MaDg == maDg).FirstOrDefault();
            db.DanhGia.Remove(dg);
            db.SaveChanges();
            return Ok(new { status = "Succes", message = "Xóa bình luận thành công"});
        }
    }
}
