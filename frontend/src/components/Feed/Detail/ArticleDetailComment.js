import { Grid, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comment from "./Comment";
import { useState } from "react";

function ArticleDetailComment({ commentCnt, commentList }) {
  const [comments, setComments] = useState([commentList]);

  return (
    <Grid className="activity_comment" container>
      <IconButton>
        <ChatBubbleOutlineIcon />
      </IconButton>
      댓글 <span className="bold">{commentCnt}개</span>
      {commentList.map((comment, index) => (<Comment key={index} comment={comment} />))}
    </Grid>
  );
}

export default ArticleDetailComment;
