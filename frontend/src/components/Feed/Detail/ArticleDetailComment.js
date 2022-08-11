import { Grid, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { getUserInfo } from "api/user";
import { deleteComment } from "api/comment";
import { useParams } from "react-router-dom";

function ArticleDetailComment({ comments }) {
  const { boardId } = useParams();
  const [userId, setUserId] = useState(0);

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId);
      window.location.replace(`/feed/detail/${boardId}`);
    }
  };

  const handleCommentEdit = (commentId) => {
    console.log("edit");
  };

  useEffect(() => {
    getUserInfo((res) => {
      setUserId(res.data.id);
    });
  }, []);

  return (
    <Grid className="activity_comment" container>
      <IconButton>
        <ChatBubbleOutlineIcon />
      </IconButton>
      댓글 <span className="bold">{comments.length}개</span>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          userId={userId}
          handleCommentEdit={handleCommentEdit}
          handleCommentDelete={handleCommentDelete}
        />
      ))}
    </Grid>
  );
}

export default ArticleDetailComment;
