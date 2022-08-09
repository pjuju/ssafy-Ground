import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { deleteAccountNoti } from "api/notification";

function FollowNoti({ id, idx, nickname, isChecked }) {
  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-follow:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  const handleClickDelete = () => {
    // 서버에 알림 삭제를 요청하기
    deleteAccountNoti(id, (res) => {
      console.log("계정" + id + " 삭제");
    });
  };

  return (
    <Grid className="noti-follow" container direction="row">
      <Grid className="noti-follow__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-follow__text">
        <span className="bold">{nickname}님</span>이 회원님을 팔로우하기
        시작했습니다.
      </Grid>
      <Grid className="noti-follow__delete" container direction="row">
        <IconButton onClick={handleClickDelete}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default FollowNoti;
