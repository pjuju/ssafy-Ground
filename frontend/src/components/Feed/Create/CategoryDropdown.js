import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import theme from "components/common/theme";
import { ThemeProvider } from "@emotion/react";

function CategoryDropdown({feedCategoryId, onSetFeedCategoryId}) {
  const handleChange = (event) => {
    onSetFeedCategoryId(event.target.value);
  };
  const categoryList = [
    "헬스",
    "요가",
    "필라테스",
    "러닝",
    "홈트레이닝",
    "축구",
    "야구",
    "농구",
    "테니스",
    "배드민턴",
    "등산",
    "수영",
    "골프",
    "볼링",
    "자전거/사이클",
    "기타",
  ];
  return (
    <Grid container direction="row" className="create-feed__inner-wrapper">
      <Grid container>
        <div className="create-feed__label">카테고리</div>
        <ThemeProvider theme={theme}>
          <FormControl className="create-feed__dropdown" size="small">
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={feedCategoryId}
              label="category"
              onChange={handleChange}
            >
              {categoryList.map((category, index) => (
                <MenuItem value={index+1} key={index}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default CategoryDropdown;
