import { Grid, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comment from "./Comment";

function ArticleDetailComment({ commentCnt, comments }) {
  return (
    <Grid className="activity_comment" container>
      <IconButton>
        <ChatBubbleOutlineIcon />
      </IconButton>
      댓글 <span className="bold">{commentCnt}개</span>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Grid>
  );
}

export default ArticleDetailComment;
