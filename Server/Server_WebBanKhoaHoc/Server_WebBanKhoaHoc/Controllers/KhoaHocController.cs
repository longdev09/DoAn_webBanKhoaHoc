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
    public class KhoaHocController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;
        public KhoaHocController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc")]
        public IActionResult layDanhSachKhoaHoc()
        {
            var KhoaHocs = db.KhoaHocs.Where(t => true).ToList();
            var dsKhoaHoc = new List<object>();
            if (KhoaHocs != null)
            {
                foreach (var kh in KhoaHocs)
                {
                    if(kh.TrangThai == "Đang bán")
                    {
                        int? tong = 0;
                        int dem = 0;
                        double trungBinhSao = 0;
                        var danhGias = db.DanhGia.Where(t => t.MaKh == kh.MaKh).ToList();
                        var tenGv = db.KhoaHocs.Where(t => t.MaKh == kh.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault();
                        if (danhGias.Count != 0)
                        {
                            foreach (var dg in danhGias)
                            {
                                tong += dg.SoSao;
                                dem++;
                            }
                            trungBinhSao = Math.Round((double)tong / dem, 1);
                            var khoaHoc = new
                            {
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TieuDe,
                                tongSao = trungBinhSao,
                                donGia = kh.DonGia,
                                tenGv = tenGv,
                                tongDg = danhGias.Count,
                                giaGiam = kh.GiaDaGiam,
                            };
                            dsKhoaHoc.Add(khoaHoc);

                        }
                        else
                        {
                            var khoaHoc = new
                            {
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TieuDe,
                                tongSao = trungBinhSao,
                                donGia = kh.DonGia,
                                tenGv = tenGv,
                                tongDg = danhGias.Count,
                                giaGiam = kh.GiaDaGiam,

                            };
                            dsKhoaHoc.Add(khoaHoc);
                        }
                    }    
                    

                }
                return Ok(dsKhoaHoc);
            }
            return Ok(new { message = "Error" });
        }


        // admin
        [HttpGet]
        [Route("lay-ds-khoa-hoc-admin")]

        public IActionResult layDanhSachKhoaHocAdmin()
        {
            var KhoaHocs = db.KhoaHocs.Where(t => true).ToList();
            var dskh = new List<object>();
            if (KhoaHocs != null)
            {
                foreach (var item in KhoaHocs)
                {
                    var kh = new
                    {
                        maKh = item.MaKh,
                        tenDm = db.DanhMucKhs.Where(t => t.MaDm == item.MaDm).Select(t => t.TenDm).FirstOrDefault(),
                        tenKh = item.TieuDe,
                        gia = item.DonGia,
                        moTa = item.Mota,
                        ketQua = item.KetQuaDatDuoc,
                        hinh = item.Hinh,
                        tenGv = db.GiangViens.Where(t => t.MaGv == item.MaGv).Select(t => t.TenGv).FirstOrDefault(),
                        anhGv = db.GiangViens.Where(t => t.MaGv == item.MaGv).Select(t => t.Hinh).FirstOrDefault(),
                        trangThai = item.TrangThai,
                    };
                    dskh.Add(kh);
                }
                return Ok(dskh);
            }
            return Ok(dskh);


        }


        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-da-mua")]
        public IActionResult layDanhSachKhoaHocDaMua(string maHv)
        {

            var khoaHocDaMua = db.KhoaHocDaMuas.Where(t => t.MaHv == maHv).ToList();
            var dsKh = new List<object>();
            if (khoaHocDaMua != null)
            {
               
                foreach(var item in khoaHocDaMua)
                {

                    var khoaHoc = db.KhoaHocs
                        .Where(t => t.MaKh == item.MaKh)
                        .Select(t => new
                        {
                            maKh = t.MaKh,
                            HinhAnh = t.Hinh,
                            TenKh = t.TieuDe,
                            TenGv = t.MaGvNavigation.TenGv
                        })
                        .FirstOrDefault();

                    dsKh.Add(khoaHoc);

                }
                return Ok(dsKh);
            }
            return Ok(dsKh);
        }



        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-theo-ma-gv")]
        public IActionResult layDanhSachKhoaHocTheoMaGv(string maGv)
        {
            var dsKh = db.KhoaHocs.Where(t => t.MaGv == maGv).ToList();
            var dskhGv = new List<object>();
            if(dsKh != null)
            {
                foreach (var item in dsKh)
                {
                    var kh = new
                    {
                        maKh = item.MaKh,
                        tenDm = db.DanhMucKhs.Where(t => t.MaDm == item.MaDm).Select(t => t.TenDm).FirstOrDefault(),
                        tenKh = item.TieuDe,
                        gia = item.DonGia,
                        moTa = item.Mota,
                        ketQua = item.KetQuaDatDuoc,
                        hinh = item.Hinh,
                        giaGiam = item.GiaDaGiam,
                        ngayBatDau = FormatDate.FmDate(db.KhoaHocGiamGia.Where(t => t.Makh == item.MaKh).Select(t => t.NgayBatDau).FirstOrDefault()),
                        ngayKetThuc = FormatDate.FmDate(db.KhoaHocGiamGia.Where(t => t.Makh == item.MaKh).Select(t => t.NgayKetThuc).FirstOrDefault())
                };
                    dskhGv.Add(kh);
                }
                return Ok(dskhGv);
            }
            return Ok(dskhGv);

        }


        [HttpPost]
        [Route("them-khoa-hoc")]
        public IActionResult themKhoaHoc(KhoaHoc khoaHoc, string urlImg)
        {
            KhoaHoc newKhoaHoc = new KhoaHoc();
            newKhoaHoc.MaKh = TaoMaTuDong.GenerateRandomCode("KH");
            newKhoaHoc.MaGv = khoaHoc.MaGv;
            newKhoaHoc.MaDm = khoaHoc.MaDm;
            newKhoaHoc.TieuDe = khoaHoc.TieuDe;
            newKhoaHoc.DonGia = khoaHoc.DonGia;
            newKhoaHoc.GiaDaGiam = khoaHoc.GiaDaGiam;
            newKhoaHoc.Mota = khoaHoc.Mota;
            newKhoaHoc.KetQuaDatDuoc = khoaHoc.KetQuaDatDuoc;
            newKhoaHoc.Hinh = urlImg;
            newKhoaHoc.TrangThai = "Chờ duyệt";
            db.KhoaHocs.Add(newKhoaHoc);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes",  message ="Thêm khóa học thành công", maKh = newKhoaHoc.MaKh});
            }
            return Ok(new { status = "Error" , message = "Thêm khóa học thất bại"});
        }

        [HttpPut]
        [Route("cap-nhat-gia-khoa-hoc")]
        public IActionResult themGiaKhoaHoc(string maKh, string gia)
        {
            var kh = db.KhoaHocs.Where(t => t.MaKh == maKh).FirstOrDefault();
            if(kh != null)
            {
                kh.DonGia = float.Parse(gia);
                db.SaveChanges();
                return Ok(new { status = "Succes", message = "Cập nhật giá thành công" });
            }
            return Ok(new { status = "Error", message = "Cập nhật giá thất bại" });
        }

        [HttpGet]
        [Route("lay-thong-tin-khoa-hoc-theo-ma")]
        public IActionResult layThongTinKhoaHocTheoMa(string maKhoaHoc)
        {
            int? tong = 0;
            int dem = 0;
            double trungBinhSao = 0;
            var danhGias = db.DanhGia.Where(t => t.MaKh == maKhoaHoc).ToList();
            if (danhGias.Count != 0)
            {
                foreach (var dg in danhGias)
                {
                    tong += dg.SoSao;
                    dem++;
                }
                trungBinhSao = Math.Round((double)tong / dem, 1);
            }

            var khoaHoc = db.KhoaHocs
                .Where(t => t.MaKh == maKhoaHoc)
                .Select(t => new {
                    maKh = t.MaKh,
                    maGV = t.MaGv,
                    tenGV = t.MaGvNavigation.TenGv,
                    hinhGV = t.MaGvNavigation.Hinh,
                    maDM = t.MaDm,
                    donGia = t.DonGia,
                    giaDaGiam = t.GiaDaGiam,
                    moTa = t.Mota,
                    kqdd = t.KetQuaDatDuoc,
                    hinh = t.Hinh,
                    tenKh = t.TieuDe,
                    tongSao = trungBinhSao,
                    dsChuong = t.ChuongKhs.Select(
                                    r => new {
                                        tenChuong = r.TenCh,
                                        maChuong = r.MaCh,
                                        noiDungChuongs = r.Ndchuongs.Select(
                                            e => new {
                                                tenNoiDung = e.TenNd,
                                                maNoiDung = e.MaNd,
                                                moTa = e.MoTa,
                                                video = e.Video
                                            }).ToList()
                                    }).ToList()
                }).FirstOrDefault();
            return Ok(khoaHoc);
        }



        [HttpGet]
        [Route("tim-kiem-khoa-hoc")]
        public IActionResult timKhoaHoc(string tuKhoa)
        {
            var ketQua = new List<object>();
            var dsKh = db.KhoaHocs.Where(t => true).ToList();
            foreach (var khoaHoc in dsKh)
            {
                var gv = db.GiangViens.Where(t => t.MaGv == khoaHoc.MaGv).FirstOrDefault();
                var danhMuc = db.DanhMucKhs.Where(t => t.MaDm == khoaHoc.MaDm).FirstOrDefault();

                if (gv != null && gv.TenGv.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                   // ketQua.Add(khoaHoc);
                    var s = new
                    {
                        maKh = khoaHoc.MaKh,
                        hinhAnh = khoaHoc.Hinh,
                        tenKh = khoaHoc.TieuDe,
                        //tongSao = trungBinhSao,
                        donGia = khoaHoc.DonGia,
                       
                        //tongDg = danhGias.Count,
                        //giaGiam = kh.GiaDaGiam,
                    };
                    ketQua.Add(s);
                }

                if ((khoaHoc.TieuDe.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.Mota.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.KetQuaDatDuoc.ToLower().Contains(tuKhoa.ToLower()))
                    && !ketQua.Contains(khoaHoc))
                {
                    var s = new
                    {
                        maKh = khoaHoc.MaKh,
                        hinhAnh = khoaHoc.Hinh,
                        tenKh = khoaHoc.TieuDe,
                        //tongSao = trungBinhSao,
                        donGia = khoaHoc.DonGia,

                        //tongDg = danhGias.Count,
                        //giaGiam = kh.GiaDaGiam,
                    };
                    ketQua.Add(s);
                }

                if (danhMuc != null && danhMuc.TenDm.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                    var s = new
                    {
                        maKh = khoaHoc.MaKh,
                        hinhAnh = khoaHoc.Hinh,
                        tenKh = khoaHoc.TieuDe,
                        //tongSao = trungBinhSao,
                        donGia = khoaHoc.DonGia,

                        //tongDg = danhGias.Count,
                        //giaGiam = kh.GiaDaGiam,
                    };
                    ketQua.Add(s);
                }
            }
           
            return Ok(ketQua);
        }
        

        [HttpPut]
        [Route("duyet-khoa-hoc")]
        public IActionResult duyetKhoaHoc(string maKh, string trangThaiDuyet)
        {
            var kh = db.KhoaHocs.Where(t => t.MaKh == maKh).FirstOrDefault();
            kh.TrangThai = trangThaiDuyet;
            db.SaveChanges();
            return Ok(new { status ="Succes"});
        }
    }
}


 