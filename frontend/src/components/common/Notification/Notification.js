import theme from "components/common/theme.js";
import LikeNoti from "./LikeNoti";
import CommentNoti from "./CommentNoti";
import FollowRequestNoti from "./FollowRequestNoti";
import FollowNoti from "./FollowNoti";
import {
  getAccountNoti,
  getBoardNoti,
  readAllAccountNoti,
  readAllBoardNoti,
} from "api/notification";

import { Badge, Button, Grid, IconButton, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Notification() {
  const [activityNotiList, setActivityNotiList] = useState([]);
  const [accountNotiList, setAccountNotiList] = useState([]);
  const [activityNotiCnt, setActivityNotiCnt] = useState(0);
  const [accountNotiCnt, setAccountNotiCnt] = useState(0);
  const [notiCnt, setNotiCnt] = useState(0);
  const [value, setValue] = useState("0");
  const [isClicked, setIsClicked] = useState(false);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    // 서버에서 활동 알림 목록 받아오기
    getBoardNoti(userToken, (res) => {
      console.log(res);
      setActivityNotiList(res);
      if (activityNotiList.length > 0) {
        setActivityNotiCnt(res.data.length);
      }
    });

    // 서버에서 계정 알림 목록 받아오기
    getAccountNoti(userToken, (res) => {
      console.log(res.data);
      setAccountNotiList(res.data);
      if (accountNotiList.length > 0) {
        setAccountNotiCnt(res.data.length);
      }
    });

    setNotiCnt(activityNotiCnt + accountNotiCnt);

    // 현재 탭에 따라 읽음 처리를 서버에 요청
    if (value === 0) {
      // 활동 탭을 보고 있다면 활동 탭의 알림들의 읽음 처리를 요청
      readAllBoardNoti(userToken, (res) => {
        console.log("활동 전체 읽음");
      });
    } else {
      // 계정 탭을 보고 있다면 계정 탭의 알림들의 읽음 처리를 요청
      readAllAccountNoti(userToken, (res) => {
        console.log("계정 전체 읽음");
      });
    }
  }, [accountNotiCnt, activityNotiCnt, value]);

  const handleClickClose = () => {
    setIsClicked(!isClicked);
  };

  const handleClickOpen = () => {
    setIsClicked(!isClicked);
    // 서버에 알림 데이터 요청
  };

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
    <Grid className="notification">
      <Grid className="notification__icon">
        {isClicked ? (
          <ThemeProvider theme={theme}>
            <IconButton color="primary" onClick={handleClickClose}>
              <NotificationsIcon />
            </IconButton>
          </ThemeProvider>
        ) : notiCnt === 0 ? (
          <IconButton onClick={handleClickOpen}>
            <NotificationsIcon />
          </IconButton>
        ) : (
          <ThemeProvider theme={theme}>
            <IconButton onClick={handleClickOpen}>
              <Badge badgeContent={4} color="notification">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </ThemeProvider>
        )}
      </Grid>
      {isClicked && (
        <Grid>
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
          <Grid className="notification__bottom" container direction="row">
            <Grid className="notification__bottom__delete">
              <Button startIcon={<DeleteOutlineIcon />}>전체 삭제</Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Notification;
