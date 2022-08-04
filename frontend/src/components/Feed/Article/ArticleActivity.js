import { Grid } from "@mui/material";


function ArticleActivity(props) {
  return (
    <Grid className="activity" container>
      <Grid item>
        username님 외 6명이 좋아합니다.
      </Grid>
      <Grid item>
        <p>댓글 4개</p>
      </Grid>
    </Grid>
  )
}

export default ArticleActivity;