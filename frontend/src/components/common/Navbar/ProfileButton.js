import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileButton({ id, nickname, image, email, username }) {
  const navigate = useNavigate();

  const handleClickProfileButton = () => {
    console.log("efe");
    navigate(`/profile/${id}`);
    window.location.reload();
  };

  return (
    <Grid
      className="profile-button"
      container
      onClick={handleClickProfileButton}
    >
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
