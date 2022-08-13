import { Grid } from "@mui/material";
import GrButton from "components/common/GrButton";
import "styles/Profile/Follow.scss";
import userImg from "assets/images/userImage.png";

function FollowingUserProfile({ userImage, nickname, username }) {
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
        <GrButton
          className="follower-user-profile__button--unfollow"
          variant="outlined"
          children="언팔로우"
        ></GrButton>
        <GrButton
          className="follower-user-profile__button--delete"
          variant="outlined"
          children="삭제"
          color="warning"
        ></GrButton>
      </Grid>
    </Grid>
  );
}

export default FollowingUserProfile;
