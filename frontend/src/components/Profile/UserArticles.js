import { TabContext, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { getSavedBoard, getWrittenBoard } from "api/board";
import Article from "components/Feed/Article/Article";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function UserArticles() {
  const [value, setValue] = useState("0");

  const [userId, setUserId] = useState("");

  // 무한 스크롤을 위한 state
  const [writtenPageNumber, setWrittenPageNumber] = useState(1);
  const [savedPageNumber, setSavedPageNumber] = useState(1);
  const [writtenArticles, setWrittenArticles] = useState([]);
  const [newWrittenArticles, setNewWrittenArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [newSavedArticles, setNewSavedArticles] = useState([]);

  // 로딩 성공 및 실패 정보를 담을 state
  const [isWrittenLoading, setIsWrittenLoading] = useState(false);
  const [isSavedLoading, setIsSavedLoading] = useState(false);

  const [writtenTarget, setWrittenTarget] = useState("");
  const [savedTarget, setSavedTarget] = useState("");

  const styles = () => ({
    indicator: {
      "&:active": {
        outline: "none",
      },
      "&:focus": {
        outline: "none",
      },
    },
    selected: {
      fontWeight: "700",
    },
  });

  useEffect(() => {
    // 조회하고자 하는 사용자의 아이디 가져오기
    const parseURL = window.location.href.split("/");
    const id = parseURL[parseURL.length - 1];
    setUserId(id);

    // 미리 첫 페이지 게시글들 가져오기
    getWrittenBoard(id, 0, (res) => {
      setWrittenArticles(res.data);
      setNewWrittenArticles(res.data);
    });

    getSavedBoard(id, 0, (res) => {
      setSavedArticles(res.data);
      setNewSavedArticles(res.data);
      console.log(res.data);
    });
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const fetchWrittenArticles = () => {
    getWrittenBoard(userId, writtenPageNumber, (res) => {
      setWrittenArticles(() => writtenArticles.concat(res.data));
      setNewWrittenArticles(res.data);
      setWrittenPageNumber(() => writtenPageNumber + 1);
      console.log("페이지 넘버: " + writtenPageNumber);
    });
  };

  const fetchSavedArticles = () => {
    getSavedBoard(userId, savedPageNumber, (res) => {
      setSavedArticles(() => savedArticles.concat(res.data));
      setNewSavedArticles(res.data);
      setSavedPageNumber(() => savedPageNumber + 1);
      console.log(savedArticles);
      console.log("페이지 넘버: " + savedPageNumber);
    });
  };

  /* 작성한 글에 대한 옵저버 이벤트 핸들러 */
  const onWrittenIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isWrittenLoading) {
      // 관찰 요소 리셋
      setIsWrittenLoading((isWrittenLoading) => !isWrittenLoading);
      observer.unobserve(entry.target);
      // 데이터 더 불러오기
      fetchWrittenArticles();
    }
  };

  /* 저장한 글에 대한 옵저버 이벤트 핸들러 */
  const onSavedIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isSavedLoading) {
      // 관찰 요소 리셋
      setIsSavedLoading((isSavedLoading) => !isSavedLoading);
      observer.unobserve(entry.target);
      // 데이터 더 불러오기
      fetchSavedArticles();
    }
  };

  /* 작성한 글 옵저버 등록 */
  useEffect(() => {
    let observer;
    if (writtenTarget) {
      observer = new IntersectionObserver(onWrittenIntersect, {
        threshold: 0.6,
      });
      setIsWrittenLoading((isWrittenLoading) => !isWrittenLoading);
      observer.observe(writtenTarget);
    }
    return () => observer && observer.disconnect();
  }, [writtenTarget, writtenPageNumber]);

  /* 저장한 글 옵저버 등록 */
  useEffect(() => {
    let observer;
    if (savedTarget) {
      observer = new IntersectionObserver(onSavedIntersect, {
        threshold: 0.6,
      });
      setIsSavedLoading((isSavedLoading) => !isSavedLoading);
      observer.observe(savedTarget);
    }
    return () => observer && observer.disconnect();
  }, [savedTarget, savedPageNumber]);

  return (
    <Grid className="user-articles">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "#fff" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab className="user-articles__tab" label="작성한 글" value="0" />
            <Tab className="user-articles__tab" label="저장한 글" value="1" />
          </Tabs>
        </Box>
        <TabPanel value="0" className="user-articles__tabpanel">
          {writtenArticles.length === 0 ? (
            <p>작성한 글이 없습니다.</p>
          ) : (
            <div>
              {writtenArticles.map((article, index) => (
                <Article key={index} articleData={article} />
              ))}
              {newWrittenArticles.length !== 0 && (
                <div>
                  <div className="loading">
                    <ReactLoading type="spin" color="#54BAB9" />
                  </div>
                  <div ref={setWrittenTarget} style={{ height: "100px" }}></div>
                </div>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel value="1" className="user-articles__tabpanel">
          {savedArticles.length === 0 ? (
            <p>저장한 글이 없습니다.</p>
          ) : (
            <div>
              {savedArticles.map((article, index) => (
                <Article key={index} articleData={article} />
              ))}
              {newSavedArticles.length !== 0 && (
                <div>
                  <div className="loading">
                    <ReactLoading type="spin" color="#54BAB9" />
                  </div>
                  <div ref={setSavedTarget} style={{ height: "100px" }}></div>
                </div>
              )}
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

export default UserArticles;
