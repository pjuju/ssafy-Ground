import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import theme from "components/common/theme";
import { ThemeProvider } from "@emotion/react";
function ArticleOpen() {
  return (
    <Grid container direction="row" className="create-feed__inner-wrapper">
      <Grid container>
        <div className="create-feed__label">공개 여부</div>
        <ThemeProvider theme={theme}>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="공개"
            name="radio-buttons-group"
          >
            <FormControlLabel value="공개" control={<Radio />} label="공개" />
            <FormControlLabel
              value="비공개"
              control={<Radio />}
              label="비공개"
            />
          </RadioGroup>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default ArticleOpen;
