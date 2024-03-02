import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  const maxRating = 5;
  const starColor = "#ffd700"; // Màu sắc cho sao được chọn

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      style={{ color: index < rating ? starColor : "gray" }}
    />
  ));

  return <div>{stars}</div>;
};

export default StarRating;
