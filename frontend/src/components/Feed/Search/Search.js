import { Grid } from "@mui/material";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./Filter/FilterModal";
import SearchBar from "./SearchBar";
import { age, gender, interest, location } from "./initData";
import moment from "moment";

import { search } from "api/search";
import SearchSort from "./Filter/SearchSort";
import SearchStandard from "./Filter/SearchStandard";
import SearchDatePicker from "./Filter/Date/SearchDatePicker";
import UserSearchResult from "./UserSearchResult";

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
  const [searchResult, setSearchResult] = useState([]);
  const [sortType, setSortType] = useState("id");

  const [userSearch, setUserSearch] = useState([
    { nickname: "김주영", username: "rlawndud" },
    { nickname: "배시현", username: "qotlgus" },
    { nickname: "박종욱", username: "qkrwhddnr" },
    { nickname: "박주현", username: "qkrwngus" },
    { nickname: "조인후", username: "whdlsgn" },
    { nickname: "한유빈", username: "gksdbqls" },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // 검색어가 있을 때만 검색
    if (word.trim() !== "") {
      let searchData = {};
      searchData.word = word;
      // 게시글 검색일때만 필터 적용
      if (standard === "board") {
        searchData.interest = getCheckedValues(radio[0], data.interest);
        searchData.gender = getCheckedValues(radio[1], data.gender);
        searchData.age = getCheckedValues(radio[2], data.age);
        searchData.location = getCheckedValues(radio[3], data.location);
        searchData.type = sortType;

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
    }
  };

  return (
    <Grid className="search-inner" item>
      <form>
        <Grid className="search-inner__top" container direction="column">
          <Grid container justifyContent="space-between">
            <Grid xs={2} item>
              <SearchStandard standard={standard} setStandard={setStandard} />
            </Grid>
            <Grid xs={9.5} item>
              <SearchBar
                handleOpen={handleOpen}
                onSubmit={onSubmit}
                standard={standard}
                word={word}
                setWord={setWord}
              />
            </Grid>
          </Grid>
        </Grid>
        {standard === "board" && (
          <SearchDatePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
        <FilterModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
          radio={radio}
          setRadio={setRadio}
        />
      </form>
      <Grid className="search-inner__result" container direction="column">
        {searchResult.length !== 0 && standard === "board" && (
          <SearchSort sortType={sortType} setSortType={setSortType} />
        )}
        {standard === "user" &&
          userSearch.map((user, index) => (
            <UserSearchResult key={index} user={user} />
          ))}
      </Grid>
    </Grid>
  );
}

export default Search;
