import { Grid } from "@mui/material";
import userImage from "assets/images/userImage.png";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useState } from "react";

function CommentBox({ handleCommentRegister }) {
  const [comment, setComment] = useState("");
  return (
    <Grid className="comment-box" container justifyContent="space-between">
      <Grid item xs={0.5} sm={0.8}>
        <img
          className="comment__info__image"
          src={userImage}
          alt="user_image"
        />
      </Grid>
      <Grid item xs={8} sm={9.5} md={9.5} lg={9.8}>
        <GrTextField
          className="comment-box__field"
          multiline
          rows={2}
          value={comment}
          placeholder="타인을 비방하는 댓글이나 욕설은 삭제될 수 있습니다."
          onChange={(e) => setComment(e.target.value)}
        />
      </Grid>
      <GrButton
        variant="contained"
        color="secondary"
        onClick={() => {
          handleCommentRegister(comment);
          setComment("");
        }}
      >
        작성
      </GrButton>
    </Grid>
  );
}

export default CommentBox;
