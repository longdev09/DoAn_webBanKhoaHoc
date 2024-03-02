import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function ChartComp({ data }) {
  return (
    <Bar
      data={data}
      options={{
        scales: {
          x: {
            type: "category", // Đảm bảo bạn đã cấu hình type là 'category'
            ticks: {
              display: false, // This will hide the x-axis labels
            },
          },
        },
      }}
    />
  );
}
