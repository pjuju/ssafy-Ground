import { Grid } from "@mui/material";
import { badges } from "./badgeIcon";

function UserGroundBadge() {
  return (
    <Grid container textAlign="center">
      <Grid item xs={6} sm={3}>
        <img width="18px" src={badges[0]} alt="golf_img" />
        <img width="18px" src={badges[1]} alt="golf_img" />
        <img width="18px" src={badges[2]} alt="golf_img" />
        <img width="18px" src={badges[3]} alt="golf_img" />
        <img width="18px" src={badges[4]} alt="golf_img" />
      </Grid>
      <Grid item xs={6} sm={3}>
        <img width="18px" src={badges[5]} alt="golf_img" />
        <img width="18px" src={badges[6]} alt="golf_img" />
        <img width="18px" src={badges[7]} alt="golf_img" />
        <img width="18px" src={badges[8]} alt="golf_img" />
        <img width="18px" src={badges[9]} alt="golf_img" />
      </Grid>
      <Grid item xs={6} sm={3}>
        <img width="18px" src={badges[10]} alt="golf_img" />
        <img width="18px" src={badges[11]} alt="golf_img" />
        <img width="18px" src={badges[12]} alt="golf_img" />
        <img width="18px" src={badges[13]} alt="golf_img" />
        <img width="18px" src={badges[14]} alt="golf_img" />
      </Grid>
      <Grid item xs={6} sm={3}>
        <img width="18px" src={badges[15]} alt="golf_img" />
      </Grid>
    </Grid>
  );
}

export default UserGroundBadge;
