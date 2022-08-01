import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { ArrowBack } from "@material-ui/icons";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import ArticleBox from "components/Feed/ArticleBox";

function CreateFeedPage () {
  return (
    <Container maxwidth="xs" fixed>
      <Grid
        container
        direction="column"
      >
        <Grid
          container
          direction="row"
        >
         <ArrowBack />
         <div> 글 작성 </div> 
        </Grid>
        <Grid
          container
          direction="row"
        >
          <GrButton>취소</GrButton>
          <GrButton>작성</GrButton>
        </Grid>
        <ArticleBox />
      </Grid>
    </Container>
  )
}

export default CreateFeedPage;