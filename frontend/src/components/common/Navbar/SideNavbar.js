import UnderLineLogo from "assets/images/underline_logo.png";
import "styles/common/Navbar.scss";

import { Grid } from "@mui/material";
import ProfileButton from "./ProfileButton";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SideNavbar({ menuIdx, onSetMenuIdx }) {
  useEffect(() => {
    const element = document
      .querySelector(`.navbar-side__menu a:nth-child(${menuIdx + 1})`)
      .querySelector("h3");
    element.className = "bold";

    return () => {
      element.className = "";
    };
  });

  return (
    <Grid className="navbar-side" container direction="column">
      <Grid className="navbar-side__logo" item>
        <Link to="/feed/follow" onClick={() => onSetMenuIdx(0)}>
          <img src={UnderLineLogo} />
        </Link>
      </Grid>
      <Grid className="navbar-side__menu">
        <Link to="/feed/follow" onClick={() => onSetMenuIdx(0)}>
          <h3>팔로우 피드</h3>
        </Link>
        <Link to="/feed/latest" onClick={() => onSetMenuIdx(1)}>
          <h3>최신 글 피드</h3>
        </Link>
        <Link to="/search" onClick={() => onSetMenuIdx(2)}>
          <h3>검색</h3>
        </Link>
        <h5 className="navbar-side__menu__logout">로그아웃</h5>
      </Grid>
      <Grid className="navbar-side__profile" item>
        <ProfileButton />
      </Grid>
    </Grid>
  );
}

export default SideNavbar;
