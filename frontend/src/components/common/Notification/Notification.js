import { Badge, Grid, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Notification() {
  const [activityNotifCnt, setActivityNotifCnt] = useState(0);
  const [accountNotifCnt, setAccountNotifCnt] = useState(0);
  const [value, setValue] = useState("0");
  const [isClicked, setIsClicked] = useState(false);
  const [notifCnt, setNotifCnt] = useState(5);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Grid className="notification">
      <Grid className="notification__icon">
        {isClicked ? (
          <IconButton onClick={() => handleIconClick()}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        ) : (notifCnt === 0 ? (
          <IconButton onClick={() => handleIconClick()}>
            <NotificationsIcon />
          </IconButton>
        ) : (
          <Badge badgeContent={notifCnt} max={99}>
            <NotificationsIcon />
          </Badge>
        ))}
      </Grid>
      <ThemeProvider theme={theme}>
        <TabContext value={value} centered>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} variant="fullWidth" aria-label="notification tablist">
              <Tab label={`활동(${activityNotifCnt})`} value="0" />
              <Tab label={`계정(${accountNotifCnt})`} value="1" />
            </TabList>
          </Box>
          <TabPanel className="notification__tabpanel" value="0">
            활동 - 수신한 알림이 없습니다.
          </TabPanel>
          <TabPanel className="notification__tabpanel" value="1">
            계정 - 수신한 알림이 없습니다.
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </Grid>
  );
}

export default Notification;
