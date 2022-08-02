import UnderLineLogo from "assets/images/underline_logo.png";
import "styles/common/Navbar.scss";
import theme from "components/common/theme";

import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BadgeButton from "./BadgeButton";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeProvider } from "@emotion/react";
import ProfileButton from "./ProfileButton";
import { useEffect } from "react";

function Navbar({ menu, onSetMenu }) {
  useEffect(() => {
    // const element = document.querySelector(
    //   `.navbar-desktop__menu :nth-child${menu}`
    // );
    // element.className += " bold";
  });

  return (
    <div className="navbar">
      <Grid
        id="desktop"
        className="navbar-desktop"
        container
        direction="column"
      >
        <Grid className="navbar-desktop__logo" item>
          <a href="/feed/follow">
            <img src={UnderLineLogo} />
          </a>
        </Grid>
        <Grid className="navbar-desktop__menu">
          <h3 className="follow pulsate-fwd">
            <a href="/feed/follow">팔로우 피드</a>
          </h3>
          <h3 className="new pulsate-fwd">
            <a href="/">최신 글 피드</a>
          </h3>
          <h3 className="search pulsate-fwd">
            <a href="/">검색</a>
          </h3>
          <h5 className="navbar-desktop__menu__logout">로그아웃</h5>
        </Grid>
        <Grid className="navbar-desktop__profile" item>
          <ProfileButton />
        </Grid>
      </Grid>
      <Grid id="mobile" className="navbar-mobile">
        <ThemeProvider theme={theme}>
          <BottomNavigation
            className="navbar-mobile__bottom-nav"
            showLabels
            value={menu}
            onChange={(event, newValue) => {
              onSetMenu(newValue);
            }}
          >
            <BottomNavigationAction icon={<HomeIcon />} />
            <BottomNavigationAction icon={<BadgeButton />} />
            <BottomNavigationAction icon={<FiberNewOutlinedIcon />} />
            <BottomNavigationAction icon={<SearchOutlinedIcon />} />
            <BottomNavigationAction icon={<PersonIcon />} />
          </BottomNavigation>
        </ThemeProvider>
      </Grid>
    </div>
  );
}

export default Navbar;
