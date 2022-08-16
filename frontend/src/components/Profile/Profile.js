import TitleBar from "components/common/TitleBar";
import "styles/common/_utils.scss";
import "styles/Profile/Profile.scss";

import { Divider, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserArticles from "./UserArticles";
import UserExerciseRecord from "./UserExerciseRecord";
import { useOutletContext } from "react-router-dom";
import { getUserProfile, getUserState } from "api/user";
import LockIcon from "@mui/icons-material/Lock";

function Profile() {
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  // 조회하고자 하는 사용자의 정보
  const [id, setId] = useState("");
  const [privateYN, setPrivateYN] = useState(false);
  const [followState, setFollowState] = useState(0);
  // 내 정보
  const [myId, setMyId] = useState("");

  useEffect(() => {
    // 조회하고자 하는 사용자의 프로필 정보를 받아옴
    const parseURL = window.location.href.split("/");
    const userId = parseURL[parseURL.length - 1];
    setId(userId);

    getUserProfile(userId, (res) => {
      setPrivateYN(res.data.user.privateYN);
      setFollowState(res.data.follow);
    });

    // 내 정보를 받아옴
    getUserState((res) => {
      setMyId(res.data.id);
    });
  });

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
          {privateYN &&
          id !== myId &&
          (followState === 0 || followState === 2) ? (
            <div className="profile--private">
              <IconButton sx={{ marginRight: "0.2rem" }} disabled>
                <LockIcon />
              </IconButton>
              <p>비공개 계정입니다.</p>
            </div>
          ) : (
            <div>
              <UserExerciseRecord />
              <Divider style={{ width: "100%" }} />
              <UserArticles />
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;
