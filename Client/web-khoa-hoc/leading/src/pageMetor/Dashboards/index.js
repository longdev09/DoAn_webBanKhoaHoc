import ChartComp from "./Chart/Char";
import CardItem from "./CardItem/CardItem";
import classNames from "classnames/bind";
import style from "./MentorDashboards.module.scss";
const cx = classNames.bind(style);

export default function MentorDashboards() {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],

    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 0, 0, 0.5)", // Màu đỏ trong suốt
          "rgba(0, 0, 255, 0.5)", // Màu xanh trong suốt
          "rgba(255, 255, 0, 0.5)", // Màu vàng trong suốt
          "rgba(0, 255, 0, 0.5)", // Màu xanh lá trong suốt
          "rgba(128, 0, 128, 0.5)", // Màu tím trong suốt
          "rgba(255, 165, 0, 0.5)", // Màu cam trong suốt
        ],
        borderColor: ["red", "blue", "yellow", "green", "purple", "orange"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("heading")}>
          <div className={cx("text")}>Thống kê</div>
          <div className={cx("input-day")}>
            <input type="date" class="h-day" value="2023-11-21" />
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("list-card")}>
            <CardItem
              title={"Danh thu theo tháng"}
              subTitle={"Tổng thu nhập thực"}
            />
            <CardItem />
            <CardItem />
            <CardItem />
          </div>

          <div className={cx("chart-list")}>
            <ChartComp data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
