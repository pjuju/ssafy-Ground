import { getLatestBoard } from "api/board";
import Article from "components/Feed/Article/Article";
import TitleBar from "components/common/TitleBar";
import theme from "components/common/theme.js";
import "styles/Feed/LatestFeed.scss";

import { Fab, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ThemeProvider } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import FilterButton from "./FilterButton";
import FilterChips from "./FilterChips";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInterest,
  setInterest,
  toggleInterestList,
} from "modules/interest";
import {
  getUserProfile,
  getUserState,
  modifyUserInfo,
  updateInterest,
} from "api/user";

function LatestFeed() {
  const [target, setTarget] = useState("");
  // 게시글 데이터를 담을 배열
  const [articles, setArticles] = useState([]);
  // 스크롤이 하단에 닿았을 때 pageNumber를 1만큼 증가시켜서 새로운 데이터를 요청한다.
  const [pageNumber, setPageNumber] = useState(1);
  // 로딩 성공 및 실패 정보를 담을 state
  const [isLoading, setIsLoading] = useState(false);
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  // 관심 운동 종목과 관련한 Redux 상태값, 액션함수
  const interestList = useSelector((state) => state.interest.interestList);

  const dispatch = useDispatch();
  const onToggleInterestList = (id) => dispatch(toggleInterestList(id));
  const onSetInterest = (id) => dispatch(setInterest(id));
  const onDeleteInterest = (id) => dispatch(deleteInterest(id));

  const fetchArticles = () => {
    getLatestBoard(pageNumber, (res) => {
      setArticles(articles.concat(res.data));
      setPageNumber((pageNumber) => pageNumber + 1);
      console.log(res.data);
      console.log("페이지 넘버: " + pageNumber);
    });
  };

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      // 관찰 요소 리셋
      setIsLoading((isLoading) => !isLoading);
      observer.unobserve(entry.target);
      // 데이터 더 불러오기
      fetchArticles();
      // setIsLoading((isLoading) => !isLoading);
      // observer.observe(entry.target);
    }
  };

  useEffect(() => {
    // 새로고침 시 Navbar가 알맞은 메뉴 인덱스를 가리키도록 함
    onSetSideMenuIdx(1);
    onSetBottomMenuIdx(2);
  }, []);

  useEffect(() => {
    getUserState((res) => {
      // 사용자의 관심 운동 종목을 redux state인 interestList에서 true로 변경
      getUserProfile(res.data.id, (res) => {
        console.log(res.data);
        res.data.userCategories.map((item) => {
          onSetInterest(item.categoryId);
        });
      });
    });
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4, // target과 40%만큼 겹쳤을 때 onIntersect 실행
      });
      setIsLoading((isLoading) => !isLoading);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, pageNumber]);

  const handleClickTitle = () => {
    document.querySelector(".content").scrollTo(0, 0);
  };

  const changeInterestList = () => {
    const interestArray = [];
    // interestList에서 isInterested가 true인 것들의 id만 뽑아서 새로운 배열 생성
    interestList.map((item) => {
      if (item.isInterested) {
        console.log(interestList);
        interestArray.push(item.id);
      }
    });
    console.log(interestArray);

    updateInterest(interestArray, (res) => {
      console.log(res);
    });
  };

  return (
    <Grid className="content">
      <Grid className="content__title-desktop">
        <h2 onClick={handleClickTitle}>최신 글 피드</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="최신 글 피드" isBack={false} />
      </Grid>
      <Grid id="inner" className="content__inner">
        <Grid className="content__inner__filter" container direction="row">
          <Grid className="content__inner__filter__chips">
            <FilterChips
              interestList={interestList}
              onToggleInterestList={onToggleInterestList}
              changeInterestList={changeInterestList}
            />
          </Grid>
          <Grid className="content__inner__filter__icon">
            <FilterButton
              interestList={interestList}
              onToggleInterestList={onToggleInterestList}
              changeInterestList={changeInterestList}
            />
          </Grid>
        </Grid>
        {articles.map((article, index) => (
          <Article key={index} articleData={article} />
        ))}
        <ThemeProvider theme={theme}>
          <Fab className="fab-write" color="primary" aria-label="edit">
            <EditIcon />
          </Fab>
        </ThemeProvider>
        <div className="loading">
          <ReactLoading type="spin" color="#54BAB9" />
        </div>
        <div ref={setTarget} style={{ height: "100px" }}></div>
      </Grid>
    </Grid>
  );
}

export default LatestFeed;
