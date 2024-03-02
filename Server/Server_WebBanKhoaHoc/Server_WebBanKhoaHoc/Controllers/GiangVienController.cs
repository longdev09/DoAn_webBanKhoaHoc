
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
    public class GiangVienController : ControllerBase
    {

        public readonly DB_QLKHOAHOCContext db;
        public GiangVienController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }




        [HttpGet]
        [Route("lay-danh-sach-giang-vien")]
        public IActionResult layDanhSachGiangVien()
        {
            var dsGiangVien = db.GiangViens.Where(t => true).ToList();
            if (dsGiangVien == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dsGiangVien);
        }

        [HttpGet]
        [Route("lay-thong-tin-giang-vien-theo-maGv")]
        public IActionResult layThongTinGiangVienTheoMaGv(string maGv)
        {
            string maNd = db.GiangViens.Where(t => t.MaGv == maGv).Select(t=>t.MaNd).FirstOrDefault();
            
            if (maNd != null)
            {
                var taiK = db.NguoiDungs.Where(t => t.MaNd == maNd).FirstOrDefault();
                if (taiK == null)
                {
                    return Ok(new { status = "Error" });
                }
                return Ok(taiK);
            }

            return Ok(new { status = "Error" });
        }

        [HttpGet]
        [Route("lay-thong-tin-gv-theo-maGv")]
        public IActionResult layThongTinGVTheoMaGv(string maGv)
        {
            var gv = db.GiangViens.Where(t => t.MaGv == maGv).FirstOrDefault();

            if (gv != null)
            {
                
                if (gv == null)
                {
                    return Ok(new { status = "Error" });
                }
                return Ok(gv);
            }

            return Ok(new { status = "Error" });
        }

        [HttpPost]
        [Route("tao-giang-vien")]
        public IActionResult taoGiangVien(string MaGv, string MaNd, string Hinh, string anhCmndMacTruoc, string anhCmndMacSau, GiangVien giangVien)
        {

            GiangVien newGiangVien = new GiangVien();
            newGiangVien.MaGv = MaGv;
            newGiangVien.MaNd = MaNd;
            newGiangVien.TenGv = giangVien.TenGv;
            newGiangVien.GioiThieu = giangVien.GioiThieu;
            newGiangVien.Hinh = Hinh;
            newGiangVien.NgaySinh = giangVien.NgaySinh;
            newGiangVien.Phai = giangVien.Phai;
            newGiangVien.Sdt = giangVien.Sdt;
            newGiangVien.Email = giangVien.Email;
            newGiangVien.LinkInfor = "";
            newGiangVien.CmndMacSau = anhCmndMacSau;
            newGiangVien.CmndMacTruoc = anhCmndMacTruoc;
            db.GiangViens.Add(newGiangVien);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes", message ="Đăng ký tài khoản thành công"});
            }
            return Ok(new { status = "Error", message = "Đăng ký tài khoản thát bại công" });
        }

        [HttpPut]
        [Route("cap-nhat-thong-tin-giang-vien")]
        public IActionResult capNhatThongTinGiangVien(GiangVien gv)
        {
            var gvs = db.GiangViens.Where(t => t.MaGv == gv.MaGv).FirstOrDefault();
            if(gvs != null)
            {
                gvs.GioiThieu = gv.GioiThieu;
                gvs.TenGv = gv.TenGv;
                int  kq = db.SaveChanges();
                if(kq > 0)
                {
                    return Ok(new { status = "Succes", message = "Cập nhật thông tin thành công" });
                } 
                
            }
            return Ok(new { status = "Error", message = "Cập nhật thông tin thất bại" });

        }

    }
}
