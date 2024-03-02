import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ChartComp from "./Chart/Char";
import CardItem from "./CardItem/CardItem";
import { Pie } from "react-chartjs-2";
import classNames from "classnames/bind";
import style from "./AdminDashboards.module.scss";
import { useEffect, useState } from "react";
import * as ThongKeServices from "~/api/ThongKeServices";
import numeral from "numeral";
import Button from "~/components/Button";
import * as XLSX from "xlsx";
const cx = classNames.bind(style);

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 0, 255, 0.5)",
        "rgba(255, 255, 0, 0.5)",
        "rgba(0, 255, 0, 0.5)",
        "rgba(128, 0, 128, 0.5)",
        "rgba(255, 165, 0, 0.5)",
        "rgba(0, 255, 255, 0.5)",
        "rgba(255, 0, 255, 0.5)",
        "rgba(165, 42, 42, 0.5)",
        "rgba(128, 128, 128, 0.5)",
      ],
      borderColor: [
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        "cyan",
        "magenta",
        "brown",
        "gray",
      ],
      borderWidth: 1,
    },
  ],
};

const dataPie = {
  labels: ["Học Viên", "Giảng Viên"],
  datasets: [
    {
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
export default function AdminDashboards() {
  const [chartData, setChartData] = useState(data);
  const [day, setDay] = useState(new Date());
  const [thongKeNgay, setThongKeNgay] = useState();
  const [thongKeThang, setThongKeThang] = useState();
  const [thongKeNam, setThongKeNam] = useState();
  const [dsHvGv, setdsHvGv] = useState(dataPie);
  const [loadingBtn, SetLoadingBtn] = useState(false);
  const fetchApiNgay = async () => {
    try {
      const res = await ThongKeServices.adminthongKeTheoNgay(day.toISOString());
      console.log(res);
      setThongKeNgay(res); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const fetchApiThang = async () => {
    try {
      const res = await ThongKeServices.adminthongKeTheoThang(
        day.toISOString()
      );
      console.log(res);
      setThongKeThang(res); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const fetchApiNam = async () => {
    try {
      const res = await ThongKeServices.adminthongKeTheoNam(day.toISOString());
      console.log(res);
      setThongKeNam(res); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const fetchApiKhMuaNhieu = async () => {
    try {
      const res = await ThongKeServices.thongKeKhoaHocMuaNhieuNhat();

      const tenKhValues = res.map((item) => item.tenKh);
      const dataSl = res.map((item) => item.soLuongBan);

      setChartData((prev) => ({
        ...prev,
        labels: tenKhValues,
        datasets: [
          {
            data: dataSl,
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const fetchApiSoLuong = async () => {
    const res = await ThongKeServices.tongSoHvGv();
    const dataArray = [];
    dataArray.push(res.tongSoHocVien, res.tongSoGiangVien);
    setdsHvGv((prev) => ({
      ...prev,
      datasets: [
        {
          data: dataArray,
        },
      ],
    }));
  };

  useEffect(() => {
    fetchApiNgay();
    fetchApiThang();
    fetchApiNam();
    fetchApiKhMuaNhieu();
    fetchApiSoLuong();
  }, [day]);

  const handChang = (value) => {
    setDay(new Date(value)); // Convert input value to a Date object
  };

  const dataa = [
    ["Name", "Age", "City"],
    ["John Doe", 28, "New York"],
    ["Jane Doe", 35, "San Francisco"],
    ["Bob Smith", 42, "Los Angeles"],
  ];

  const handleExcel = async () => {
    SetLoadingBtn(true);
    let excelData = [];
    const res = await ThongKeServices.thongKeXuatExcel(day.toISOString());
    if (Array.isArray(res)) {
      excelData = res.map((item) => [
        item.maHD,
        item.taiKhoan,
        item.pttt,
        item.tongTien,
        item.ngayTT,
        item.cthds.map((c) => `${c.tenKhoaHoc}: ${c.donGia}`).join(", "), // Join array of strings
      ]);
    } else {
      console.error("Response is not an array:", res);
      return; // Return early if the response is not an array
    }
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Mã HD",
        "Tài khoản",
        "Phương thức thanh toán",
        "Tổng tiền",
        "Ngày thanh toán",
        "Chi tiết hóa đơn",
      ],
      ...excelData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Xuất file Excel
    XLSX.writeFile(wb, "thongke.xlsx");
    SetLoadingBtn(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("heading")}>
          <div className={cx("text")}>Thống kê</div>
          <div className={cx("input-day")}>
            <input
              type="date"
              className="h-day"
              value={day.toISOString().split("T")[0]} // Format date for input
              onInput={(event) => handChang(event.target.value)}
            />
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("list-card")}>
            <CardItem
              title={"Tổng số doanh thu"}
              subTitle={"Tổng số lượng"}
              giaTri={numeral(thongKeNam).format("0,0")}
            />
            <CardItem
              title={"Danh thu theo ngày"}
              subTitle={"Tổng thu nhập thực"}
              giaTri={numeral(thongKeNgay).format("0,0")}
            />
            <CardItem
              title={"Danh thu theo tháng"}
              subTitle={"Tổng thu nhập thực"}
              giaTri={numeral(thongKeThang).format("0,0")}
            />
            <CardItem
              title={"Danh thu theo năm"}
              subTitle={"Tổng thu nhập thực"}
              giaTri={numeral(thongKeNam).format("0,0")}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }} className={cx("chart-list")}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Top 10 Khóa học được mua nhiều nhất</span>
              </div>
              <div>
                <ChartComp data={chartData} />
              </div>
            </div>
            <div style={{ width: "50%" }} className={cx("chart-list")}>
              <div
                style={{
                  width: "500px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pie data={dsHvGv} />
              </div>
            </div>
          </div>
        </div>
        <Button
          disabled={loadingBtn}
          disabledcss={loadingBtn}
          onClick={handleExcel}
          className={cx("btn")}
          leftIcon={loadingBtn ? <FontAwesomeIcon icon={faSpinner} spin /> : ""}
        >
          Xuất Excel
        </Button>
      </div>
    </div>
  );
}
