import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import theme from "components/common/theme";
import { ThemeProvider } from "@emotion/react";
function ArticleOpen({boardInfo, setBoardInfo}) {
  const privateYN = boardInfo.privateYN
  const handleChange  = (event) => {
    setBoardInfo({...boardInfo, privateYN: event.target.value})
  }
  return (
    <Grid container direction="row" className="create-feed__inner-wrapper">
      <Grid container>
        <div className="create-feed__label">공개 여부</div>
        <ThemeProvider theme={theme}>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={privateYN}
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel value="false" control={<Radio />} label="공개" />
            <FormControlLabel
              value="true"
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
