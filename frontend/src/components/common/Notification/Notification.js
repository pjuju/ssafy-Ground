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
import { acceptFollow, declineFollow } from "api/follow";
import CustomModal from "../CustomModal";

function Notification() {
  const [activityNotiList, setActivityNotiList] = useState([]);
  const [accountNotiList, setAccountNotiList] = useState([]);
  const [activityNotiCnt, setActivityNotiCnt] = useState(0);
  const [accountNotiCnt, setAccountNotiCnt] = useState(0);
  const [notiCnt, setNotiCnt] = useState(0);
  const [value, setValue] = useState("0");
  const [isClicked, setIsClicked] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 서버에서 활동 알림 목록 받아오기
    getBoardNoti((res) => {
      setActivityNotiList(res.data);
    });

    getAccountNoti((res) => {
      setAccountNotiList(res.data);
    });
  }, [isClicked, value]);

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
    console.log("account : " + accountNotiCnt);
  }, [activityNotiCnt, accountNotiCnt]);

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
    if (value === "0") {
      // 활동 탭 알림 전체 삭제 요청
      activityNotiList.map((item) => {
        deleteBoardNoti(item.id, (res) =>
          console.log("활동" + item.id + " 삭제")
        );
        setActivityNotiList([]);
      });
    } else {
      // 계정 탭 알림 전체 삭제 요청
      accountNotiList.map((item) => {
        deleteAccountNoti(item.id, (res) =>
          console.log("계정" + item.id + " 삭제")
        );
        setAccountNotiList([]);
      });
    }
  };

  const handleDeleteAccountNoti = (id) => {
    deleteAccountNoti(id, (res) => {
      console.log("계정" + id + " 삭제");
      const deletedList = accountNotiList.filter((item) => item.id !== id);
      setAccountNotiList(deletedList);
      setAccountNotiCnt(deletedList.length);
    });
  };

  const handleDeleteActivityNoti = (id) => {
    deleteBoardNoti(id, (res) => {
      console.log("활동" + id + " 삭제");
      const deletedList = activityNotiList.filter((item) => item.id !== id);
      setActivityNotiList(deletedList);
      setActivityNotiCnt(deletedList.length);
    });
    setDeleteCheck(!deleteCheck);
  };

  const handleClickReject = (id, nickname) => {
    console.log("거절");

    // 서버에 팔로우 거절 요청하기
    declineFollow(id, (res) => console.log(nickname + "의 팔로우 거절"));
    const deletedList = accountNotiList.filter((item) => item.id !== id);
    setAccountNotiList(deletedList);
    setAccountNotiCnt(deletedList.length);
  };

  const handleClickAccept = (id, nickname) => {
    console.log("수락");

    // 서버에 팔로우 수락 요청하기
    acceptFollow(id, (res) => console.log(nickname + "의 팔로우 수락"));
    const deletedList = accountNotiList.filter((item) => item.id !== id);
    setAccountNotiList(deletedList);
    setAccountNotiCnt(deletedList.length);
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
                {activityNotiList.length > 0 ? (
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
                  })
                ) : (
                  <p className="notification__tabpanel--no-noti">
                    수신한 알림이 없습니다.
                  </p>
                )}
              </TabPanel>
              <TabPanel className="notification__tabpanel" value="1">
                {accountNotiList.length > 0 ? (
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
                          fromUserId={item.fromUserId}
                          isChecked={item.checkYN}
                          handleClickReject={handleClickReject}
                          handleClickAccept={handleClickAccept}
                        />
                      );
                    }
                  })
                ) : (
                  <p className="notification__tabpanel--no-noti">
                    수신한 알림이 없습니다.
                  </p>
                )}
              </TabPanel>
            </TabContext>
          </ThemeProvider>
          <Grid className="notification__bottom" container direction="row">
            <Grid className="notification__bottom__delete">
              <Button
                startIcon={<DeleteOutlineIcon />}
                onClick={() => setOpen(true)}
              >
                전체 삭제
              </Button>
            </Grid>
            <CustomModal
              open={open}
              setOpen={setOpen}
              title="알림 전체를 삭제하시겠습니까?"
              type="0"
              handleClickOKButton={handleClickAllDelete}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Notification;