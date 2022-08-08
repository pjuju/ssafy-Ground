import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LatestSearch from "./LatestSearch";
import { useState, useEffect } from "react";
import { getSearchBoard, getSearchUser } from "api/search";

const boxStyle = {
  width: "100%",
  height: 300,
  backgroundColor: "#fff",
  position: "absolute",
  zIndex: 10,
  border: "2px solid #54BAB9",
  boxSizing: "border-box",
  borderRadius: "4px",
  borderTop: "none",
};

function LatestSearchBox({ standard }) {
  const [latestBoard, setLatestBoard] = useState([
    "홈트",
    "건강식단",
    "배고파요",
  ]);
  const [latestUser, setlatestUser] = useState(["김주영", "바보"]);

  // useEffect(() => {
  //   // 보드 최근 검색 기록
  //   getSearchBoard(
  //     (res) => {
  //       setLatestBoard(res.data);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   // 유저 최근 검색 기록
  //   getSearchUser(
  //     (res) => {
  //       setlatestUser(res.data);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }, []);

  const handleDeleteAll = () => {
    if (standard === "board") {
      setLatestBoard([]);
    } else {
      setlatestUser([]);
    }
  };

  return (
    <Grid container justifyContent="end">
      <Box sx={boxStyle}>
        <Grid container className="search-latest-box" direction="column">
          <h4>최근 검색어</h4>
          <Grid className="search-latest-box__content" item xs={9.3}>
            {standard === "board" && <LatestSearch list={latestBoard} />}
            {standard === "user" && <LatestSearch list={latestUser} />}
          </Grid>
          <Grid item textAlign="end">
            <span
              className="search-latest-box__deleteAll"
              onClick={handleDeleteAll}
            >
              전체 삭제
            </span>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LatestSearchBox;
