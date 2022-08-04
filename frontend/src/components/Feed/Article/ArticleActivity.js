import { Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function ArticleActivity(props) {
  const userName = "username";

  return (
    <Grid className="activity" container>
      {props.isLiked ? (
        <Grid className="activity__like" item>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <span>
            <span className="bold">{userName}님</span> 외{" "}
            <span className="bold">{props.likeCnt}명</span>이 좋아합니다.
          </span>
        </Grid>
      ) : (
        <Grid className="activity__like" item>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <span>
            <span className="bold">{props.likeCnt}명</span>이 좋아합니다.
          </span>
        </Grid>
      )}
      <Grid className="activity_comment" item>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        댓글 <span className="bold">{props.commentCnt}개</span>
      </Grid>
    </Grid>
  );
}

export default ArticleActivity;
