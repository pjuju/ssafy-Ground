import { useState } from "react";
import { Grid } from "@mui/material";

function ArticleText({boardInfo, setBoardInfo}) {
  const [textLength, setTextLength] = useState(0);
  const textContent = boardInfo.content
  const handleTextArea = (event) => {
    setTextLength(event.target.value.length);
    setBoardInfo({...boardInfo, content: event.target.value })
  };
  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
        <textarea
          label="오늘은 어떤 운동을 하셨나요?"
          className="create-feed__textarea"
          rows="10"
          cols="40"
          value={textContent|| ''}
          onChange={handleTextArea}
        />
      </Grid>
      <Grid container justifyContent="right" className="create-feed__length-wrapper">
        <div>{textLength}/1,000자</div>
      </Grid>
    </Grid>
  );
}

export default ArticleText;
