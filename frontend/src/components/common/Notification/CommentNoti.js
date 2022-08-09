import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { deleteBoardNoti } from "api/notification";

function CommentNoti({ id, idx, nickname, isChecked, activityNotiList }) {
  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-comment:nth-child(${idx + 1})`
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
    <Grid className="noti-comment" container direction="row">
      <Grid className="noti-comment__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-comment__text">
        <span className="bold">{nickname}님</span>이 회원님의 게시글에 댓글을
        작성했습니다.
      </Grid>
      <Grid className="noti-comment__delete" container direction="row">
        <IconButton onClick={handleClickDelete}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CommentNoti;
