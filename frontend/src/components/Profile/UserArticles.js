import { TabContext, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { getSavedBoard, getWrittenBoard } from "api/board";
import Article from "components/Feed/Article/Article";
import { useEffect, useState } from "react";

function UserArticles() {
  const [value, setValue] = useState("0");

  // 무한 스크롤을 위한 state
  const [writtenPageNumber, setWrittenPageNumber] = useState(0);
  const [savedPageNumber, setSavedPageNumber] = useState(0);
  const [writtenArticles, setWrittenArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

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
    const userId = parseURL[parseURL.length - 1];

    getWrittenBoard(userId, writtenPageNumber, (res) => {
      setWrittenArticles(res.data);
    });

    getSavedBoard(userId, savedPageNumber, (res) => {
      setSavedArticles(res.data);
    });
  }, [savedPageNumber, writtenPageNumber]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

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
            writtenArticles.map((article, index) => (
              <Article key={index} articleData={article} />
            ))
          )}
        </TabPanel>
        <TabPanel value="1" className="user-articles__tabpanel">
          {savedArticles.length === 0 ? (
            <p>저장한 글이 없습니다.</p>
          ) : (
            <p>하이</p>
          )}
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

export default UserArticles;
