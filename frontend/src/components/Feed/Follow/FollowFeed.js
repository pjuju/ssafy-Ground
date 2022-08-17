import { getFollowBoard } from "api/board";
import Article from "components/Feed/Article/Article";
import TitleBar from "components/common/TitleBar";
import theme from "components/common/theme.js";

import { Fab, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ThemeProvider } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FollowFeed() {
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  const [target, setTarget] = useState("");
  // 게시글 데이터를 담을 배열
  const [articles, setArticles] = useState([]);
  const [newArticles, setNewArticles] = useState([]);
  // 스크롤이 하단에 닿았을 때 pageNumber를 1만큼 증가시켜서 새로운 데이터를 요청한다.
  const [pageNumber, setPageNumber] = useState(1);
  // 로딩 성공 및 실패 정보를 담을 state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 가장 마지막 요소를 하단과 띄우기
  // useEffect(() => {
  //   let lastArticle;
  //   if (newArticles.length !== 0) {
  //     // className이 article인 모든 요소 중 마지막 하나를 구하기
  //     lastArticle = Array.from(
  //       document.querySelectorAll(".article__inner")
  //     ).pop();
  //     console.log(lastArticle);
  //     lastArticle.style.marginBottom = "2rem";
  //   }

  //   return () => {
  //     if (lastArticle) {
  //       lastArticle.style.marginBottom = "0";
  //     }
  //   };
  // }, [newArticles]);

  const fetchArticles = () => {
    getFollowBoard(pageNumber, (res) => {
      setArticles(() => articles.concat(res.data));
      setNewArticles(res.data);
      setPageNumber(() => pageNumber + 1);
      console.log(res.data);
      console.log("페이지 넘버: " + pageNumber);
    });
  };

  const handleClickCreate = () => {
    navigate("/feed/create");
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
    onSetSideMenuIdx(0);
    onSetBottomMenuIdx(0);
  }, []);

  useEffect(() => {
    getFollowBoard(0, (res) => {
      setArticles(() => articles.concat(res.data));
      setNewArticles(res.data);
      console.log(res.data);
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

  return (
    <Grid className="content">
      <Grid className="content__title-desktop">
        <h2 onClick={handleClickTitle}>팔로우 피드</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="팔로우 피드" isBack={false} />
      </Grid>
      {articles.length === 0 ? (
        <Grid id="inner" className="content__inner">
          <p className="content__inner--none">
            팔로우 피드에 등록된 글이 없습니다.
          </p>
          <ThemeProvider theme={theme}>
            <Fab className="fab-write" color="primary" aria-label="edit">
              <EditIcon onClick={handleClickCreate} />
            </Fab>
          </ThemeProvider>
          {articles.length !== 0 && (
            <div>
              <div className="loading">
                <ReactLoading type="spin" color="#54BAB9" />
              </div>
              <div ref={setTarget} style={{ height: "100px" }}></div>
            </div>
          )}
        </Grid>
      ) : (
        <Grid id="inner" className="content__inner">
          {articles.map((article, index) => (
            <Article key={index} articleData={article} />
          ))}
          <ThemeProvider theme={theme}>
            <Fab className="fab-write" color="primary" aria-label="edit">
              <EditIcon onClick={handleClickCreate} />
            </Fab>
          </ThemeProvider>
          {newArticles.length !== 0 && (
            <div>
              <div className="loading">
                <ReactLoading type="spin" color="#54BAB9" />
              </div>
              <div ref={setTarget} style={{ height: "100px" }}></div>
            </div>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default FollowFeed;
