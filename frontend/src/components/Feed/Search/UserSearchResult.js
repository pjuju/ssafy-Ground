import { Grid } from "@mui/material";
import userImage from "assets/images/userImage.png";

function UserSearchResult({ user }) {
  return (
    <Grid className="user-result__inner" container>
      <div className="user-result__profile-wrapper">
        <img
          className="user-result__profile-img"
          src={userImage}
          alt="user_image"
        />
      </div>
      <Grid item xs={9}>
        <Grid
          className="user-result__info-wrapper"
          container
          alignContent="center"
        >
          <Grid className="user-result__info" container direction="column">
            <Grid className="user-result__info__nickname" item>
              {user.nickname}
            </Grid>
            <Grid className="user-result__info__userId" item>
              {user.username}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserSearchResult;
