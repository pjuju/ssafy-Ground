import { Fab, Grid } from "@mui/material";
import { getFollowBoard } from "api/board";
import { useEffect, useRef, useState } from "react";
import "styles/Feed/FollowFeed.scss";
import Article from "../Article/Article";
import TitleBar from "../../common/TitleBar";
import ReactLoading from "react-loading";
import { ThemeProvider } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import theme from "components/common/theme.js";

function FollowFeed() {
  const [target, setTarget] = useState("");
  // 게시글 데이터를 담을 배열
  const [articles, setArticles] = useState([]);
  // 스크롤이 하단에 닿았을 때 pageNumber를 1만큼 증가시켜서 새로운 데이터를 요청한다.
  const [pageNumber, setPageNumber] = useState(1);
  // 로딩 성공 및 실패 정보를 담을 state
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = () => {
    getFollowBoard(pageNumber, (res) => {
      setArticles(articles.concat(res.data));
      setPageNumber((pageNumber) => pageNumber + 1);
      console.log(res.data);
      console.log("페이지 넘버: " + pageNumber);
    });
  };

  const onIntersect = ([entry], observer) => {
    console.log("onIntersect");
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
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4, // 관찰요소와 80%만큼 겹쳤을 때 onIntersect을 수행
      });
      setIsLoading((isLoading) => !isLoading);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, pageNumber]);

  const handleClickTitle = () => {
    document.querySelector(".content").scrollTo(0, 0);
  };

  return (
    <Grid className="content">
      <Grid className="content__title-desktop">
        <h2 onClick={handleClickTitle}>팔로우 피드</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="팔로우 피드" />
      </Grid>
      <Grid id="inner" className="content__inner">
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

export default FollowFeed;