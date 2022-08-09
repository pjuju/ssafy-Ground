import theme from "components/common/theme.js";
import "styles/MobileNoti/MobileNotiPage.scss";
import LikeNoti from "components/common/Notification/LikeNoti";
import CommentNoti from "components/common/Notification/CommentNoti";
import FollowRequestNoti from "components/common/Notification/FollowRequestNoti";
import FollowNoti from "components/common/Notification/FollowNoti";
import TitleBar from "components/common/TitleBar";
import BottomNavbar from "components/common/Navbar/BottomNavbar";
import { setBottomMenuIdx, setSideMenuIdx } from "modules/menu";
import {
  getAccountNoti,
  getBoardNoti,
  readAllAccountNoti,
  readAllBoardNoti,
} from "api/notification";

import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MobileNotiPage() {
  const [activityNotiCnt, setActivityNotiCnt] = useState(0);
  const [accountNotiCnt, setAccountNotiCnt] = useState(0);
  const [activityNotiList, setActivityNotiList] = useState([]);
  const [accountNotiList, setAccountNotiList] = useState([]);
  const [value, setValue] = useState("0");

  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx);

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));

  useEffect(() => {
    // bottom navbar에서 선택된 메뉴값 저장
    onSetBottomMenuIdx(1);

    // 서버에서 활동 알림 목록 받아오기
    getBoardNoti((res) => {
      setActivityNotiList(res.data);
      if (activityNotiList.length > 0) {
        setActivityNotiCnt(res.data.length);
      }
    });

    // 서버에서 계정 알림 목록 받아오기
    getAccountNoti((res) => {
      setAccountNotiList(res.data);
      if (accountNotiList.length > 0) {
        setAccountNotiCnt(res.data.length);
      }
    });

    // 현재 탭에 따라 읽음 처리를 서버에 요청
    if (value === "0") {
      // 활동 탭을 보고 있다면 활동 탭의 알림들의 읽음 처리를 요청
      readAllBoardNoti((res) => {
        console.log("활동 전체 읽음");
      });
    } else {
      // 계정 탭을 보고 있다면 계정 탭의 알림들의 읽음 처리를 요청
      readAllAccountNoti((res) => {
        console.log("계정 전체 읽음");
      });
    }
  }, [accountNotiCnt, activityNotiCnt, value]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickAllDelete = () => {
    console.log("전체 삭제");
    // 해당 탭의 전체 알림에 대한 삭제를 서버에 요청
  };

  return (
    <Grid className="content">
      <Grid className="content__title-mobile">
        <TitleBar title="알림" />
      </Grid>
      <Grid id="inner" className="content__inner">
        <Grid className="content__inner__noti">
          <ThemeProvider theme={theme}>
            <TabContext value={value} centered>
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  variant="fullWidth"
                  aria-label="notification tablist"
                >
                  <Tab label={`활동(${activityNotiList.length})`} value="0" />
                  <Tab label={`계정(${accountNotiList.length})`} value="1" />
                </TabList>
              </Box>
              <TabPanel className="notification__tabpanel" value="0">
                {activityNotiList.length > 0 &&
                  activityNotiList.map((item, index) => {
                    if (item.type === 0) {
                      return (
                        <LikeNoti
                          key={item.id}
                          id={item.id}
                          idx={index}
                          nickname={item.nickname}
                          isChecked={item.checkYN}
                        />
                      );
                    } else {
                      return (
                        <CommentNoti
                          key={item.id}
                          id={item.id}
                          idx={index}
                          nickname={item.nickname}
                          isChecked={item.checkYN}
                        />
                      );
                    }
                  })}
              </TabPanel>
              <TabPanel className="notification__tabpanel" value="1">
                {accountNotiList.length > 0 &&
                  accountNotiList.map((item, index) => {
                    if (item.type) {
                      return (
                        <FollowNoti
                          key={item.id}
                          id={item.id}
                          idx={index}
                          nickname={item.nickname}
                          isChecked={item.checkYN}
                        />
                      );
                    } else {
                      return (
                        <FollowRequestNoti
                          key={item.id}
                          id={item.id}
                          idx={index}
                          nickname={item.nickname}
                          isChecked={item.checkYN}
                        />
                      );
                    }
                  })}
              </TabPanel>
            </TabContext>
          </ThemeProvider>
        </Grid>
      </Grid>
      <BottomNavbar
        sideMenuIdx={sideMenuIdx}
        bottomMenuIdx={bottomMenuIdx}
        onSetSideMenuIdx={onSetSideMenuIdx}
        onSetBottomMenuIdx={onSetBottomMenuIdx}
      />
    </Grid>
  );
}

export default MobileNotiPage;
