import { Grid, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function ArticleDetailComment() {
  return (
    <Grid className="activity_comment" item>
      <IconButton>
        <ChatBubbleOutlineIcon />
      </IconButton>
      댓글 <span className="bold">0개</span>
    </Grid>
  );
}

export default ArticleDetailComment;
