using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ClassSupport;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiamGiaController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;
        public GiamGiaController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-giam-gia")]
        public IActionResult dsGiamGia(string maGv)
        {
            var dsGiamGia = db.GiamGia.Where(t => t.MaGv == maGv).ToList();
            return Ok(dsGiamGia);
        }

        [HttpPost]
        [Route("tao-giam-gia")]
        public IActionResult taoGiamGia(string maGv, string phanTramGiam)
        {
            GiamGium gg = new GiamGium();
            gg.MaGv = maGv;
            gg.MaGg = TaoMaTuDong.GenerateRandomCode("GG");
            gg.PhanTramGiam = float.Parse(phanTramGiam);

            db.GiamGia.Add(gg);
            int check = db.SaveChanges();
            if(check > 0)
            {
                return Ok(new { status = "Succes", message = "Tạo mã giảm giá thành công" });
            }
            return Ok(new { status = "Succes", message = "Tạo mã giảm giá thất bại" });

        }

        [HttpPut]
        [Route("tao-khoa-hoc-giam-gia")]
        public IActionResult taoKhoaHocGiamGia(KhoaHocGiamGium kh, string tongTienGiam)
        {
            var maKh = db.KhoaHocGiamGia.Where(t => t.Makh == kh.Makh).FirstOrDefault();
            if(maKh != null)
            {
                var khs = db.KhoaHocs.Where(t => t.MaKh == maKh.Makh).FirstOrDefault();
                maKh.Makh = kh.Makh;
                maKh.MaGg = kh.MaGg;
                maKh.NgayBatDau = kh.NgayBatDau;
                maKh.NgayKetThuc = kh.NgayKetThuc;
                
                khs.GiaDaGiam = float.Parse(tongTienGiam);
               var check =  db.SaveChanges();
               if(check > 0)
                {
                    return Ok(new { status = "Succes", mesage = "Áp dụng giảm giá thành công" });
                }
                
            }
            else
            {
                var khs = db.KhoaHocs.Where(t => t.MaKh == kh.Makh).FirstOrDefault();
                KhoaHocGiamGium newKh = new KhoaHocGiamGium();
                newKh.Makh = kh.Makh;
                newKh.MaGg = kh.MaGg;
                newKh.NgayBatDau = kh.NgayBatDau;
                newKh.NgayKetThuc = kh.NgayKetThuc;
                khs.GiaDaGiam = float.Parse(tongTienGiam);
                db.KhoaHocGiamGia.Add(newKh);

                var check = db.SaveChanges();
                if (check > 0)
                {
                    return Ok(new { status = "Succes", mesage = "Áp dụng giảm giá thành công" });
                }
            }

            return Ok(new { status = "Error", mesage = "Áp dụng giảm giá thất bại" });
        }

    }


}
