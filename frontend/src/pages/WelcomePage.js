import logo from "assets/images/text_logo.png";
import "styles/Welcome/WelcomePage.scss";

import InitImg from "components/Welcome/InitImg";
import InitDesc from "components/Welcome/InitDesc";
import InitInterest from "components/Welcome/InitInterest";
import InitComplete from "components/Welcome/InitComplete";
import {
  setDesc,
  setDescFlag,
  setImg,
  setImgFlag,
  setInterestFlag,
  toggleInterest,
  setInterestCnt,
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
  const imgFlag = useSelector((state) => state.init.imgFlag);
  const descFlag = useSelector((state) => state.init.descFlag);
  const interestFlag = useSelector((state) => state.init.interestFlag);

  const dispatch = useDispatch();

  const onSetImg = (img) => dispatch(setImg(img));
  const onSetDesc = (desc) => dispatch(setDesc(desc));
  const onToggleInterest = (id) => dispatch(toggleInterest(id));
  const onSetInterestCnt = (cnt) => dispatch(setInterestCnt(cnt));
  const onSetImgFlag = () => dispatch(setImgFlag());
  const onSetDescFlag = () => dispatch(setDescFlag());
  const onSetInterestFlag = () => dispatch(setInterestFlag());

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
        {imgFlag === false ? (
          <InitImg img={img} onSetImg={onSetImg} onSetImgFlag={onSetImgFlag} />
        ) : imgFlag === true && descFlag === false ? (
          <InitDesc
            desc={desc}
            onSetDesc={onSetDesc}
            onSetDescFlag={onSetDescFlag}
          />
        ) : imgFlag === true && descFlag === true && interestFlag === false ? (
          <InitInterest
            interest={interest}
            interestCnt={interestCnt}
            onToggleInterest={onToggleInterest}
            onSetInterestCnt={onSetInterestCnt}
            onSetInterestFlag={onSetInterestFlag}
          />
        ) : imgFlag === true && descFlag === true && interestFlag === true ? (
          <InitComplete />
        ) : (
          <div>잘못된 접근입니다.</div>
        )}
      </Grid>
    </Grid>
  );
}

export default WelcomePage;
