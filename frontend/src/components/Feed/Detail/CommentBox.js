import { Grid } from "@mui/material";
import userImage from "assets/images/userImage.png";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useState } from "react";

function CommentBox({ handleCommentRegister }) {
  const [comment, setComment] = useState("");
  return (
    <Grid className="comment-box" container justifyContent="space-between">
      <Grid className="comment-box__info" item>
        <img
          className="comment-box__info__image"
          src={userImage}
          alt="user_image"
        />
      </Grid>
      <Grid item className="comment-box__field">
        <GrTextField
          className="comment-box__field__input"
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
