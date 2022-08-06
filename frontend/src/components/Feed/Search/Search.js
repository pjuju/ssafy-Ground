import {
  Grid,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  MenuItem,
} from "@mui/material";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./Filter/FilterModal";
import SearchBar from "./SearchBar";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import StartDatePicker from "./Filter/StartDatePicker";
import EndDatePicker from "./Filter/EndDatePicker";
import { age, date, gender, interest, location } from "./initData";
import moment from "moment";
import { search } from "api/search";
import UserSearchResult from "./UserSearchResult";

const dateRadio = date.map((item, index) => (
  <FormControlLabel
    className="top__date-select"
    key={index}
    value={item.value}
    label={<Typography sx={{ fontSize: "0.8rem" }}>{item.label}</Typography>}
    control={<Radio size="small" />}
  />
));

const getAllValues = (list) => {
  return list.map((item) => item.id);
};

const getCheckedValues = (radio, list) => {
  // 전체 선택
  if (radio === "all") {
    return getAllValues(list);
  }
  // 직접 선택
  let checkedValues = [];
  for (let item of list) {
    if (item.checked === true) {
      checkedValues.push(item.id);
    }
  }
  // 직접 선택한게 하나도 없을때
  if (checkedValues.length === 0) {
    checkedValues = getAllValues(list);
  }
  return checkedValues;
};

function Search() {
  const [data, setData] = useState({
    interest: interest,
    gender: gender,
    age: age,
    location: location,
  });
  const [standard, setStandard] = useState("board");
  const [word, setWord] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState(["all", "all", "all", "all"]);

  const [userSearch, setUserSearch] = useState([
    { nickname: "김주영", user_id: "nullyng" },
    { nickname: "배시현", user_id: "아무말도안할거야" },
    { nickname: "박종욱", user_id: "종긔이긔" },
    { nickname: "박주현", user_id: "노지희" },
    { nickname: "조인후", user_id: "mischievinu" },
    { nickname: "한유빈", user_id: "mint_frog" },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let searchData = {};
    searchData.word = word;

    // 게시글 검색일때만 필터 적용
    if (standard === "board") {
      searchData.interest = getCheckedValues(radio[0], data.interest);
      searchData.gender = getCheckedValues(radio[1], data.gender);
      searchData.age = getCheckedValues(radio[2], data.age);
      searchData.location = getCheckedValues(radio[3], data.location);

      if (dateRange !== "all") {
        if (dateRange === "custom") {
          searchData.startDate = moment(startDate).format("YYYY-MM-DD");
          searchData.endDate = moment(endDate).format("YYYY-MM-DD");
        } else if (dateRange === "days") {
          searchData.startDate = moment().format("YYYY-MM-DD");
        } else {
          searchData.startDate = moment()
            .subtract(1, dateRange)
            .format("YYYY-MM-DD");
        }
      }
    }

    console.log(searchData);

    // 검색 요청
    search(
      standard,
      data,
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Grid className="search-inner" item>
      <form>
        <Grid className="search-inner__top" container direction="column">
          <Grid container justifyContent="space-around">
            <Grid xs={2} item>
              <FormControl sx={{ minWidth: "100%", height: "100%" }}>
                <ThemeProvider theme={theme}>
                  <Select
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                    value={standard}
                    onChange={(e) => {
                      setStandard(e.target.value);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <MenuItem value="board">게시글</MenuItem>
                    <MenuItem value="user">유저</MenuItem>
                  </Select>
                </ThemeProvider>
              </FormControl>
            </Grid>
            <Grid xs={9} item>
              <SearchBar
                handleOpen={handleOpen}
                onSubmit={onSubmit}
                standard={standard}
                word={word}
                setWord={setWord}
              />
            </Grid>
          </Grid>
          <FilterModal
            open={open}
            handleClose={handleClose}
            data={data}
            setData={setData}
            radio={radio}
            setRadio={setRadio}
          />
          {standard === "board" && (
            <>
              <Grid className="top__date-picker" container justifyContent="end">
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      row
                      value={dateRange}
                      onChange={(e) => {
                        setDateRange(e.target.value);
                      }}
                    >
                      {dateRadio}
                    </RadioGroup>
                  </ThemeProvider>
                </FormControl>
              </Grid>
              {dateRange === "custom" && (
                <Grid
                  className="top__date-picker"
                  container
                  justifyContent="end"
                >
                  <StartDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                  />
                  <EndDatePicker
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </form>
      <Grid className="search-inner__result" container direction="column">
        {userSearch.map((user, index) => (
          <UserSearchResult key={index} user={user} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Search;
