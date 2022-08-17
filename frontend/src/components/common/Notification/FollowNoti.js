import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FollowNoti({ id, idx, nickname, isChecked, fromUserId, handleClickDelete }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-follow:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  const handleClickAccount = (userId) => {
    navigate(`/profile/${userId}`);
    console.log(userId + "의 프로필로 이동");
  }


  return (
    <Grid className="noti-follow" container direction="row" onClick={() => handleClickAccount(fromUserId)}>
      <Grid className="noti-follow__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-follow__text" onClick={() => handleClickAccount(fromUserId)}>
        <span className="bold">{nickname}님</span>이 팔로우 요청을 수락했습니다.
      </Grid>
      <Grid className="noti-follow__delete" container direction="row">
        <IconButton onClick={() => handleClickDelete(id)}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default FollowNoti;
