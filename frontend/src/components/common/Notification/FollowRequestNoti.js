import GrButton from "../GrButton";
import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";

function FollowRequestNoti({ from }) {
  const handleClickReject = () => {
    console.log("거절");
    // 서버에 팔로우 거절 요청
  };

  const handleClickAccept = () => {
    console.log("수락");
    // 서버에 팔로우 수락 요청
  };

  return (
    <Grid className="noti-fr" container direction="row">
      <Grid className="noti-fr__top" container>
        <Grid className="noti-fr__top__img">
          <img src={userImage} />
        </Grid>
        <Grid className="noti-fr__top__text">
          <span className="bold">{from}님</span>님이 회원님이 팔로우를
          요청했습니다.
        </Grid>
      </Grid>
      <Grid className="noti-fr__button">
        <GrButton
          className="noti-fr__button--reject"
          variant="outlined"
          children="거절"
          onClick={handleClickReject}
        />
        <GrButton
          className="noti-fr__button--accept"
          variant="contained"
          children="수락"
          onClick={handleClickAccept}
        />
      </Grid>
    </Grid>
  );
}

export default FollowRequestNoti;
