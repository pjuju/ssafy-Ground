import userImage from "assets/images/userImage.png";

import ClearIcon from "@mui/icons-material/Clear";
import { Grid, IconButton } from "@mui/material";
import { useEffect } from "react";
import { deleteBoardNoti } from "api/notification";

function LikeNoti({ id, idx, nickname, isChecked }) {
  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-like:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  const handleClickDelete = () => {
    // 서버에 알림 삭제를 요청하기
    deleteBoardNoti(id, (res) => {
      console.log("활동" + id + " 삭제");
    });
  };

  return (
    <Grid className="noti-like" container direction="row">
      <Grid className="noti-like__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-like__text">
        <span className="bold">{nickname}님</span>이 회원님의 게시글을
        좋아합니다.
      </Grid>
      <Grid className="noti-like__delete" container direction="row">
        <IconButton onClick={handleClickDelete}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default LikeNoti;
