import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import { deleteBoardNoti } from "api/notification";
import { useNavigate } from "react-router-dom";

function CommentNoti({ id, idx, nickname, isChecked, boardId, handleClickDelete }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-comment:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  const handleClickActivity = (boardId) => {
    navigate(`/feed/detail/${boardId}`);
    console.log(boardId + "의 게시글로 이동");
  }

  return (
    <Grid className="noti-comment" container direction="row" onClick={() => handleClickActivity(boardId)}>
      <Grid className="noti-comment__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-comment__text" onClick={() => handleClickActivity(boardId)}>
        <span className="bold">{nickname}님</span>이 회원님의 게시글에 댓글을
        작성했습니다.
      </Grid>
      <Grid className="noti-comment__delete" container direction="row">
        <IconButton onClick={() => handleClickDelete(id)}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CommentNoti;
