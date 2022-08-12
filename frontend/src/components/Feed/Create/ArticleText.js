import { useState } from "react";
import { Grid } from "@mui/material";

function ArticleText({feedContent, onSetFeedContent}) {
  const [textLength, setTextLength] = useState(0);
  const handleTextLength = (event) => {
    setTextLength(event.target.value.length);
    onSetFeedContent(event.target.value)
  };
  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
        <textarea
          label="오늘은 어떤 운동을 하셨나요?"
          className="create-feed__textarea"
          rows="10"
          cols="40"
          value={feedContent|| ''}
          onChange={handleTextLength}
        />
      </Grid>
      <Grid container justifyContent="right" className="create-feed__length-wrapper">
        <div>{textLength}/1,000자</div>
      </Grid>
    </Grid>
  );
}

export default ArticleText;
