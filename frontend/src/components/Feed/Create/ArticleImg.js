import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import plus from "assets/images/plus.png"


function ArticleImg({ feedImages, onSetFeedImages }) {
  const selectUserImg = useRef("");
  const [imgList, setImgList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);
  const imgIdx = ["img1", "img2", "img3", "img4", "img5"];

  useEffect(() => {
    preview();
    console.log(imgList)
    if (isDisplay === true) {
      selectUserImg.current.value="";
    }
  });

  const preview = () => {
    if (imgList === []) return false;

    imgIdx.map((id, index) => {
      let imgElement = document.querySelector(`.${id} > img`);
      console.log(imgList[index])
      if (imgElement !== null) {
        console.log(URL.createObjectURL(imgList[index][1]));
        imgElement.src = URL.createObjectURL(imgList[index][1]);
      }
    });
  };

  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const fileName = file.name;
    const fileLength = fileName.length;
    const lastDot = fileName.lastIndexOf('.');
    const fileSpec = fileName.substring(lastDot+1, fileLength).toLowerCase();
    let imgUrlList = [...imgList];
    let fileUrlList = [...fileList];
    const imgType = ['jpg', 'png', 'gif']
    console.log(fileSpec)
    if (imgUrlList.length >= 4) {
      setIsDisplay(false);
    }

    if (event.target.files.length !== 0) {
      if (imgType.indexOf(fileSpec) !== -1) {
        imgUrlList.push(["img",URL.createObjectURL(file)]);
      }
      if (fileSpec === "mp4") {
        imgUrlList.push(["video",URL.createObjectURL(file)]);
      }
      
      fileUrlList.push(file);
    }
    setImgList(imgUrlList);
    setFileList(fileUrlList);
    onSetFeedImages(fileUrlList);
    console.log(imgList);
  };

  const handleDeleteImage = (id) => {
    setImgList(imgList.filter((_, index) => index !== id));
    setFileList(fileList.filter((_, index) => index !== id));
    onSetFeedImages(fileList.filter((_, index) => index !== id));
    setIsDisplay(true);

  };

  return (
    <Grid container direction="row">
      <Grid container>
        <div className="create-feed__imglabel">사진/영상</div>
        <Grid container direction="row">
          {isDisplay === true && (
            <Grid item>
              <input
                type="file"
                accept=".jpg, .png, .gif, .mp4"
                ref={selectUserImg}
                style={{ display: "none" }}
                onChange={handleClickInput}
              />
              <button
                onClick={() => selectUserImg.current.click()}
                style={{
                  width: 200,
                  height: 200,
                  background: "white",
                  border: "none",
                }}
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
                <Grid item key={index}>
                  {src[0] === "img" && (
                    <img
                      src={src[1]}
                      style={{ width: 200, height: 200 }}
                      alt=""
                    />
                  )}

                  {src[0] === "video" && (
                    <video
                      src={src[1]}
                      style={{ width: 200, height: 200 }}
                      alt=""
                      autoPlay
                      loop
                    />
                  )}
                  <button onClick={() => handleDeleteImage(index)}>x</button>
                </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleImg;
