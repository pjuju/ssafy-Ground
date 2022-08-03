import React from "react";
import { Grid } from "@mui/material";
import userImageInput from "assets/images/userImageInput.png";
import { useEffect, useRef } from "react";

function ArticleImg() {
  const selectUserImg = useRef("");
  const [img, setImg] = React.useState("");
  const [imgList, setImgList] = React.useState([]);
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

  const handleClickInput = (event, index) => {
    event.preventDefault();

    const file = event.target.files[0];
    let imgUrlList = [...imgList];
    if (event.target.files.length !== 0) {
      imgUrlList[index] = URL.createObjectURL(file);
    }
    setImgList(imgUrlList);
    console.log(imgList, index);
  };

  const onLoadImg = () => {};

  return (
    <Grid container direction="row">
      <Grid item>
        <div>사진/영상</div>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          {imgIdx.map((id, index) => (
            <Grid item key={index}>
              <input
                type="file"
                accept="image/*"
                ref={selectUserImg}
                style={{ display: "none" }}
                id={index}
                onChange={(event) => handleClickInput(event, index)}
              />
              <button
                onClick={() => selectUserImg.current.click()}
                style={{ width: 200, height: 200 }}
                className={id}
              >
                <img
                  src={userImageInput}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleImg;
