import { Grid } from "@mui/material";
import GrButton from "components/common/GrButton";
import "styles/Profile/Follow.scss";
import userImg from "assets/images/userImage.png";
import { deleteFollower, requestFollow, requestUnfollow } from "api/follow";
import { useEffect, useState } from "react";

function FollowerUserProfile({
  userId,
  userImage,
  nickname,
  username,
  followState,
  setRerender,
  rerender,
  setDeleteRerender,
  deleteRerender,
}) {
  const [buttonState, setButtonState] = useState(followState);

  /* 팔로우 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickFollow = () => {
    requestFollow(userId, (res) => {
      // 프로필 페이지 자체를 리렌더링 하기 위함
      setRerender((rerender) => !rerender);
      // 버튼 모양을 변경하기 위함
      setButtonState(2);
    });
  };

  /* 언팔로우 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickUnfollow = () => {
    requestUnfollow(userId, (res) => {
      setRerender((rerender) => !rerender);
      setButtonState(0);
    });
  };

  /* 요청 전송됨 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickIng = () => {
    requestUnfollow(userId, (res) => {
      setRerender((rerender) => !rerender);
      setButtonState(0);
      console.log(res);
    });
  };

  const handleClickDelete = () => {
    deleteFollower(userId, (res) => {
      setRerender((rerender) => !rerender);
      setDeleteRerender((deleteRerender) => !deleteRerender);
    });
  };

  return (
    <Grid className="follower-user-profile" container direction="column">
      <Grid className="follower-user-profile__img">
        <img src={userImg} />
      </Grid>
      <Grid
        className="follower-user-profile__text-info"
        container
        direction="column"
      >
        <Grid className="follower-user-profile__text-info__nickname">
          {nickname}
        </Grid>
        <Grid className="follower-user-profile__text-info__user-id">
          {username}
        </Grid>
      </Grid>
      <Grid className="follower-user-profile__button">
        {buttonState === 0 ? (
          <GrButton
            className="follower-user-profile__button--follow"
            variant="contained"
            children="팔로우"
            onClick={handleClickFollow}
          />
        ) : buttonState === 1 ? (
          <GrButton
            className="follower-user-profile__button--unfollow"
            variant="outlined"
            children="언팔로우"
            onClick={handleClickUnfollow}
          />
        ) : (
          <GrButton
            className="follower-user-profile__button--ing"
            variant="outlined"
            children="요청 전송됨"
            onClick={handleClickIng}
          />
        )}
        <GrButton
          className="follower-user-profile__button--delete"
          variant="outlined"
          children="삭제"
          color="warning"
          onClick={handleClickDelete}
        />
      </Grid>
    </Grid>
  );
}

export default FollowerUserProfile;
