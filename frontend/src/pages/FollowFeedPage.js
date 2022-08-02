import { Grid } from "@mui/material";
import Navbar from "components/Feed/Navbar";
import { setMenu } from "modules/menu";
import { useDispatch, useSelector } from "react-redux";

function FollowFeedPage() {
  const menu = useSelector((state) => state.menu.menu);

  const dispatch = useDispatch();

  const onSetMenu = (menu) => dispatch(setMenu(menu));

  return (
    <Grid container>
      <Navbar menu={menu} onSetMenu={onSetMenu} />
    </Grid>
  )
}

export default FollowFeedPage;