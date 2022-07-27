import logo from "assets/images/text_logo.png";
import userImageInput from "assets/images/userImageInput.png";
import "styles/Welcome/WelcomePage.scss";
import theme from "components/common/theme.js";

import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

function WelcomePage() {
  const [userImg, setUserImg] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [userInterest, setUserInterest] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [interestCnt, setInterestCnt] = useState(0);

  const [isSetImg, setIsSetImg] = useState(false);
  const [isSetDesc, setIsSetDesc] = useState(false);
  const [isSetInterest, setIsSetInterest] = useState(false);

  const selectUserImg = useRef("");

  const sports = [
    { id: 1, value: 'health', text: '헬스' },
    { id: 2, value: 'yoga', text: '요가' },
    { id: 3, value: 'pilates', text: '필라테스' },
    { id: 4, value: 'running', text: '러닝' },
    { id: 5, value: 'hometraining', text: '홈트레이닝' },
    { id: 6, value: 'soccer', text: '축구' },
    { id: 7, value: 'baseball', text: '야구' },
    { id: 8, value: 'basketball', text: '농구' },
    { id: 9, value: 'tennis', text: '테니스' },
    { id: 10, value: 'badminton', text: '배드민턴' },
    { id: 11, value: 'climing', text: '등산' },
    { id: 12, value: 'swim', text: '수영' },
    { id: 13, value: 'golf', text: '골프' },
    { id: 14, value: 'bowling', text: '볼링' },
    { id: 15, value: 'cycling', text: '자전거/사이클' },
    { id: 16, value: 'others', text: '기타' },
  ]

  useEffect(() => {
    preview();

    return () => preview();
  })

  /* 이미지를 첨부했을 때 프리뷰로 해당 이미지 미리보기 */
  const preview = () => {
    if (userImg === "") return false;

    const imgElement = document.querySelector('.initial-settings__img__input-button > img');
    if (imgElement !== null) {
      imgElement.src = userImg;
    }
  }

  /* 이미지 첨부 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    // console.log(file);
    setUserImg(URL.createObjectURL(file));
  };

  const handleChangeDesc = (event) => {
    setUserDesc(event.target.value);
  }

  /* 관심 운동 종목 설정에서 체크박스가 바뀔 때 호출되는 핸들러 */
  const handleChangeInterest = (id) => {
    userInterest[id - 1] = !userInterest[id - 1];
    if (userInterest[id - 1] === false) {
      setInterestCnt(() => interestCnt - 1);
    } else {
      setInterestCnt(() => interestCnt + 1);
    }
  }

  /* 건너뛰기 혹은 다음 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickSubmit = (type) => {
    if (type === "img") {
      setIsSetImg(true);
      if (userImg === "") {
        console.log("건너뛰기");
      } else {
        console.log(userImg);
      }
    } else if (type === "desc") {
      setIsSetDesc(true);
      if (userDesc === "") {
        console.log("건너뛰기");
      } else {
        console.log(userDesc);
      }
    } else {
      setIsSetInterest(true);
      if (interestCnt === 0) {
        console.log("건너뛰기");
      } else {
        console.log(userInterest);
      }
    }
  }

  /* 마지막 '다음' 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickComplete = () => {
    console.log('완료');
    // 현재까지 저장된 설정에 대해 서버에 저장을 요청한다.
    // 1. 이미지 파일에 대한 처리
    // const formData = new FormData();
    // formData.append('file', userImg);

    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // }

    // axios.post('/', formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
  }

  return (
    <Grid
      className="initial-settings"
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <img className="logo" src={logo} alt="text_logo" width="300px" />
      <Grid item>
        {isSetImg === false &&
          <Grid className="initial-settings__img" container direction="column">
            <Grid item>
              <h3 className="initial-settings__img__title">
                자신을 나타낼 사진을 선택해 주세요!
              </h3>
            </Grid>
            <Grid item>
              <input className="initial-settings__img__input" ref={selectUserImg} type="file" accept="image/*" onChange={handleClickInput} />
              <button className="initial-settings__img__input-button" onClick={() => selectUserImg.current.click()}>
                <img src={userImageInput} alt="img-input" />
              </button>
            </Grid>
            <Grid className="initial-settings__img__submit-button" item>
              <ThemeProvider theme={theme} >
                <Button
                  variant={userImg === "" ? "outlined" : "contained"}
                  onClick={() => handleClickSubmit('img')}>
                  {userImg === "" ? "건너뛰기" : "다음"}
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        }
        {
          isSetImg === true && isSetDesc === false &&
          <Grid className="initial-settings__desc" container direction="column">
            <Grid item>
              <h3 className="initial-settings__desc__title">
                자신을 한마디로 소개해 보세요!
              </h3>
            </Grid>
            <Grid className="initial-settings__desc__input" item>
              <ThemeProvider theme={theme} >
                <TextField
                  className="initial-settings__desc__input__textfield"
                  variant="outlined"
                  label="한줄 소개"
                  onChange={handleChangeDesc} />
              </ThemeProvider>
            </Grid>
            <Grid className="initial-settings__desc__submit-button" item>
              <ThemeProvider theme={theme} >
                <Button
                  variant={userDesc === "" ? "outlined" : "contained"}
                  onClick={() => handleClickSubmit('desc')}>
                  {userDesc === "" ? "건너뛰기" : "다음"}
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        }
        {
          isSetImg === true && isSetDesc === true && isSetInterest === false &&
          <Grid className="initial-settings__interest" container direction="column">
            <Grid item>
              <h3 className="initial-settings__interest__title">
                지금 하고 있거나, 평소에 관심 있는 운동 종목을 골라주세요!
              </h3>
            </Grid>
            <Grid className="initial-settings__interest__checkbox" item>
              <ThemeProvider theme={theme} >
                {
                  sports.map((sport, index) =>
                    <FormControlLabel
                      className="initial-settings__interest__checkbox__box"
                      key={sport.id}
                      label={sport.text}
                      value={sport.value}
                      control={<Checkbox onChange={() => handleChangeInterest(sport.id)} />} />
                  )
                }
              </ThemeProvider>
            </Grid>
            <Grid className="initial-settings__desc__submit-button" item>
              <ThemeProvider theme={theme} >
                <Button
                  variant={interestCnt === 0 ? "outlined" : "contained"}
                  onClick={() => handleClickSubmit('interest')}>
                  {interestCnt === 0 ? "건너뛰기" : "다음"}
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        }
        {
          isSetImg === true && isSetDesc === true && isSetInterest === true &&
          <Grid className="initial-settings__complete" container direction="column">
            <Divider className="initial-settings__complete__divider" />
            <Grid item>
              <h3 className="initial-settings__complete__title">
                <span>반갑습니다. username님</span>
                <br />
                <span>이제 GROUND를 이용할 준비가 완료되었습니다!</span>
              </h3>
            </Grid>
            <Divider className="initial-settings__complete__divider" />
            <Grid className="initial-settings__complete__submit-button" item>
              <ThemeProvider theme={theme} >
                <Button
                  variant="contained"
                  onClick={handleClickComplete}>
                  시작하기
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid >
  );
}

export default WelcomePage;