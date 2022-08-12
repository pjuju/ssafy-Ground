import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import theme from "components/common/theme";
import { ThemeProvider } from "@emotion/react";

function RegionDropdown({ boardInfo, setBoardInfo }) {
  const locationId = boardInfo.locationId
  const handleChange = (event) => {
    setBoardInfo({...boardInfo, locationId: event.target.value})
  };
  const regionList = [
    "서울",
    "경기",
    "인천",
    "강원",
    "충북",
    "세종",
    "대전",
    "충남",
    "경북",
    "대구",
    "울산",
    "경남",
    "부산",
    "광주",
    "전남",
    "제주",
  ];
  return (
    <Grid container direction="row" className="create-feed__inner-wrapper">
      <Grid container>
        <div className="create-feed__label">지역</div>
        <ThemeProvider theme={theme}>
          <FormControl className="create-feed__dropdown" size="small">
            <InputLabel id="demo-simple-select-label">지역</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={locationId|| ''}
              label="region"
              onChange={handleChange}
            >
              {regionList.map((category, index) => (
                <MenuItem value={index + 1} key={index}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default RegionDropdown;
