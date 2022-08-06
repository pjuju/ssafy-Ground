import userImage from "assets/images/userImage.png";

import { Box, Grid } from "@mui/material";
import ArticleActivity from "./ArticleActivity";
import ArticleContent from "./ArticleContent";
import ArticleInfo from "./ArticleInfo";
import ArticleMore from "./ArticleMore";
import { useEffect } from "react";

function Article({ articleData }) {
  const id = articleData.id;
  const user = articleData.user;
  const category = articleData.category;
  const date = articleData.regDttm;
  const content = articleData.content;
  const location = articleData.location;
  const likeCnt = articleData.likeCnt;
  const commentCnt = articleData.commentCnt;
  const saveCnt = articleData.saveCnt;
  const isLiked = false;
  const isSaved = false;

  useEffect(() => {
    // console.log(articleData);
  });

  return (
    <Box className="article">
      <Grid className="article__inner" container direction="row">
        <Grid className="article__inner__userimg">
          <img src={userImage} />
        </Grid>
        <Grid className="article__inner__left">
          <ArticleInfo
            nickname={user.nickname}
            category={category}
            date={date}
          />
          <ArticleContent id={id} content={content} location={location} />
          <ArticleActivity
            id={id}
            nickname={user.nickname}
            isLiked={isLiked}
            likeCnt={likeCnt}
            commentCnt={commentCnt}
          />
        </Grid>
        <Grid className="article__inner_right">
          <ArticleMore id={id} isSaved={isSaved} saveCnt={saveCnt} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Article;
