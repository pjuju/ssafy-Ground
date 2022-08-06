import logo from "assets/images/text_logo.png";
import "styles/Welcome/WelcomePage.scss";

import InitImg from "components/Welcome/InitImg";
import InitDesc from "components/Welcome/InitDesc";
import InitInterest from "components/Welcome/InitInterest";
import InitComplete from "components/Welcome/InitComplete";
import {
  setDesc,
  setImg,
  toggleInterest,
  setInterestCnt,
  setInitFlag,
} from "modules/init";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

function WelcomePage() {
  const state = useSelector((state) => state);
  const img = useSelector((state) => state.init.img);
  const desc = useSelector((state) => state.init.desc);
  const interest = useSelector((state) => state.init.interest);
  const interestCnt = useSelector((state) => state.init.interestCnt);
  const initFlag = useSelector((state) => state.init.initFlag);

  const dispatch = useDispatch();

  const onSetImg = (img) => dispatch(setImg(img));
  const onSetDesc = (desc) => dispatch(setDesc(desc));
  const onToggleInterest = (id) => dispatch(toggleInterest(id));
  const onSetInterestCnt = (cnt) => dispatch(setInterestCnt(cnt));
  const onSetInitFlag = (flag) => dispatch(setInitFlag(flag));

  useEffect(() => {
    console.log(state);
  });

  return (
    <Grid
      className="initial-settings"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <img className="logo" src={logo} alt="text_logo" width="300px" />
      <Grid item>
        {initFlag === 0 ? (
          <InitImg
            img={img}
            onSetImg={onSetImg}
            onSetInitFlag={onSetInitFlag}
          />
        ) : initFlag === 1 ? (
          <InitDesc
            desc={desc}
            onSetDesc={onSetDesc}
            onSetInitFlag={onSetInitFlag}
          />
        ) : initFlag === 2 ? (
          <InitInterest
            interest={interest}
            interestCnt={interestCnt}
            onToggleInterest={onToggleInterest}
            onSetInterestCnt={onSetInterestCnt}
            onSetInitFlag={onSetInitFlag}
          />
        ) : initFlag === 3 ? (
          <InitComplete
            img={img}
            desc={desc}
            interest={interest}
            onSetInitFlag={onSetInitFlag}
          />
        ) : (
          <div>잘못된 접근입니다.</div>
        )}
      </Grid>
    </Grid>
  );
}

export default WelcomePage;
