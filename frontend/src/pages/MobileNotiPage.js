import theme from "components/common/theme.js";
import "styles/MobileNoti/MobileNotiPage.scss";

import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LikeNoti from "components/common/Notification/LikeNoti";
import CommentNoti from "components/common/Notification/CommentNoti";
import FollowRequestNoti from "components/common/Notification/FollowRequestNoti";
import FollowNoti from "components/common/Notification/FollowNoti";
import TitleBar from "components/common/TitleBar";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import BottomNavbar from "components/common/Navbar/BottomNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setBottomMenuIdx, setSideMenuIdx } from "modules/menu";

function MobileNotiPage() {
  const [activityNotifCnt, setActivityNotifCnt] = useState(4);
  const [accountNotifCnt, setAccountNotifCnt] = useState(3);
  const [value, setValue] = useState("0");
  const [notifCnt, setNotifCnt] = useState(5);

  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx);

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));


  const activityNotiList = [
    // flag 0 : 회원님의 게시글을 좋아합니다.
    // flag 1 : 회원님의 게시글에 댓글을 작성했습니다.
    { id: 1, from: "username1", flag: 0 },
    { id: 2, from: "username2", flag: 1 },
    { id: 3, from: "username3", flag: 1 },
    { id: 4, from: "username4", flag: 0 },
    { id: 5, from: "username5", flag: 0 },
    { id: 6, from: "username6", flag: 1 },
    { id: 7, from: "username7", flag: 1 },
    { id: 8, from: "username8", flag: 1 },
    { id: 9, from: "username9", flag: 0 },
    { id: 10, from: "username10", flag: 0 },
    { id: 11, from: "username11", flag: 1 },
    { id: 12, from: "username12", flag: 1 },
  ];

  const accountNotiList = [
    // flag 0 : 팔로우를 요청했습니다.
    // flag 1 : 회원님을 팔로우하기 시작했습니다.
    { id: 1, from: "username1", flag: 1 },
    { id: 2, from: "username2", flag: 0 },
    { id: 3, from: "username3", flag: 0 },
    { id: 4, from: "username4", flag: 1 },
  ];

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    // 해당 탭의 전체 알림에 대한 읽음 처리를 서버에 요청
    setValue(newValue);
  };

  const handleClickAllDelete = () => {
    console.log("전체 삭제");
    // 해당 탭의 전체 알림에 대한 삭제를 서버에 요청
  };

  const handleClickAllRead = () => {
    console.log("전체 읽음");
    // 해당 탭의 전체 알림에 대한 읽음 처리를 서버에 요청
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
                {activityNotiList.map((item) => {
                  if (item.flag === 0) {
                    return <LikeNoti key={item.id} from={item.from} />;
                  } else {
                    return <CommentNoti key={item.id} from={item.from} />;
                  }
                })}
              </TabPanel>
              <TabPanel className="notification__tabpanel" value="1">
                {accountNotiList.map((item) => {
                  if (item.flag === 0) {
                    return <FollowRequestNoti key={item.id} from={item.from} />;
                  } else {
                    return <FollowNoti key={item.id} from={item.from} />;
                  }
                })}
              </TabPanel>
            </TabContext>
          </ThemeProvider>
          <Grid className="notification__bottom" container direction="row">
            <Grid className="notification__bottom__delete">
              <p onClick={handleClickAllDelete}>전체 삭제</p>
            </Grid>
            <Grid className="notification__bottom__read">
              <p onClick={handleClickAllRead}>전체 읽음</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomNavbar
        sideMenuIdx={sideMenuIdx}
        bottomMenuIdx={bottomMenuIdx}
        onSetSideMenuIdx={onSetSideMenuIdx}
        onSetBottomMenuIdx={onSetBottomMenuIdx}
      />
    </Grid>
  )
}

export default MobileNotiPage