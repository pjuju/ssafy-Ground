import theme from "components/common/theme.js";

import { Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";

function ArticleActivity(props) {
  const [isLikeClicked, setIsLikeClicked] = useState(props.isLiked);

  const handleClickLike = () => {
    setIsLikeClicked(!isLikeClicked);

    // 좋아요 요청
    console.log("좋아요 요청");
  };

  const handleClickUnlike = () => {
    setIsLikeClicked(!isLikeClicked);

    // 좋아요 취소 요청
    console.log("좋아요 취소 요청");
  };

  return (
    <Grid className="activity" container>
      {isLikeClicked ? (
        <Grid className="activity__like" item>
          <ThemeProvider theme={theme}>
            <IconButton color="like" onClick={() => handleClickUnlike()}>
              <FavoriteIcon />
            </IconButton>
          </ThemeProvider>
          <span>
            <span className="bold">{props.nickname}님</span> 외{" "}
            <span className="bold">{props.likeCnt}명</span>이 좋아합니다.
          </span>
        </Grid>
      ) : (
        <Grid className="activity__like" item>
          <IconButton onClick={() => handleClickLike()}>
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
