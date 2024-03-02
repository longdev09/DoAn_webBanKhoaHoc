using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.ClassSupport;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ModelsVnPay;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public HoaDonController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        [HttpGet]
        [Route("tao-hoa-don-mua-khoa-hoc")]
        public IActionResult taoHoaDonMuaKhoaHoc([FromQuery] VnPayReturnModel mode)
        {

            string htmlContent = @"
                <html>
                <head>
                    <style>
                        /* Định dạng CSS */
                        body {
                            font-family: 'Arial', sans-serif;
                            font-size: 14px;
                            color: #333333;
                        }

                        .success-message {
                            color: #28a745;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>

                    <img src='https://firebasestorage.googleapis.com/v0/b/luutru-web-ban-khoa-hoc-cef36.appspot.com/o/logoWeb%2FlogoWeb.png?alt=media&amp;token=9ce9b0c4-6b6a-4644-a8ef-c423489f5333' alt='Logo Web'>
                    <p class='success-message'>Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        
                    <!-- Chèn hình ảnh -->
                   
                </body>
                </html>
                ";
            string[] parts = mode.vnp_OrderInfo.Split(',');
            Hoadon newHoaDon = new Hoadon();
            newHoaDon.MaHd = TaoMaTuDong.GenerateRandomCode("HDKH");
            newHoaDon.MaPt = "PT001";
            newHoaDon.MaHv = parts[0].Trim();
            newHoaDon.TongTien = double.Parse(parts[1].Trim());
            newHoaDon.NgayThanhToan = DateTime.Now;
            db.Hoadons.Add(newHoaDon);
            int check = db.SaveChanges();
            if (check > 0)
            {
                // them gio hang vao chi tiet hoa don
                var gioHang = db.Giohangs.Where(t => t.MaHv == newHoaDon.MaHv).FirstOrDefault();
                if(gioHang != null)
                {
                    var dsCtGioHang = db.CtGioHangs.Where(t => t.MaGh == gioHang.MaGh).ToList();
                    foreach(var item in dsCtGioHang)
                    {
                        Cthd newCt = new Cthd();
                        newCt.MaKh = item.MaKh;
                        newCt.MaHd = newHoaDon.MaHd;
                        newCt.DonGia = item.DonGia;
                        db.Cthds.Add(newCt);
                        db.SaveChanges();
                        KhoaHocDaMua newKhDm = new KhoaHocDaMua();
                        newKhDm.MaHv = newHoaDon.MaHv;
                        newKhDm.MaKh = item.MaKh;
                        db.KhoaHocDaMuas.Add(newKhDm);
                        db.SaveChanges();
                    }
                    foreach (var item in dsCtGioHang)
                    {
                        db.CtGioHangs.Remove(item);
                        db.SaveChanges();
                    }
                }
                var emailHv = db.HocViens.Where(t => t.MaHv == newHoaDon.MaHv).Select(t => t.Email).FirstOrDefault();
                SendEmail.guiEmail(emailHv, htmlContent);
                return Redirect("http://localhost:3000/my-course");

            }
            return Ok(new { status = "Error" });
        }

        [HttpGet]
        [Route("lay-danh-sach-hoa-don-mua-khoa-hoc")]
        public IActionResult layDanhSachHoaDonMuaKhoaHoc(string maHv)
        {
            var hoaDon = db.Hoadons.Where(t => t.MaHv == maHv).ToList();

            var dsHoaDon = new List<object>();
            if(hoaDon != null)
            {
                foreach(var item in hoaDon)
                {
                    var hd = new
                    {
                        maHd = item.MaHd,
                        ptTt = db.Ptthanhtoans.Where(t => t.MaPt == item.MaPt).Select(t => t.TenPt).FirstOrDefault(),
                        tongTien = item.TongTien,
                        ngayThanhToan = FormatDate.FmDateTime(item.NgayThanhToan)
                    };
                    dsHoaDon.Add(hd);
                }
                return Ok(dsHoaDon);
            }
            return Ok(dsHoaDon);
        }


        [HttpGet]
        [Route("lay-danh-sach-chi-tiet-hoa-don-mua-khoa-hoc")]
        public IActionResult layDanhSachChiTietHoaDonMuaKhoaHoc(string maHd)
        {

            var ctHd = db.Cthds.Where(t => t.MaHd == maHd).ToList();
            var dsKh = new List<object>();
            if (ctHd != null)
            {
                
                foreach (var item in ctHd)
                {
                    var khoaHoc = new
                    {
                        hinhAnh = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.Hinh).FirstOrDefault(),
                        tenKh = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.TieuDe).FirstOrDefault(),
                        tenGv = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault(),
                        donGia = item.DonGia
                    };
                    dsKh.Add(khoaHoc);
                }
                return Ok(dsKh);
            }    
            
            return Ok(dsKh);

            
        }



    }
}
