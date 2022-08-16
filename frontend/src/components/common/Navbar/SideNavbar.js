import UnderLineLogo from "assets/images/underline_logo.png";
import ProfileButton from "components/common/Navbar/ProfileButton";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserState, logout } from "api/user";
import CustomModal from "../CustomModal";
import { useAuth } from "auth/AuthProvider";

function SideNavbar({
  sideMenuIdx,
  bottomMenuIdx,
  onSetSideMenuIdx,
  onSetBottomMenuIdx,
}) {
  const [id, setId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { systemLogout } = useAuth();

  useEffect(() => {
    let element;
    if (sideMenuIdx !== -1) {
      element = document
        .querySelector(`.navbar-side__menu a:nth-child(${sideMenuIdx + 1})`)
        .querySelector("h3");
      if (element) {
        element.className = "bold";
      }
    }

    // 사용자 정보 가져오기
    getUserState((res) => {
      setId(res.data.id);
      setNickname(res.data.nickname);
      setImage(res.data.userImage);
      setEmail(res.data.email);
      setUsername(res.data.username);
    });

    return () => {
      if (element) {
        element.className = "";
      }
    };
  }, [sideMenuIdx, bottomMenuIdx]);

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
    logout(
      () => {
        // localStorage.removeItem("token");
        systemLogout();
        navigate("/");
      },
      (err) => {
        // JWT 토근이 만료되어 500 에러가 반환됐다면
        if (err.response.status === 500) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    );
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
        <p className="navbar-side__menu__logout" onClick={() => setOpen(true)}>
          로그아웃
        </p>
        <CustomModal
          open={open}
          setOpen={setOpen}
          title="로그아웃 하시겠습니까?"
          type="0"
          handleClickOKButton={handleClickLogout}
        />
      </Grid>
      <Grid className="navbar-side__profile" item>
        <ProfileButton
          id={id}
          nickname={nickname}
          image={image}
          email={email}
          username={username}
        />
      </Grid>
    </Grid>
  );
}

export default SideNavbar;
