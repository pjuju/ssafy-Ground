import userImage from "assets/images/userImage.png";

import ClearIcon from "@mui/icons-material/Clear";
import { Grid, IconButton } from "@mui/material";
import { useEffect } from "react";
import { deleteBoardNoti } from "api/notification";
import { useNavigate } from "react-router-dom";

function LikeNoti({ id, idx, nickname, isChecked, boardId, handleClickDelete }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked) {
      const element = document.querySelector(
        `.noti-like:nth-child(${idx + 1})`
      );
      element.classList.add("checked");
    }
  });

  const handleClickActivity = (boardId) => {
    navigate(`/feed/detail/${boardId}`);
    console.log(boardId + "의 게시글로 이동");
  }

  return (
    <Grid className="noti-like" container direction="row" onClick={() => handleClickActivity(boardId)}>
      <Grid className="noti-like__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-like__text" onClick={() => handleClickActivity(boardId)}>
        <span className="bold">{nickname}님</span>이 회원님의 게시글을
        좋아합니다.
      </Grid>
      <Grid className="noti-like__delete" container direction="row">
        <IconButton onClick={() => handleClickDelete(id)}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default LikeNoti;
