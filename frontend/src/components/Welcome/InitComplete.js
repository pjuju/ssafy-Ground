import theme from "components/common/theme.js";

import { Button, Grid, Divider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

function InitComplete() {
  /* 마지막 '다음' 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickComplete = () => {
    console.log("완료");
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
  };

  return (
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
        <ThemeProvider theme={theme}>
          <Button variant="contained" onClick={handleClickComplete}>
            시작하기
          </Button>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default InitComplete;
