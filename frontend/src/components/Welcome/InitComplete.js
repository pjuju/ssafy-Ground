import GrButton from "components/common/GrButton";

import { useEffect, useState } from "react";
import { Grid, Divider } from "@mui/material";
import axios from "axios";
import { getUserInfo } from "api/user";

function InitComplete({ img, desc, interest, onSetInitFlag, submitUserDetail }) {
  const [userName, setUserName] = useState("username");

  useEffect(() => {
    getUserInfo(res => setUserName(res.data.nickname));
    console.log(userName);
  })
  /* 이전 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickPrevious = () => {
    onSetInitFlag(2);
  };

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

    submitUserDetail();
  };

  return (
    <Grid className="initial-settings__complete" container direction="column">
      <Divider className="initial-settings__complete__divider" />
      <Grid item>
        <h3 className="initial-settings__complete__title">
          <span>
            반갑습니다{" "}
            <span className="initial-settings__complete__username">
              {userName}
            </span>
            님
          </span>
          <br />
          <span>이제 GROUND를 이용할 준비가 완료되었습니다!</span>
        </h3>
      </Grid>
      <Divider className="initial-settings__complete__divider" />
      <Grid className="initial-settings__complete__button" item>
        <Grid className="initial-settings__complete__button--previous">
          <GrButton
            variant="outlined"
            children="이전"
            onClick={handleClickPrevious}
          />
        </Grid>
        <Grid className="initial-settings__complete__button--submit">
          <GrButton
            variant="contained"
            children="시작하기"
            onClick={handleClickComplete}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InitComplete;
