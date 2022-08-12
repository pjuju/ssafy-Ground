import userImage from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserProfile, getUserState } from "api/user";
import SettingsIcon from "@mui/icons-material/Settings";
import GrButton from "components/common/GrButton";

function UserInfo() {
  // 조회하고자 하는 사용자의 정보
  const [id, setId] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [nickname, setNickname] = useState("");
  // const [userImage, setUserImage] = useState("");
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);

  // 내 정보
  const [myId, setMyId] = useState("");

  useEffect(() => {
    // 조회하고자 하는 사용자의 프로필 정보를 받아옴
    const parseURL = window.location.href.split("/");
    const userId = parseURL[parseURL.length - 1];
    setId(userId);

    getUserProfile(userId, (res) => {
      setIntroduce(res.data.user.introduce);
      setNickname(res.data.user.nickname);
      // setUserImage(res.data.user.userImage);
      setFollowerCnt(res.data.userFollowerCount);
      setFollowingCnt(res.data.userFollowingCount);
    });

    // 내 정보를 받아옴
    getUserState((res) => {
      setMyId(res.data.id);
    });
  }, []);

  return (
    <Grid className="user-info">
      <Grid className="info-top" container direction="row">
        <Grid className="info-top__img">
          <img src={userImage} />
        </Grid>
        <Grid className="info-top__right">
          <Grid className="info-top__right__name">
            <p>{nickname}</p>
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
        <Grid className="info-top__more">
          {id === myId ? (
            <GrButton
              className="info-top__more__button--accept"
              variant="contained"
              children="팔로우"
            />
          ) : (
            <IconButton className="info-top__more__icon">
              <SettingsIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid className="info-bottom">{introduce}</Grid>
    </Grid>
  );
}

export default UserInfo;
