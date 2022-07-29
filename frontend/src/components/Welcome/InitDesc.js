import theme from "components/common/theme.js";

import { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import GrTextField from "components/common/GrTextField";
import GrButton from "components/common/GrButton";

function InitDesc({ desc, onSetDesc, onSetDescFlag }) {
  useEffect(() => {});

  const handleChangeDesc = (event) => {
    onSetDesc(event.target.value);
  };

  /* 건너뛰기 혹은 다음 버튼을 눌렀을 때 실행되는 핸들러 */
  const handleClickSubmit = (type) => {
    onSetDescFlag();
  };

  return (
    <Grid className="initial-settings__desc" container direction="column">
      <Grid item>
        <h3 className="initial-settings__desc__title">
          자신을 한마디로 소개해 보세요!
        </h3>
      </Grid>
      <Grid className="initial-settings__desc__input" item>
        <GrTextField
          value={desc}
          className="initial-settings__desc__input__textfield"
          variant="outlined"
          label="한줄 소개"
          onChange={handleChangeDesc}
        />
      </Grid>
      <Grid className="initial-settings__desc__submit-button" item>
        <GrButton
          variant={desc === "" ? "outlined" : "contained"}
          children={desc === "" ? "건너뛰기" : "다음"}
          onClick={handleClickSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default InitDesc;
