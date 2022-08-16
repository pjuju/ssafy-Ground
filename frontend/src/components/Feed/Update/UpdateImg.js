import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import plus from "assets/images/plus.png";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "api/firebase";

function UpdateImg({
  boardInfo,
  newImages,
  setNewImages,
  uploadImages,
  setUploadImages,
}) {
  const selectUserImg = useRef("");
  const [imgList, setImgList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);
  const [rerender, setRerender] = useState(false);
  const imgIdx = ["img1", "img2", "img3", "img4", "img5"];
  const images = boardInfo.images;

  useEffect(() => {
    console.log("download complete");
    console.log(imgList);
    if (isDisplay === true) {
      selectUserImg.current.value = "";
    }
  }, [imgList]);

  useEffect(() => {
    function tick() {
      return setTimeout(() => fetchImage(), 1000);
    }
    tick();
    return () => clearTimeout(tick);
  }, [images]);

  const fetchImage = () => {
    console.log("download");
    console.log(images);
    let imgUrlList = [];
    images.map((src, index) => {
      console.log(src);
      const storageRef = ref(storage, `images/${src.imageUrl}`);
      const imgType = ["jpg", "png", "gif", "jpeg"];
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
      console.log(imgUrlList);
    });
  };

  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const fileName = file.name;
    const fileLength = fileName.length;
    const lastDot = fileName.lastIndexOf(".");
    const fileSpec = fileName.substring(lastDot + 1, fileLength).toLowerCase();
    const randNum = parseInt((new Date().getTime() + Math.random()) * 100);
    let imgUrlList = [...imgList];
    let fileUrlList = [...fileList];
    let imgNumList = [...newImages];
    let uploadList = [...uploadImages];
    const imgType = ["jpg", "png", "gif", "jpeg"];
    console.log(fileSpec);
    if (imgUrlList.length >= 4) {
      setIsDisplay(false);
    }

    if (event.target.files.length !== 0) {
      if (imgType.indexOf(fileSpec) !== -1) {
        imgUrlList.push(["img", URL.createObjectURL(file)]);
      }
      if (fileSpec === "mp4") {
        imgUrlList.push(["video", URL.createObjectURL(file)]);
      }
      imgNumList.push({
        imageType: fileSpec,
        imageUrl: randNum.toString(),
      });
      uploadList.push({
        imageType: fileSpec,
        imageUrl: randNum.toString(),
        file: file,
      });
      fileUrlList.push(file);
    }
    setImgList(imgUrlList);
    setFileList(fileUrlList);
    setNewImages(imgNumList);
    setUploadImages(uploadList);
    console.log(imgList);
  };

  const handleDeleteImage = (id) => {
    setImgList(imgList.filter((_, index) => index !== id));
    setFileList(fileList.filter((_, index) => index !== id));
    setNewImages(newImages.filter((_, index) => index !== id));
    setUploadImages(uploadImages.filter((_, index) => index !== id));
    setIsDisplay(true);
  };

  return (
    <Grid container direction="row">
      <Grid container>
        <div className="update-feed__imglabel">사진/영상</div>
        <Grid container direction="row">
          {isDisplay === true && (
            <Grid item>
              <input
                type="file"
                accept=".jpg, .png, .gif, .jpeg, .mp4"
                ref={selectUserImg}
                style={{ display: "none" }}
                onChange={handleClickInput}
              />
              <button
                onClick={() => selectUserImg.current.click()}
                className="update-feed__img-button"
              >
                <img
                  src={plus}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </button>
            </Grid>
          )}
          {imgList.map((src, index) => (
            <Grid item key={index} className="update-feed__media-wrapper">
              {src[0] === "img" && (
                <img src={src[1]} className="update-feed__media" alt="" />
              )}

              {src[0] === "video" && (
                <video
                  src={src[1]}
                  className="update-feed__media"
                  alt=""
                  autoPlay
                  controls
                />
              )}
              <button
                className="update-feed__delete-button"
                onClick={() => handleDeleteImage(index)}
              >
                x
              </button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UpdateImg;
