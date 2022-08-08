import temp1 from "assets/images/temp1.jpeg";
import temp2 from "assets/images/temp2.jpeg";
import temp3 from "assets/images/temp3.jpeg";
import MediaModal from "components/Feed/Article/MediaModal";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

function MediaSlider() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  const handleClickOpen = (src) => {
    setSrc(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider className="slider" {...settings}>
        <div className="slider__item">
          <img src={temp1} onClick={() => handleClickOpen("img1")} />
        </div>
        <div className="slider__item">
          <img src={temp2} onClick={() => handleClickOpen("img2")} />
        </div>
        <div className="slider__item">
          <img src={temp3} onClick={() => handleClickOpen("img3")} />
        </div>
        <div className="slider__item">
          <img src={temp1} onClick={() => handleClickOpen("img4")} />
        </div>
        <div className="slider__item">
          <img src={temp2} onClick={() => handleClickOpen("img5")} />
        </div>
      </Slider>
      <MediaModal open={open} handleClose={handleClose} src={src} />
    </div>
  );
}

export default MediaSlider;
