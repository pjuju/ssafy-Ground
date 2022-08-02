import { Grid } from "@mui/material";
import BottomNavbar from "components/common/Navbar/BottomNavbar";
import SideNavbar from "components/common/Navbar/SideNavbar";
import Notification from "components/common/Notification/Notification";
import { setMenuIdx } from "modules/menu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function FeedPage() {
  const menuIdx = useSelector((state) => state.menu.menuIdx);

  const dispatch = useDispatch();

  const onSetMenuIdx = (menuIdx) => dispatch(setMenuIdx(menuIdx));

  return (
    <div>
      <Grid id="desktop" container>
        <SideNavbar menuIdx={menuIdx} onSetMenuIdx={onSetMenuIdx} />
        <Outlet />
        <Notification />
      </Grid>
      <Grid id="mobile" container>
        <Outlet />
        <Notification />
        <BottomNavbar menuIdx={menuIdx} onSetMenuIdx={onSetMenuIdx} />
      </Grid>
    </div>
  );
}

export default FeedPage;
