import { Grid } from "@mui/material";
import userImg from "assets/images/userImage.png";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";

function CommentBox({ handleCommentRegister, userImage }) {
  const [comment, setComment] = useState("");
  const [commentImg, setCommentImg] = useState("");

  useEffect(() => {
    fetchImage();
  }, [userImage]);

  const fetchImage = () => {
    const storageRef = ref(storage, `images/${userImage}`);

    if (userImage !== undefined && userImage !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download user");
        setCommentImg(url);
      });
    }
  };

  return (
    <Grid className="comment-box" container justifyContent="space-between">
      <Grid className="comment-box__info" item>
        <img
          className="comment-box__info__image"
          src={commentImg || userImg}
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
