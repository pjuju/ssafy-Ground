import userImageInput from "assets/images/userImageInput.png";
import GrButton from "components/common/GrButton";

import { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";

function InitImg({ onSetImgFile, onSetImg, onSetInitFlag }) {
  const selectUserImg = useRef("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    preview();
  });

  /* 이미지를 첨부했을 때 프리뷰로 해당 이미지 미리보기 */
  const preview = () => {
    if (profileImg === "") return false;

    const imgElement = document.querySelector(
      ".initial-settings__img__input-button > img"
    );
    if (imgElement !== null) {
      imgElement.src = profileImg;
    }
  };

  /* 이미지 첨부 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickInput = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const randNum = parseInt((new Date().getTime() + Math.random())*100);
    onSetImg(randNum.toString())
    onSetImgFile(file)
    setProfileImg(URL.createObjectURL(file));

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
          variant={profileImg === "" ? "outlined" : "contained"}
          children={profileImg === "" ? "건너뛰기" : "다음"}
          onClick={handleClickSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default InitImg;
