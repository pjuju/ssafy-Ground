import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";

function ProfileButton() {
  const userName = "가나다라마바사아";
  const userEmail = "user@email.com";

  return (
    <Grid className="profile-button heartbeat" container>
      <Grid className="profile-button__img" item>
        <img src={userImage} />
      </Grid>
      <Grid item>
        <Grid className="profile-button__user-info" container direction="column">
          <Grid className="profile-button__user-info__name">
            {userName}
          </Grid>
          <Grid className="profile-button__user-info__email">
            {userEmail}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileButton;