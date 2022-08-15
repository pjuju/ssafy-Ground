import { useEffect, useRef, useState } from "react";
import { useSearchState, useSearchDispatch } from "../../SearchContext";

import ReactLoading from "react-loading";
import NoSearchResult from "../NoSearchResult";
import SearchSort from "./SearchSort";
import Article from "components/Feed/Article/Article";

import { searchBoard } from "api/search";

const getSearchData = (filter) => {
  let searchData = [];
  if (filter.radio === "all") {
    searchData = filter.values.map((value) => value.id);
  } else {
    for (let value of filter.values) {
      if (value.checked) searchData.push(value.id);
    }
  }
  return searchData;
};

function BoardSearchResult() {
  const {
    word,
    type,
    date,
    category,
    gender,
    age,
    location,
    boardResult,
    page,
  } = useSearchState();
  const dispatch = useSearchDispatch();

  // 로딩 정보를 담을 state
  const [isLoading, setIsLoading] = useState(false);
  // 더 불러올 결과를 저장할 state
  const [boardResultMore, setBoardResultMore] = useState([]);
  // 옵저버가 감지할 target
  const target = useRef();

  // 정렬 기준 선택했을 때, 페이지 넘버 0으로 바꿔줘야 함
  const handleClickSort = (type) => {
    observer.disconnect();
    let searchData = {
      word,
      type,
      category: getSearchData(category),
      gender: getSearchData(gender),
      age: getSearchData(age),
      location: getSearchData(location),
    };
    if (date.radio === "all") searchData.startDate = "1900-01-01";
    else searchData.startDate = date.startDate.format("YYYY-MM-DD");
    searchData.endDate = date.endDate.format("YYYY-MM-DD");
    // 검색 요청
    searchBoard(searchData, 0, (res) => {
      dispatch({ type: "board", result: res.data });
    });
  };

  // 다음 페이지 넘버로 불러올 때 실행
  const handleBoardMore = () => {
    let searchData = {
      word,
      type,
      category: getSearchData(category),
      gender: getSearchData(gender),
      age: getSearchData(age),
      location: getSearchData(location),
    };
    if (date.radio === "all") searchData.startDate = "1900-01-01";
    else searchData.startDate = date.startDate.format("YYYY-MM-DD");
    searchData.endDate = date.endDate.format("YYYY-MM-DD");
    // 검색 요청
    searchBoard(searchData, page, (res) => {
      setBoardResultMore(res.data);
      dispatch({ type: "board-concat", result: res.data });
    });
  };

  // target이 뷰포트에 40%만큼 보이면 페이지 넘버를 증가시킴
  const onIntersect = (observer) => {
    if (!isLoading) {
      setIsLoading(true);
      observer.unobserve(target.current);
      dispatch({ type: "page" });
    }
  };

  // 무한 스크롤을 위한 옵저버
  // targetdl 40%만큼 보일 때 onIntersect가 실행됨
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        onIntersect(observer);
      }
    },
    {
      threshold: 0.4,
    }
  );

  // 페이지 넘버 증가할 때마다 검색 결과 불러옴
  useEffect(() => {
    if (page !== 0) {
      handleBoardMore();
      setIsLoading(false);
    } else {
      setBoardResultMore([]);
    }
  }, [page]);

  // 페이지가 0이면 boardResultMore 업데이트
  useEffect(() => {
    if (page === 0) {
      setBoardResultMore(boardResult);
    }
  }, [boardResult]);

  // 검색 결과가 있고 현재 로딩중이 아닐 때만 옵저버 설정
  useEffect(() => {
    if (boardResultMore.length >= 10 && !isLoading) {
      observer.observe(target.current);
    }
  }, [boardResultMore]);

  return (
    <>
      {boardResult.length === 0 && <NoSearchResult />}
      {boardResult.length !== 0 && (
        <>
          <SearchSort handleClickSort={handleClickSort} />
          {boardResult.map((board) => (
            <Article key={board.id} articleData={board} />
          ))}
          {isLoading && (
            <div className="loading">
              <ReactLoading type="spin" color="#54BAB9" />
            </div>
          )}
          <div ref={target} style={{ height: "100px" }} />
        </>
      )}
    </>
  );
}

export default BoardSearchResult;
