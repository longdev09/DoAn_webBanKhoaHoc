import SlickComp from "~/components/SlickComp/SlickComp";
import CouresItem from "~/components/Course";
import classNames from "classnames/bind";
import style from "./ListCoures.module.scss";
const cx = classNames.bind(style);

export default function ListCoures({ title, arrayKhoaHoc }) {
  return (
    <div className={cx("coures-wrapp")}>
      <div className={cx("title")}>
        <h1>{title}</h1>
      </div>
      <div className={cx("list-coures")}>
        <SlickComp
          slidesToShow={5}
          arraySide={arrayKhoaHoc.map((item) => (
            <CouresItem item={item} />
          ))}
        />
      </div>
    </div>
  );
}
