import BottomNavbar from "components/common/Navbar/BottomNavbar";
import SideNavbar from "components/common/Navbar/SideNavbar";
import Notification from "components/common/Notification/Notification";
import { setBottomMenuIdx, setSideMenuIdx } from "modules/menu";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function ProfilePage() {
  const sideMenuIdx = useSelector((state) => state.menu.sideMenuIdx);
  const bottomMenuIdx = useSelector((state) => state.menu.bottomMenuIdx);

  const dispatch = useDispatch();

  const onSetSideMenuIdx = (menuIdx) => dispatch(setSideMenuIdx(menuIdx));
  const onSetBottomMenuIdx = (menuIdx) => dispatch(setBottomMenuIdx(menuIdx));

  useEffect(() => {
    // 새로고침 시 Navbar가 알맞은 메뉴 인덱스를 가리키도록 함
    onSetSideMenuIdx(-1);
    onSetBottomMenuIdx(4);
  }, []);

  return (
    <Grid>
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
    </Grid>
  );
}

export default ProfilePage;
