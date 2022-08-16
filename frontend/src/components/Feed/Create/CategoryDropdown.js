import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid, FormHelperText } from "@mui/material";
import theme from "components/common/theme";
import { ThemeProvider } from "@emotion/react";


function CategoryDropdown({boardInfo, setBoardInfo, isCategoryError}) {
  const categoryId = boardInfo.categoryId
  const handleChange = (event) => {
    setBoardInfo({...boardInfo, categoryId: event.target.value})
  };
  const categoryList = [
    { id: 1, value: "헬스", checked: false },
    { id: 2, value: "요가", checked: false },
    { id: 3, value: "필라테스", checked: false },
    { id: 4, value: "러닝", checked: false },
    { id: 5, value: "홈트레이닝", checked: false },
    { id: 6, value: "축구", checked: false },
    { id: 7, value: "야구", checked: false },
    { id: 8, value: "농구", checked: false },
    { id: 9, value: "테니스", checked: false },
    { id: 10, value: "배드민턴", checked: false },
    { id: 11, value: "등산", checked: false },
    { id: 12, value: "수영", checked: false },
    { id: 13, value: "골프", checked: false },
    { id: 14, value: "볼링", checked: false },
    { id: 15, value: "자전거/사이클", checked: false },
    { id: 16, value: "기타", checked: false },
  ];
  return (
    <Grid container direction="row" className="create-feed__inner-wrapper">
      <Grid container>
        <div className="create-feed__label">카테고리</div>
        <ThemeProvider theme={theme}>
          <FormControl className="create-feed__dropdown" size="small" error={isCategoryError}>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId|| ''}
              label="category"
              onChange={handleChange}
            >
              {categoryList.map((category, index) => (
                <MenuItem value={category.id} key={index}>{category.value}</MenuItem>
              ))}
            </Select>
            {isCategoryError && (
              <FormHelperText error>카테고리를 입력해주세요</FormHelperText>
            )}
          </FormControl>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default CategoryDropdown;
