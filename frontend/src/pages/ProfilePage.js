import BottomNavbar from "components/common/Navbar/BottomNavbar";
import SideNavbar from "components/common/Navbar/SideNavbar";
import Notification from "components/common/Notification/Notification";
import Profile from "components/Profile/Profile";
import { setBottomMenuIdx, setSideMenuIdx } from "modules/menu";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage() {
  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx);

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));

  return (
    <Grid>
      <Grid id="desktop" container>
        <SideNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
        <Profile
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
        <Notification />
      </Grid>
      <Grid id="mobile" container>
        <Profile
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
        <BottomNavbar
          sideMenuIdx={sideMenuIdx}
          bottomMenuIdx={bottomMenuIdx}
          onSetSideMenuIdx={onSetSideMenuIdx}
          onSetBottomMenuIdx={onSetBottomMenuIdx}
        />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
