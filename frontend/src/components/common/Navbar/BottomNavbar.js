import theme from "../theme";
import BadgeButton from "./BadgeButton";

import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccountNoti, getBoardNoti } from "api/notification";

function BottomNavbar({
  sideMenuIdx,
  bottomMenuIdx,
  onSetSideMenuIdx,
  onSetBottomMenuIdx,
}) {
  const [activityNotiCnt, setActivityNotiCnt] = useState(0);
  const [accountNotiCnt, setAccountNotiCnt] = useState(0);
  const [activityNotiList, setActivityNotiList] = useState([]);
  const [accountNotiList, setAccountNotiList] = useState([]);
  const [notiCnt, setNotiCnt] = useState(0);

  useEffect(() => {
    // 서버에서 활동 알림 목록 받아오기
    getBoardNoti((res) => {
      setActivityNotiList(res.data);
    });

    getAccountNoti((res) => {
      setAccountNotiList(res.data);
    });
  }, [bottomMenuIdx]);

  useEffect(() => {
    // 값 초기화 후 다시 측정
    setActivityNotiCnt((activityNotiCnt) => 0);
    console.log(activityNotiList);
    activityNotiList.map((item) => {
      if (!item.checkYN) {
        setActivityNotiCnt((activityNotiCnt) => activityNotiCnt + 1);
      }
    });
  }, [activityNotiList]);

  useEffect(() => {
    // 값 초기화 후 다시 측정
    setAccountNotiCnt((accountNotiCnt) => 0);
    console.log(accountNotiList);
    accountNotiList.map((item) => {
      if (!item.checkYN) {
        setAccountNotiCnt((accountNotiCnt) => accountNotiCnt + 1);
      }
    });
  }, [accountNotiList]);

  useEffect(() => {
    setNotiCnt(activityNotiCnt + accountNotiCnt);
    console.log("activity : " + activityNotiCnt);
  }, [activityNotiCnt]);

  useEffect(() => {
    setNotiCnt(activityNotiCnt + accountNotiCnt);
    console.log("account : " + accountNotiCnt);
  }, [accountNotiCnt]);

  return (
    <Grid className="navbar-bottom">
      <ThemeProvider theme={theme}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={bottomMenuIdx}
            onChange={(event, newValue) => {
              switch (newValue) {
                case 2:
                case 3:
                  onSetSideMenuIdx(newValue - 1);
                  break;
                default:
                  onSetSideMenuIdx(newValue);
                  break;
              }
              onSetBottomMenuIdx(newValue);
              console.log(bottomMenuIdx);
            }}
          >
            <BottomNavigationAction
              component={Link}
              to="/feed/follow"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/notification"
              icon={<BadgeButton notiCnt={notiCnt} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/feed/latest"
              icon={<FiberNewOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/feed/search"
              icon={<SearchOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/profile/1"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}

export default BottomNavbar;
