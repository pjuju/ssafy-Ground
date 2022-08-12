import TitleBar from "components/common/TitleBar";
import "styles/common/_utils.scss";
import "styles/Profile/Profile.scss";

import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserArticles from "./UserArticles";
import UserExerciseRecord from "./UserExerciseRecord";

function Profile({ onSetSideMenuIdx, onSetBottomMenuIdx }) {
  useEffect(() => {
    // 새로고침 시 Navbar가 알맞은 메뉴 인덱스를 가리키도록 함
    onSetSideMenuIdx(-1);
    onSetBottomMenuIdx(4);
  }, []);

  return (
    <Grid className="content">
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
