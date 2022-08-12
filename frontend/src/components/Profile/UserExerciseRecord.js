import UserGroundBadge from "./static/UserGroundBadge";
import UserGroundCalendar from "./static/UserGroundCalendar";
import UserGroundGraph from "./static/UserGroundGraph";
import UserGround from "./UserGround";

const { Grid } = require("@mui/material");

function UserExerciseRecord() {
  return (
    <Grid className="user-ground">
      <Grid className="ground__title">
        <h2>나의 운동장</h2>
        <UserGroundCalendar />
      </Grid>
      <Grid className="ground__content">
        <UserGround />
        <span className="ground__content__more">펼치기</span>
        <Grid display="none">더 많은 정보</Grid>
        <UserGroundBadge />
        <UserGroundGraph />
      </Grid>
    </Grid>
  );
}

export default UserExerciseRecord;
