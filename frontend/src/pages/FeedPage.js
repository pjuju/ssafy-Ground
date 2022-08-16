import "styles/common/Navbar.scss";
import "styles/common/Notification.scss";
import "styles/Feed/CreateFeed.scss";
import "styles/Feed/UpdateFeed.scss"
import "styles/common/_utils.scss";
import "styles/common/article.scss";

import BottomNavbar from "components/common/Navbar/BottomNavbar";
import SideNavbar from "components/common/Navbar/SideNavbar";
import Notification from "components/common/Notification/Notification";
import { setSideMenuIdx, setBottomMenuIdx } from "modules/menu";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { useAuth } from "auth/AuthProvider";

function FeedPage() {
  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx);

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));

  const { token } = useAuth();

  if(!token) {
    alert("로그인이 필요한 서비스입니다.")
    console.log("feed")
    return <Navigate to="/" />;
  }

  return (
    <div className="outlet">
      <Grid id="desktop" container>
        <SideNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
        <Outlet context={[onSetSideMenuIdx, onSetBottomMenuIdx]} />
        <Notification />
      </Grid>
      <Grid id="mobile" container>
        <Outlet context={[onSetSideMenuIdx, onSetBottomMenuIdx]} />
        <BottomNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
      </Grid>
    </div>
  );
}

export default FeedPage;
