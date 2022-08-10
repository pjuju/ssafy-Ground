import theme from "components/common/theme.js";
import LikeNoti from "./LikeNoti";
import CommentNoti from "./CommentNoti";
import FollowRequestNoti from "./FollowRequestNoti";
import FollowNoti from "./FollowNoti";
import {
  deleteAccountNoti,
  deleteBoardNoti,
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
  const [deleteCheck, setDeleteCheck] = useState(false);

  useEffect(() => {
    // 서버에서 활동 알림 목록 받아오기
    getBoardNoti((res) => {
      console.log(res.data);
      setActivityNotiList(res.data);
      setActivityNotiCnt(activityNotiList.length);
      // if (activityNotiList.length > 0) {
      //   activityNotiList.map((item) => {
      //     if (!item.checkYN) {
      //       setActivityNotiCnt(activityNotiCnt + 1);
      //     }
      //   });
      // }
    });

    // 서버에서 계정 알림 목록 받아오기
    getAccountNoti((res) => {
      console.log(res.data);
      setAccountNotiList(res.data);
      setAccountNotiCnt(accountNotiList.length);
      // if (accountNotiList.length > 0) {
      //   accountNotiList.map((item) => {
      //     if (!item.checkYN) {
      //       setAccountNotiCnt(accountNotiCnt + 1);
      //     }
      //   });
      // }
    });

    setNotiCnt(activityNotiCnt + accountNotiCnt);
  }, [isClicked, value]);

  const handleClickClose = () => {
    setIsClicked(!isClicked);
  };

  const handleClickOpen = () => {
    setIsClicked(!isClicked);
    // 활동 탭이 먼저 열리므로 서버에 활동 알림 데이터 요청
    readAllBoardNoti((res) => {
      console.log("활동 전체 읽음");
    });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);

    // 현재 탭에 따라 읽음 처리를 서버에 요청
    if (newValue === "0") {
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
  };

  const handleClickAllDelete = () => {
    // 해당 탭의 전체 알림에 대한 삭제를 서버에 요청
    if (value === 0) {
      // 활동 탭 알림 전체 삭제 요청
      activityNotiList.map((item) => {
        deleteBoardNoti(item.id, (res) =>
          console.log("활동" + item.id + " 삭제")
        );
      });
    } else {
      // 계정 탭 알림 전체 삭제 요청
      accountNotiList.map((item) => {
        deleteAccountNoti(item.id, (res) =>
          console.log("계정" + item.id + " 삭제")
        );
      });
    }
  };

  const handleDeleteAccountNoti = (id) => {
    deleteAccountNoti(id, (res) => {
      console.log("계정" + id + " 삭제");
      const deletedList = accountNotiList.filter((item) => (item.id !== id));
      setAccountNotiList(deletedList);
      setAccountNotiCnt(deletedList.length);
    });
  };

  const handleDeleteActivityNoti = (id) => {
    deleteBoardNoti(id, (res) => {
      console.log("활동" + id + " 삭제");
      const deletedList = activityNotiList.filter((item) => (item.id !== id));
      setActivityNotiList(deletedList);
      setActivityNotiCnt(deletedList.length);
    });
    setDeleteCheck(!deleteCheck);
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
              <Badge badgeContent={notiCnt} color="notification">
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
                  <Tab label={`활동(${activityNotiCnt})`} value="0" />
                  <Tab label={`계정(${accountNotiCnt})`} value="1" />
                </TabList>
              </Box>
              <TabPanel className="notification__tabpanel" value="0">
                {activityNotiList.length > 0 &&
                  activityNotiList.map((item, index) => {
                    if (item.type) {
                      return (
                        <LikeNoti
                          key={item.id}
                          id={item.id}
                          idx={index}
                          nickname={item.nickname}
                          isChecked={item.checkYN}
                          handleClickDelete={handleDeleteActivityNoti}
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
                          handleClickDelete={handleDeleteActivityNoti}
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
                          handleClickDelete={handleDeleteAccountNoti}
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
              <Button
                startIcon={<DeleteOutlineIcon />}
                onClick={handleClickAllDelete}
              >
                전체 삭제
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Notification;