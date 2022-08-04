import { Grid } from "@mui/material";

function ArticleContent(props) {
  return (
    <Grid className="article-content">
      <Grid className="article-content__text">
        본문 내용
      </Grid>
      <Grid className="article-content__media">
        사진, 동영상
      </Grid>
      <Grid className="article-content__area">
        지역
      </Grid>
    </Grid>
  )
}

export default ArticleContent;