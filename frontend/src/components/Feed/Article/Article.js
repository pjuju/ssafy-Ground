import userImage from "assets/images/userImage.png";

import { Box, Grid } from "@mui/material";
import ArticleActivity from "./ArticleActivity";
import ArticleContent from "./ArticleContent";
import ArticleInfo from "./ArticleInfo";
import ArticleMore from "./ArticleMore";

function Article(props) {
  const userImg = props.articleData.userImg;
  const userName = props.articleData.userName;
  const category = props.articleData.category;
  const date = props.articleData.date;
  const text = props.articleData.text;
  const location = props.articleData.location;
  const isLiked = props.articleData.isLiked;
  const likeCnt = props.articleData.likeCnt;
  const commentCnt = props.articleData.commentCnt;
  const isSaved = props.articleData.isSaved;
  const saveCnt = props.articleData.saveCnt;

  return (
    <Box className="article">
      <Grid className="article__inner" container direction="row">
        <Grid className="article__inner__userimg">
          <img src={userImage} />
        </Grid>
        <Grid className="article__inner__left">
          <ArticleInfo userName={userName} category={category} date={date} />
          <ArticleContent text={text} location={location} />
          <ArticleActivity
            isLiked={isLiked}
            likeCnt={likeCnt}
            commentCnt={commentCnt}
          />
        </Grid>
        <Grid className="article__inner_right">
          <ArticleMore isSaved={isSaved} saveCnt={saveCnt} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Article;
