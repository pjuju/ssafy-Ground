import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";

function FollowNoti({ id, idx, nickname, isChecked, handleClickDelete }) {
  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-follow:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  return (
    <Grid className="noti-follow" container direction="row">
      <Grid className="noti-follow__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-follow__text">
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
