import { Grid } from "@mui/material";
import Navbar from "components/common/Navbar/Navbar";
import Notification from "components/common/Notification/Notification";
import { setMenu } from "modules/menu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function FeedPage() {
  const menu = useSelector((state) => state.menu.menu);

  const dispatch = useDispatch();

  const onSetMenu = (menu) => dispatch(setMenu(menu));

  return (
    <Grid container>
      <Grid item>
        <Navbar menu={menu} onSetMenu={onSetMenu} />
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
      <Grid item>
        <Notification />
      </Grid>
    </Grid>
  );
}

export default FeedPage;
