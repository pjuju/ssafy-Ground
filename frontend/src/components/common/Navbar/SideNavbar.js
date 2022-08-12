import UnderLineLogo from "assets/images/underline_logo.png";
import ProfileButton from "components/common/Navbar/ProfileButton";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserState, logout } from "api/user";

function SideNavbar({
  sideMenuIdx,
  bottomMenuIdx,
  onSetSideMenuIdx,
  onSetBottomMenuIdx,
}) {
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let element;
    if (sideMenuIdx !== -1) {
      element = document
        .querySelector(`.navbar-side__menu a:nth-child(${sideMenuIdx + 1})`)
        .querySelector("h3");
      element.className = "bold";
    }

    // 사용자 정보 가져오기
    getUserState((res) => {
      setNickname(res.data.nickname);
      setImage(res.data.image);
      setEmail(res.data.email);
      console.log(nickname);
      console.log(image);
      console.log(email);
    });

    return () => {
      if (sideMenuIdx !== -1) {
        element.className = "";
      }
    };
  }, [sideMenuIdx]);

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

  /* 로그아웃 */
  const handleClickLogout = () => {
    logout(() => {
      localStorage.removeItem("token");
      navigate("/");
    });
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
        <p className="navbar-side__menu__logout" onClick={handleClickLogout}>
          로그아웃
        </p>
      </Grid>
      <Grid className="navbar-side__profile" item>
        <Link to="/profile/1">
          <ProfileButton nickname={nickname} image={image} email={email} />
        </Link>
      </Grid>
    </Grid>
  );
}

export default SideNavbar;
