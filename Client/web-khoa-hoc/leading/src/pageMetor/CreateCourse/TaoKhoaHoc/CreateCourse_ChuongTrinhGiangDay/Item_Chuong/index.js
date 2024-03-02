import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import ItemNoiDung from "../Item_NoiDung";
import classNames from "classnames/bind";
import style from "./Item_Chuong.module.scss";
import Modal from "~/components/Modal";
import ModalThemNoiDung from "../Modal_ThemNd";

import { useState } from "react";
const cx = classNames.bind(style);

export default function ItemChuong({ dsChuong }) {
  const dsChuongSorted = [...dsChuong].sort((a, b) => a.stt - b.stt);

  return (
    <div className={cx("list-chapter")}>
      {dsChuongSorted &&
        dsChuongSorted.map((item, index) => (
          <div className={cx("item-chapter")}>
            <div className={cx("wrapp")}>
              <div className={cx("title-chapter")}>
                <span>
                  <FontAwesomeIcon icon={faBookmark} />
                </span>
                <span>Chương {index + 1}. </span>
                <span>{item.tenCh}</span>
              </div>

              <div className={cx("btn")}>
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
            <div className={cx("sum")}>Tổng số bài nội dung: 10</div>
            <div className={cx("content")}>
              <ItemNoiDung maCh={item.maCh} />
            </div>
          </div>
        ))}
    </div>
  );
}
