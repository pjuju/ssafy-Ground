import React from "react";
import GrTextField from "components/common/GrTextField";
import { Grid } from "@mui/material";
import { Input } from "@mui/material";

function ArticleText() {
  const [textLength, setTextLength] = React.useState(0);
  const handleTextLength = (event) => {
    setTextLength(event.target.value.length);
  };
  return (
    <Grid container direction="row">
      <textarea
        label="오늘은 어떤 운동을 하셨나요?"
        rows="10"
        cols="40"
        onChange={handleTextLength}
      />
      <div>{textLength}/1,000자</div>
    </Grid>
  );
}

export default ArticleText;
