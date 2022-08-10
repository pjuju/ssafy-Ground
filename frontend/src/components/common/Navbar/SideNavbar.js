import UnderLineLogo from "assets/images/underline_logo.png";
import ProfileButton from "components/common/Navbar/ProfileButton";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "api/user";

function SideNavbar({
  sideMenuIdx,
  bottomMenuIdx,
  onSetSideMenuIdx,
  onSetBottomMenuIdx,
}) {
  const [nickname, setNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let element;
    if (sideMenuIdx !== -1) {
      element = document
        .querySelector(`.navbar-side__menu a:nth-child(${sideMenuIdx + 1})`)
        .querySelector("h3");
      element.className = "bold";
    }

    // 사용자 정보 가져오기
    getUserInfo((res) => console.log(res.data));

    return () => {
      if (sideMenuIdx !== -1) {
        element.className = "";
      }
    };
  });

  const handleMenuClick = (menuIdx) => {
    switch (menuIdx) {
      case 1:
      case 2:
        onSetBottomMenuIdx(menuIdx + 1);
        break;
      default:
        onSetBottomMenuIdx(menuIdx);
        break;
    }
    onSetSideMenuIdx(menuIdx);
  };

  return (
    <Grid className="navbar-side" container direction="column">
      <Grid className="navbar-side__logo" item>
        <Link to="/feed/follow" onClick={() => handleMenuClick(0)}>
          <img src={UnderLineLogo} />
        </Link>
      </Grid>
      <Grid className="navbar-side__menu">
        <Link to="/feed/follow" onClick={() => handleMenuClick(0)}>
          <h3>팔로우 피드</h3>
        </Link>
        <Link to="/feed/latest" onClick={() => handleMenuClick(1)}>
          <h3>최신 글 피드</h3>
        </Link>
        <Link to="/feed/search" onClick={() => handleMenuClick(2)}>
          <h3>검색</h3>
        </Link>
        <h5 className="navbar-side__menu__logout">로그아웃</h5>
      </Grid>
      <Grid className="navbar-side__profile" item>
        <Link to="/profile/1">
          <ProfileButton />
        </Link>
      </Grid>
    </Grid>
  );
}

export default SideNavbar;
