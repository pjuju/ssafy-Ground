import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function CommentNoti({ from }) {
  const handleClickDelete = () => {
    console.log("알림 삭제");
    // 상위 컴포넌트에서 prop으로 id 값을 받아오고, 그 값을 서버에 삭제하도록 요청하기
  };

  return (
    <Grid className="noti-comment" container direction="row">
      <Grid className="noti-comment__img">
        <img src={userImage} />
      </Grid>
      <Grid className="noti-comment__text">
        <span className="bold">{from}님</span>이 회원님의 게시글에 댓글을
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
