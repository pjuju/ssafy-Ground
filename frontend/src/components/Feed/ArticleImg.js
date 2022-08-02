import React from "react";
import { Grid } from "@mui/material";
import userImageInput from "assets/images/userImageInput.png";
import { useEffect, useRef } from "react";

function ArticleImg() {
  const selectUserImg = useRef("");

  useEffect(() => {
    preview();
  });

  const preview = () => {
    if (img === "") return false;

    const imgElement = document.querySelector(
      ".initial-settings__img__input-button > img"
    );
    if (imgElement !== null) {
      imgElement.src = img;
    }
  };

  const handleClickInput = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImg(URL.createObjectURL(file));
  };
  const [img, setImg] = React.useState("");
  const imgIdx = ["img1", "img2", "img3", "img4", "img5"];
  const onLoadImg = () => {};

  return (
    <Grid container direction="row">
      <Grid item>
        <div>사진/영상</div>
      </Grid>
      <Grid item>
        <Grid item>
          <input
            type="file"
            accept="image/*"
            ref={selectUserImg}
            style={{ display: "none" }}
            onChange={handleClickInput}
            multiple
          />
          <button
            onClick={() => selectUserImg.current.click()}
            style={{ width: 200, height: 200 }}
            className="initial-settings__img__input-button"
          >
            <img src={userImageInput} alt="img-input" />
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleImg;
