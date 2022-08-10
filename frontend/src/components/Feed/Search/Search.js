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
import Article from "../Article/Article";

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
  // 검색 데이터 관련 state
  const [standard, setStandard] = useState("board");
  const [word, setWord] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState(["all", "all", "all", "all"]);
  const [sortType, setSortType] = useState("id");
  // 검색 결과 state
  const [boardSearchResult, setBoardSearchResult] = useState([]);
  const [userSearchResult, setUserSearchResult] = useState([]);
  // 검색 필터 모달창 state
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // 게시글 검색 결과 페이징
  const [pageNumber, setPageNumber] = useState(1);

  // 검색 데이터 설정
  const getSearchData = () => {
    const searchData = {};

    searchData.word = word;
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

    return searchData;
  };

  // 게시글 검색 요청
  const getBoardSearch = (searchData) => {
    searchBoard(
      searchData,
      (res) => {
        console.log(res.data);
        setBoardSearchResult(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // 유저 검색 요청
  const getUserSearch = (searchData) => {
    searchUser(
      searchData,
      (res) => {
        console.log(res.data);
        setUserSearchResult(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // 게시글 정렬 기준 바꿈
  const onSortSearch = (sortId) => {
    const searchData = { ...getSearchData() };
    searchData.type = sortId;
    getBoardSearch(searchData);
  };

  // 검색 버튼 눌렀을 때
  const onSubmit = () => {
    // 검색어가 있을 때만 검색 가능
    if (word.trim() !== "") {
      let searchData = {};
      // 게시글 검색일때만 필터 적용
      if (standard === "board") {
        searchData = { ...getSearchData() };
        getBoardSearch(searchData);
      // 유저 검색은 검색어만 있으면 됨
      } else {
        searchData.word = word;
        getUserSearch(searchData);
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
            <Grid className="search-inner__search-bar" xs={12} sm={9.5} item>
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
        {boardSearchResult.length !== 0 && standard === "board" && (
          <>
            <SearchSort
              sortType={sortType}
              setSortType={setSortType}
              onSubmit={onSortSearch}
            />
            {boardSearchResult.map((item, index) => (
              <Article key={index} articleData={item} />
            ))}
          </>
        )}
        {setUserSearchResult.length !== 0 &&
          standard === "user" &&
          userSearchResult.map((item, index) => (
            <UserSearchResult key={index} user={item} />
          ))}
      </Grid>
    </Grid>
  );
}

export default Search;
