import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
function ArticleOpen() {
  return (
    <Grid container direction="row">
      <Grid item>
        <div>공개 여부</div>
      </Grid>
      <Grid item>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="공개"
          name="radio-buttons-group"
        >
          <FormControlLabel value="공개" control={<Radio />} label="공개" />
          <FormControlLabel value="비공개" control={<Radio />} label="비공개" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default ArticleOpen;
