import temp1 from "assets/images/temp1.jpeg";
import temp2 from "assets/images/temp2.jpeg";
import temp3 from "assets/images/temp3.jpeg";
import MediaModal from "components/Feed/Article/MediaModal";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { storage } from "api/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function MediaSlider(images) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [imgList, setImgList] = useState([]);
  const [isDownload, setIsDownload] = useState(false);
  const [rerender, setRerender] = useState(false);
  const imgs = images.images;
  useEffect(() => {
    // console.log(imgs);
    if (imgs !== []) {
      fetchImage();
    }
  }, [imgs]);

  useEffect(() => {
    // console.log("download complete");
    // console.log(imgList);
    setIsDownload(true);
  }, [imgList]);

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

  const fetchImage = () => {
    // console.log("download");
    // console.log(images);
    let imgUrlList = [];
    imgs.map((src, index) => {
      // console.log(src);
      const storageRef = ref(storage, `images/${src.imageUrl}`);
      const imgType = ["jpg", "png", "gif"];
      if (src.imageurl === undefined) {
        getDownloadURL(storageRef)
          .then((url) => {
            if (imgType.indexOf(src.imageType) !== -1) {
              imgUrlList.push(["img", url]);
            }
            if (src.imageType === "mp4") {
              imgUrlList.push(["video", url]);
            }
          })
          .then((snapshot) => {
            setImgList(imgUrlList);
            setRerender((state) => !state);
          });
      }
      // console.log(imgUrlList);
    });
  };

  return (
    <div>
      <Slider className="slider" {...settings}>
        {imgList.map((src, index) => (
          <div key={index} className="slider__item">
            {src[0] === "img" && (
              <img
                src={src[1]}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
            )}

            {src[0] === "video" && (
              <video
                src={src[1]}
                alt=""
                style={{ width: "200px", height: "200px" }}
                controls
              />
            )}
          </div>
        ))}
      </Slider>
      <MediaModal open={open} handleClose={handleClose} src={src} />
    </div>
  );
}

export default MediaSlider;
