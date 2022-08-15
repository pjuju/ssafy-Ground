import theme from "components/common/theme.js";

import { Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ThemeProvider } from "@emotion/react";
import { likeBoard, unlikeBoard } from "api/board";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ArticleActivity(props) {
  const navigate = useNavigate();
  const { nickname, id, isLiked, setIsLiked, likeCnt, commentCnt } = props;

  // isLiked가 바뀔 때마다 리렌더링
  useEffect(() => {}, [isLiked]);

  const handleClickLike = () => {
    // 좋아요 요청
    likeBoard(id, (res) => {
      setIsLiked(() => true);
      console.log(res);
    });
  };

  const handleClickUnlike = () => {
    // 좋아요 취소 요청
    unlikeBoard(id, (res) => {
      setIsLiked(() => false);
      console.log(res);
    });
  };

  const handleClickMore = () => {
    navigate(`/feed/detail/${id}`);
  };

  return (
    <Grid className="activity" container>
      {isLiked ? (
        <Grid className="activity__like" item>
          <ThemeProvider theme={theme}>
            <IconButton color="like" onClick={() => handleClickUnlike()}>
              <FavoriteIcon />
            </IconButton>
          </ThemeProvider>
          <span>
            <span className="bold">{nickname}님</span> 외{" "}
            <span className="bold">{likeCnt}명</span>이 좋아합니다.
          </span>
        </Grid>
      ) : (
        <Grid className="activity__like" item>
          <IconButton onClick={() => handleClickLike()}>
            <FavoriteBorderIcon />
          </IconButton>
          <span>
            <span className="bold">{likeCnt}명</span>이 좋아합니다.
          </span>
        </Grid>
      )}
      <Grid className="activity_comment" item>
        <IconButton onClick={handleClickMore}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        댓글 <span className="bold">{commentCnt}개</span>
      </Grid>
    </Grid>
  );
}

export default ArticleActivity;
