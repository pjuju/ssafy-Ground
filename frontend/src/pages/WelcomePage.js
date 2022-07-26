import logo from "assets/images/text_logo.png";
import userImageInput from "assets/images/userImageInput.png";
import "styles/Welcome/WelcomePage.scss";
import theme from "components/common/theme.js";

import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function WelcomePage() {
  const [userImg, setUserImg] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [userInterest, setUserInterest] = useState([]);

  const [isSetImg, setIsSetImg] = useState(false);
  const [isSetDesc, setIsSetDesc] = useState(false);
  const [isSetInterest, setIsSetInterest] = useState(false);

  const handleImgButton = () => {
    if(userImg === "") {
      console.log("건너뛰기");
    } else {
      console.log("다음");
    }
  }

  return (
    <Grid
      className="user-settings"
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <img className="logo" src={logo} alt="text_logo" width="300px" />
      <Grid item>
      { isSetImg === false && 
        <Grid className="user-settings__user-img" container direction="column">
          <Grid item>
            <h3 className="user-settings__user-img--title">
              자신을 나타낼 사진을 선택해 주세요!
            </h3>
          </Grid>
          <Grid item>
            <img className="user-settings__user-img--input" src={userImageInput} alt="user-img-input" />
          </Grid>
            <ThemeProvider theme={theme} >
              <Button
                className="user-settings__user-img--input"
                variant={userImg === "" ? "outlined" : "contained"}
                onClick={handleImgButton}>
                {userImg === "" ? "건너뛰기" : "다음"}
              </Button>
            </ThemeProvider>
          <Grid className="user-settings__uesr-img--button">
          </Grid>
        </Grid>
      }
    </Grid>
  </Grid>
  );
}

export default WelcomePage;