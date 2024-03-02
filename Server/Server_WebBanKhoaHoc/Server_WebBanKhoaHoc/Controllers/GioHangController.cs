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
    public class GioHangController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public GioHangController (DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        

        
        [HttpGet]
        [Route("lay-chi-tiet-gio-hang-theo-ma-hoc-vien")]
        public IActionResult layDanhSachKhoaHocTrongGioHang(string maHV)
        {
            var gioHangs = db.Giohangs.Where(t => t.MaHv == maHV).FirstOrDefault();
            var dsKhoaHoc = new List<object>();
            if (gioHangs != null)
            {
                var ctghs = db.CtGioHangs.Where(t => t.MaGh == gioHangs.MaGh).ToList();
                if (ctghs != null)
                {
                    foreach (var ct in ctghs)
                    {
                        var kh = db.KhoaHocs.Where(t => t.MaKh == ct.MaKh).FirstOrDefault();
                        var tenGv = db.KhoaHocs.Where(t => t.MaKh == kh.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault();
                        var khoaHoc = new
                        {
                            ctGh = gioHangs.MaGh,
                            maKh = kh.MaKh,
                            hinhAnh = kh.Hinh,
                            tenKh = kh.TieuDe,
                            giaGoc = kh.DonGia,
                            donGia = ct.DonGia,
                            tenGv = tenGv,
                        };
                        dsKhoaHoc.Add(khoaHoc);
                    }
                }
            }
            return Ok(dsKhoaHoc);
        }




        [HttpPost]
        [Route("them-gio-hang")]
        public IActionResult themGioHang(string maHV, string maKH)
        {
            var checkKh = db.KhoaHocDaMuas.Where(t => t.MaKh == maKH && t.MaHv == maHV).FirstOrDefault();
            if(checkKh == null)
            {
                var checkGio = db.Giohangs.Where(t => t.MaHv == maHV).FirstOrDefault();
                if (checkGio == null)
                {
                    // tao gio moi
                    Giohang newGioHang = new Giohang();
                    newGioHang.MaGh = TaoMaTuDong.GenerateRandomCode("GH");
                    newGioHang.MaHv = maHV;
                    newGioHang.TongTien = 0;
                    db.Giohangs.Add(newGioHang);
                    db.SaveChanges();

                    // tien hanh them  ct gio hang
                    var ktr = themCtGioHang(newGioHang, maKH);
                    if (ktr == true)
                    {
                        return Ok(new { status = "Succes", message = "Thêm khóa học vào giỏ thành công" });
                    }
                    else
                    {
                        return Ok(new { status = "Error", message = "Khóa học đã có trong giỏ" });
                    }

                }
                else
                {
                    // tien hanh them  ct gio hang
                    var ktr = themCtGioHang(checkGio, maKH);
                    if (ktr == true)
                    {
                        return Ok(new { status = "Succes", message = "Thêm khóa học vào giỏ thành công" });

                    }
                    else
                    {
                        return Ok(new { status = "Error", message = "Khóa học đã có trong giỏ" });
                    }


                }
            }
            else
            {
                return Ok(new { status = "Error", message = "Khóa học đã được mua " });
            }
            

        }

        [HttpDelete]
        [Route("xoa-ct-gio-hang")]
        public IActionResult xoaGioHang(string maKh)
        {
            var check = db.CtGioHangs.Where(t => t.MaKh == maKh ).FirstOrDefault();
            if (check != null)
            {
                db.CtGioHangs.Remove(check);
                int ktr = db.SaveChanges();
                if (ktr > 0)
                {
                    return Ok(new { status = "Succes", message = "Xóa khóa học khỏi giỏ thành công" });
                }
            }
            return Ok(new { status = "Error", message = "Xóa khóa học khỏi giỏ thất bại" });
        }


        private bool themCtGioHang(Giohang gioHang, string maKH)
        {

            var checkKhDaThem = db.CtGioHangs.Any(t => t.MaKh == maKH && t.MaGh == gioHang.MaGh);
            var kh = db.KhoaHocs.Where(t => t.MaKh == maKH).FirstOrDefault();
            var donGia = kh.DonGia;
            if (checkKhDaThem == true)
            {
                return false;
            }
            if (kh.GiaDaGiam != null)
            {
                donGia = kh.GiaDaGiam;
            }    
            CtGioHang newCt = new CtGioHang();
            newCt.MaGh = gioHang.MaGh;
            newCt.MaKh = maKH;
            newCt.DonGia = donGia;
            db.CtGioHangs.Add(newCt);
            var ktr = db.SaveChanges();
            if (ktr > 0)
            {
                return true;
            }
            return false;

        }



    }
}
