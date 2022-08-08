import theme from "components/common/theme.js";
import GrButton from "components/common/GrButton";

import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function InitInterest({
  interest,
  interestCnt,
  onToggleInterest,
  onSetInterestCnt,
  onSetInitFlag,
}) {
  /* 관심 운동 종목 설정에서 체크박스가 바뀔 때 호출되는 핸들러 */
  const handleChangeInterest = (id) => {
    onToggleInterest(id);
    if (interest[id - 1].isInterested === true) {
      onSetInterestCnt(interestCnt + 1);
    } else {
      onSetInterestCnt(interestCnt - 1);
    }
  };

  /* 이전 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickPrevious = () => {
    onSetInitFlag(1);
  };

  /* 건너뛰기 혹은 다음 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickSubmit = () => {
    onSetInitFlag(3);
  };

  return (
    <Grid className="initial-settings__interest" container direction="column">
      <Grid item>
        <h3 className="initial-settings__interest__title">
          지금 하고 있거나, 평소에 관심 있는 운동 종목을 골라주세요!
        </h3>
      </Grid>
      <Grid className="initial-settings__interest__checkbox" item>
        <ThemeProvider theme={theme}>
          {interest.map((item) => {
            return (
              <FormControlLabel
                className="initial-settings__interest__checkbox__box"
                key={item.id}
                label={item.value}
                value={item.isInterested}
                control={
                  <Checkbox
                    checked={item.isInterested}
                    onChange={() => handleChangeInterest(item.id)}
                  />
                }
              />
            );
          })}
        </ThemeProvider>
      </Grid>
      <Grid className="initial-settings__interest__button" item>
        <Grid className="initial-settings__interest__button--previous">
          <GrButton
            variant="outlined"
            children="이전"
            onClick={handleClickPrevious}
          />
        </Grid>
        <Grid className="initial-settings__interest__button--submit">
          <GrButton
            variant={interestCnt === 0 ? "outlined" : "contained"}
            children={interestCnt === 0 ? "건너뛰기" : "다음"}
            onClick={handleClickSubmit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InitInterest;
