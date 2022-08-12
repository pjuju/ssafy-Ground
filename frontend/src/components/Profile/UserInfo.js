import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useState } from "react";

function UserInfo() {
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);

  return (
    <Grid className="user-info">
      <Grid className="info-top" container direction="row">
        <Grid className="info-top__img">
          <img src={userImage} />
        </Grid>
        <Grid className="info-top__right">
          <Grid className="info-top__right__name">
            <p>유저 닉네임</p>
          </Grid>
          <Grid className="info-top__right__follow" container direction="row">
            <Grid className="follower">
              <span className="follower__text">팔로워</span>
              <span className="follower__cnt">{followerCnt}</span>
            </Grid>
            <Grid className="following">
              <span className="following__text">팔로잉</span>
              <span className="following__cnt">{followingCnt}</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="info-bottom">한줄 소개</Grid>
    </Grid>
  );
}

export default UserInfo;
