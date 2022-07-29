import theme from "components/common/theme.js";

import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function InitInterest({
  interest,
  interestCnt,
  onToggleInterest,
  onSetInterestCnt,
  onSetInterestFlag,
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

  /* 건너뛰기 혹은 다음 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickSubmit = () => {
    onSetInterestFlag();
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
                  <Checkbox onChange={() => handleChangeInterest(item.id)} />
                }
              />
            );
          })}
        </ThemeProvider>
      </Grid>
      <Grid className="initial-settings__desc__submit-button" item>
        <ThemeProvider theme={theme}>
          <Button
            variant={interestCnt === 0 ? "outlined" : "contained"}
            onClick={handleClickSubmit}
          >
            {interestCnt === 0 ? "건너뛰기" : "다음"}
          </Button>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

export default InitInterest;
