import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";

import ArticleContent from "components/Feed/Article/ArticleContent";
import ArticleInfo from "components/Feed/Article/ArticleInfo";
import ArticleMore from "components/Feed/Article/ArticleMore";

function ArticleDetailContent({ articleData }) {
  const id = articleData.id;
  const user = articleData.user;
  const category = articleData.category;
  const date = articleData.regDttm;
  const content = articleData.content;
  const location = articleData.location;
  const saveCnt = articleData.saveCnt;
  const isSaved = false;

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid className="article__inner__userimg">
        <img src={userImage} alt="user_img" />
      </Grid>
      <Grid className="article__inner__left">
        <ArticleInfo nickname={user.nickname} category={category} date={date} />
        <ArticleContent id={id} content={content} location={location} />
      </Grid>
      <Grid className="article__inner_right">
        <ArticleMore id={id} isSaved={isSaved} saveCnt={saveCnt} />
      </Grid>
    </Grid>
  );
}

export default ArticleDetailContent;
