import { Grid } from "@mui/material";
import userImageInput from "assets/images/userImageInput.png";
import { useEffect, useRef, useState } from "react";

function ArticleImg() {
  const selectUserImg = useRef("");
  const [imgList, setImgList] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);
  const imgIdx = ["img1", "img2", "img3", "img4", "img5"];

  useEffect(() => {
    preview();
  });

  const preview = () => {
    if (imgList === []) return false;

    imgIdx.map((id, index) => {
      let imgElement = document.querySelector(`.${id} > img`);
      if (imgElement !== null) {
        imgElement.src = imgList[index];
      }
    });
  };

  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    let imgUrlList = [...imgList];
    if (imgUrlList.length >= 4) {
      setIsDisplay(false);
    }

    if (event.target.files.length !== 0) {
      imgUrlList.push(URL.createObjectURL(file));
    }
    setImgList(imgUrlList);
    console.log(imgList);
  };

  const handleDeleteImage = (id) => {
    setImgList(imgList.filter((_, index) => index !== id));
    setIsDisplay(true);
  };

  const onLoadImg = () => {};

  return (
    <Grid container direction="row">
      <Grid item>
        <div>사진/영상</div>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          {isDisplay === true && (
            <Grid item>
              <input
                type="file"
                accept="image/*"
                ref={selectUserImg}
                style={{ display: "none" }}
                onChange={handleClickInput}
              />
              <button
                onClick={() => selectUserImg.current.click()}
                style={{ width: 200, height: 200 }}
              >
                <img
                  src={userImageInput}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </button>
            </Grid>
          )}
          {imgList.map((src, index) => (
            <Grid item key={index}>
              <img src={src} style={{ width: 200, height: 200 }} alt="" />
              <button onClick={() => handleDeleteImage(index)}>x</button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleImg;
