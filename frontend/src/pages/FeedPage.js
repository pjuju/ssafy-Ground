import { Grid } from "@mui/material";
import BottomNavbar from "components/common/Navbar/BottomNavbar";
import SideNavbar from "components/common/Navbar/SideNavbar";
import Notification from "components/common/Notification/Notification";
import { setSideMenuIdx, setBottomMenuIdx } from "modules/menu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "styles/common/Navbar.scss";
import "styles/common/Notification.scss";
import "styles/Feed/FeedPage.scss";

function FeedPage() {
  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx)

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));

  return (
    <div>
      <Grid id="desktop" container>
        <SideNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx} />
        <Outlet />
        <Notification />
      </Grid>
      <Grid id="mobile" container>
        <Outlet />
        <BottomNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx} />
      </Grid>
    </div>
  );
}

export default FeedPage;
