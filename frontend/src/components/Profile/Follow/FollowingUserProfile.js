import { Grid } from "@mui/material";
import GrButton from "components/common/GrButton";
import "styles/Profile/Follow.scss";
import userImg from "assets/images/userImage.png";

function FollowingUserProfile({ userImage, nickname, username }) {
  return (
    <Grid className="following-user-profile" container direction="column">
      <Grid className="following-user-profile__img">
        <img src={userImg} />
      </Grid>
      <Grid
        className="following-user-profile__text-info"
        container
        direction="column"
      >
        <Grid className="following-user-profile__text-info__nickname">
          {nickname}
        </Grid>
        <Grid className="following-user-profile__text-info__user-id">
          {username}
        </Grid>
      </Grid>
      <Grid className="following-user-profile__button">
        <GrButton variant="outlined" children="언팔로우"></GrButton>
      </Grid>
    </Grid>
  );
}

export default FollowingUserProfile;
