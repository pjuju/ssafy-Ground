import GrButton from "../GrButton";
import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FollowRequestNoti({
  id,
  idx,
  nickname,
  isChecked,
  fromUserId,
  handleClickReject,
  handleClickAccept,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(`.noti-fr:nth-child(${idx + 1})`);
      element.classList.add("checked");
    }
  });

  const handleClickAccount = (userId) => {
    navigate(`/profile/${userId}`);
  }

  return (
    <Grid className="noti-fr" container direction="row" onClick={() => handleClickAccount(fromUserId)}>
      <Grid className="noti-fr__top" container>
        <Grid className="noti-fr__top__img">
          <img src={userImage} />
        </Grid>
        <Grid className="noti-fr__top__text" onClick={() => handleClickAccount(fromUserId)}>
          <p>
            <span className="bold">{nickname}님</span>이 회원님이 팔로우를
            요청했습니다.
          </p>
        </Grid>
      </Grid>
      <Grid className="noti-fr__button">
        <GrButton
          className="noti-fr__button--reject"
          variant="outlined"
          children="거절"
          onClick={() => handleClickReject(id, nickname)}
        />
        <GrButton
          className="noti-fr__button--accept"
          variant="contained"
          children="수락"
          onClick={() => handleClickAccept(id, nickname)}
        />
      </Grid>
    </Grid>
  );
}

export default FollowRequestNoti;
