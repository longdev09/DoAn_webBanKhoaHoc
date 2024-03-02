import Slider from "react-slick";
import CouresItem from "../Course";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../CustomPrev/Arrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function SlickComp({ title, slidesToShow, arraySide }) {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,

    nextArrow: (
      <Arrow nextArrow>
        <FontAwesomeIcon icon={faCaretRight} />
      </Arrow>
    ),
    prevArrow: (
      <Arrow prevArrow>
        <FontAwesomeIcon icon={faCaretLeft} />
      </Arrow>
    ),
  };

  if (slidesToShow) {
    settings.slidesToShow = slidesToShow;
  }
  return (
    <>
      <Slider {...settings}>
        {arraySide.map((item) => {
          return <> {item} </>;
        })}
      </Slider>
    </>
  );
}
