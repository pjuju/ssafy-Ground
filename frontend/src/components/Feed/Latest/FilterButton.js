import theme from "components/common/theme";
import GrButton from "components/common/GrButton";

import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
} from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

function FilterButton({
  interestList,
  onToggleInterestList,
  submitUserDetail,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClickFileterButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleChangeCheckBox = (id) => {
    console.log(id + "를 토글함");
    onToggleInterestList(id);
  };

  const handleClickSave = () => {
    console.log("서버에 관심 운동 종목 설정 변경 요청");
    submitUserDetail();
  };

  return (
    <IconButton ref={anchorEl}>
      <AutoAwesomeOutlinedIcon onClick={handleClickFileterButton} />
      <Menu
        className="interest-filter"
        aria-labelledby="filter-button"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <h3 className="interest-filter__title">관심 운동 종목 설정</h3>
        <p className="interest-filter__desc">
          설정한 관심 운동 종목을 바탕으로 최신 글이 보입니다.
        </p>
        <Grid>
          <ThemeProvider theme={theme}>
            {interestList.map((item) => {
              return (
                <FormControlLabel
                  className="interest-filter__checkbox"
                  key={item.id}
                  label={item.value}
                  value={item.isInterested}
                  control={
                    <Checkbox
                      checked={item.isInterested}
                      onChange={() => handleChangeCheckBox(item.id)}
                    />
                  }
                />
              );
            })}
          </ThemeProvider>
        </Grid>
        <Grid className="interest-filter__button">
          <GrButton
            variant="contained"
            children="설정 저장하기"
            onClick={handleClickSave}
          />
        </Grid>
      </Menu>
    </IconButton>
  );
}

export default FilterButton;
