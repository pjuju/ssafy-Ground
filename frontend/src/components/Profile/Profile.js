import TitleBar from "components/common/TitleBar";
import "styles/common/_utils.scss";
import "styles/Profile/Profile.scss";

import { Divider, Grid } from "@mui/material";
import { useEffect } from "react";
import UserInfo from "./UserInfo";
import UserArticles from "./UserArticles";
import UserExerciseRecord from "./UserExerciseRecord";
import { useOutletContext } from "react-router-dom";

function Profile() {
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  return (
    <Grid className="content profile">
      <Grid className="content__title-desktop">
        <h2>프로필</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="프로필" />
      </Grid>
      <Grid id="inner" className="content__inner">
        <Grid className="profile">
          <UserInfo />
          <Divider style={{ width: "100%" }} />
          <UserExerciseRecord />
          <Divider style={{ width: "100%" }} />
          <UserArticles />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;
