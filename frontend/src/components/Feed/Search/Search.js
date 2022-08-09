import { Grid } from "@mui/material";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./Filter/FilterModal";
import SearchBar from "./SearchBar";
import { age, gender, interest, location } from "./initData";
import moment from "moment";

import { searchBoard, searchUser } from "api/search";
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    // 검색어가 있을 때만 검색
    if (word.trim() !== "") {
      let searchData = {};
      searchData.word = word;
      // 게시글 검색일때만 필터 적용
      if (standard === "board") {
        searchData.category = getCheckedValues(radio[0], data.interest);
        searchData.gender = getCheckedValues(radio[1], data.gender);
        searchData.age = getCheckedValues(radio[2], data.age);
        searchData.location = getCheckedValues(radio[3], data.location);
        searchData.type = sortType;
        searchData.startDate = "1900-01-01";
        searchData.endDate = moment().format("YYYY-MM-DD");

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
        // 게시글 검색 요청
        searchBoard(
          searchData,
          (response) => {
            console.log(response.data);
            setSearchResult(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        // 유저 검색 요청
        searchUser(
          searchData,
          (res) => {
            console.log(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      }
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
        </Grid>
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
      </Grid>
    </Grid>
  );
}

export default Search;
