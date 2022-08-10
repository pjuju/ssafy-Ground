import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";

function ProfileButton({ nickname, image, email }) {
  return (
    <Grid className="profile-button" container>
      <Grid className="profile-button__img" item>
        <img src={userImage} />
      </Grid>
      <Grid item>
        <Grid
          className="profile-button__user-info"
          container
          direction="column"
        >
          <Grid className="profile-button__user-info__name">{nickname}</Grid>
          <Grid className="profile-button__user-info__email">{email}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileButton;
