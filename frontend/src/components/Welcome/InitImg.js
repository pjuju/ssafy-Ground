import userImageInput from "assets/images/userImageInput.png";
import GrButton from "components/common/GrButton";

import { useEffect, useRef } from "react";
import { Grid } from "@mui/material";

function InitImg({ img, onSetImg, onSetInitFlag }) {
  const selectUserImg = useRef("");

  useEffect(() => {
    preview();
  });

  /* 이미지를 첨부했을 때 프리뷰로 해당 이미지 미리보기 */
  const preview = () => {
    if (img === "") return false;

    const imgElement = document.querySelector(
      ".initial-settings__img__input-button > img"
    );
    if (imgElement !== null) {
      imgElement.src = img;
    }
  };

  /* 이미지 첨부 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    onSetImg(URL.createObjectURL(file));
  };

  /* 건너뛰기 혹은 다음 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickSubmit = () => {
    console.log("클릭");
    onSetInitFlag(1);
  };

  return (
    <Grid className="initial-settings__img" container direction="column">
      <Grid item>
        <h3 className="initial-settings__img__title">
          자신을 나타낼 사진을 선택해 주세요!
        </h3>
      </Grid>
      <Grid item>
        <input
          className="initial-settings__img__input"
          ref={selectUserImg}
          type="file"
          accept="image/*"
          onChange={handleClickInput}
        />
        <button
          className="initial-settings__img__input-button"
          onClick={() => selectUserImg.current.click()}
        >
          <img src={userImageInput} alt="img-input" />
        </button>
      </Grid>
      <Grid className="initial-settings__img__submit-button" item>
        <GrButton
          variant={img === "" ? "outlined" : "contained"}
          children={img === "" ? "건너뛰기" : "다음"}
          onClick={handleClickSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default InitImg;
