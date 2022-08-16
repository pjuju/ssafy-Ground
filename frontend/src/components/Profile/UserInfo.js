import userImg from "assets/images/userImage.png";

import { Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserProfile, getUserState } from "api/user";
import SettingsIcon from "@mui/icons-material/Settings";
import GrButton from "components/common/GrButton";
import FollowerDialog from "./Follow/FollowerDialog";
import FollowingDialog from "./Follow/FollowingDialog";
import { useNavigate } from "react-router-dom";
import { requestFollow, requestUnfollow } from "api/follow";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";
import LockIcon from "@mui/icons-material/Lock";

function UserInfo() {
  // 조회하고자 하는 사용자의 정보
  const [userId, setUserId] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [nickname, setNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [followState, setFollowState] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [privateYN, setPrivateYN] = useState(false);
  // 내 정보
  const [myId, setMyId] = useState("");

  // 팔로워, 팔로잉 리스트
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  // 내비게이트
  const navigate = useNavigate();

  // 리렌더링 하기 위한 state
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    // 조회하고자 하는 사용자의 프로필 정보를 받아옴
    const parseURL = window.location.href.split("/");
    const id = parseURL[parseURL.length - 1];
    setUserId(id);

    getUserProfile(id, (res) => {
      setIntroduce(res.data.user.introduce);
      setNickname(res.data.user.nickname);
      setUserImage(res.data.user.userImage);
      setFollowerCnt(res.data.userFollowerCount);
      setFollowingCnt(res.data.userFollowingCount);
      setFollowState(res.data.follow);
      setPrivateYN(res.data.user.privateYN);
    });

    // 내 정보를 받아옴
    getUserState((res) => {
      setMyId(res.data.id);
    });
  });

  useEffect(() => {
    fetchImage();
  }, [userImage]);

  useEffect(() => {
    preview();
  });

  const fetchImage = () => {
    const storageRef = ref(storage, `images/${userImage}`);
    console.log(userImage);
    if (userImage !== undefined && userImage !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download");
        setProfileImg(url);
      });
    }
  };

  const preview = () => {
    if (profileImg === "") return false;
    const imgElements = document.querySelectorAll(".info-top__img > img");
    if (imgElements !== null) {
      imgElements.forEach((tag) => {
        tag.src = profileImg;
      });
    }
  };

  const handleOpenFollowerList = () => {
    setFollowerOpen(true);
  };

  const handleOpenFollowingList = () => {
    setFollowingOpen(true);
  };

  const handleCloseFollowerList = () => {
    setFollowerOpen(false);
  };

  const handleCloseFollowingList = () => {
    setFollowingOpen(false);
  };

  /* 프로필 수정 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickEditButton = () => {
    navigate(`/profile/edit/${myId}`);
  };

  /* 팔로우 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickFollow = () => {
    requestFollow(userId, (res) => {
      setRerender((rerender) => !rerender);
    });
  };

  /* 요청 전송됨 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickIng = () => {
    requestUnfollow(userId, (res) => {
      setRerender((rerender) => !rerender);
    });
  };

  /* 언팔로우 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickUnfollow = () => {
    requestUnfollow(userId, (res) => {
      setRerender((rerender) => !rerender);
    });
  };

  return (
    <Grid className="user-info">
      <Grid className="info-top" container direction="row">
        <Grid className="info-top__img">
          <img src={profileImg||userImg}/>
        </Grid>
        <Grid className="info-top__right">
          <Grid className="info-top__right__name">
            <p>{nickname}</p>
            {privateYN && (
              <IconButton>
                <LockIcon />
              </IconButton>
            )}
          </Grid>
          <Grid className="info-top__right__follow" container direction="row">
            <Grid className="follower" onClick={handleOpenFollowerList}>
              <span className="follower__text">팔로워</span>
              <span className="follower__cnt">{followerCnt}</span>
            </Grid>
            <Grid className="following" onClick={handleOpenFollowingList}>
              <span className="following__text">팔로잉</span>
              <span className="following__cnt">{followingCnt}</span>
            </Grid>
          </Grid>
          <FollowerDialog
            onClose={handleCloseFollowerList}
            open={followerOpen}
            profileId={userId}
            userId={myId}
            setRerender={setRerender}
            rerender={rerender}
          />
          <FollowingDialog
            onClose={handleCloseFollowingList}
            open={followingOpen}
            profileId={userId}
            userId={myId}
            setRerender={setRerender}
            rerender={rerender}
          />
        </Grid>
        <Grid className="info-top__more">
          {followState === 1 ? (
            <IconButton
              className="info-top__more__icon"
              onClick={handleClickEditButton}
            >
              <SettingsIcon />
            </IconButton>
          ) : followState === 2 ? (
            <GrButton
              className="info-top__more__button--follow"
              variant="contained"
              children="팔로우"
              onClick={handleClickFollow}
            />
          ) : followState === 3 ? (
            <GrButton
              className="info-top__more__button--ing"
              variant="outlined"
              children="요청 전송됨"
              onClick={handleClickIng}
            />
          ) : (
            <GrButton
              className="info-top__more__button--unfollow"
              variant="outlined"
              children="언팔로우"
              onClick={handleClickUnfollow}
            />
          )}
        </Grid>
      </Grid>
      <Grid className="info-bottom">{introduce}</Grid>
    </Grid>
  );
}

export default UserInfo;
