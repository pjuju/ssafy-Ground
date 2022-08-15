import { getUserProfile } from "api/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserGroundBadge from "./static/UserGroundBadge";
import UserGroundCalendar from "./static/UserGroundCalendar";
import UserGroundGraph from "./static/UserGroundGraph";
import UserGround from "./UserGround";

const { Grid } = require("@mui/material");

function UserExerciseRecord() {
  const { userId } = useParams("userId");
  const [Dates, setDates] = useState([]);
  const [category, setCategory] = useState([]);
  const [board, setBoard] = useState([]);
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    getUserProfile(userId, (res) => {
      if (res.data.groundDates.length !== 0) {
        setDates(res.data.groundDates);
        setCategory(res.data.groundCategory);
        setBoard(res.data.userBoardDtos);
        setIsExist(true);
      }
    });
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <Grid className="user-ground">
      <Grid className="ground__title">
        <h2>나의 운동장</h2>
      </Grid>
      <Grid className="ground__content">
        <UserGroundCalendar date={Dates} />
        <span className="ground__content__more" onClick={() => setOpen(!open)}>
          {!open && "펼치기"}
          {open && "접기"}
        </span>
      </Grid>
      {open && (
        <>
          {isExist && (
            <>
              <UserGroundBadge board={board} />
              <UserGroundGraph category={category} />
            </>
          )}
          {!isExist && (<div className="ground__no-record">글을 작성해서 운동장에 잔디를 심으면 상세 정보를 볼 수 있어요!</div>)}
        </>
      )}
    </Grid>
  );
}

export default UserExerciseRecord;
