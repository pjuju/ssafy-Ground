import theme from "components/common/theme";
import GrButton from "components/common/GrButton";

import { Checkbox, FormControlLabel, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

function FilterButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  let interestList = [
    { id: 1, value: "헬스", isInterested: false },
    { id: 2, value: "요가", isInterested: false },
    { id: 3, value: "필라테스", isInterested: false },
    { id: 4, value: "러닝", isInterested: false },
    { id: 5, value: "홈트레이닝", isInterested: false },
    { id: 6, value: "축구", isInterested: false },
    { id: 7, value: "야구", isInterested: false },
    { id: 8, value: "농구", isInterested: false },
    { id: 9, value: "테니스", isInterested: false },
    { id: 10, value: "배드민턴", isInterested: false },
    { id: 11, value: "등산", isInterested: false },
    { id: 12, value: "수영", isInterested: false },
    { id: 13, value: "골프", isInterested: false },
    { id: 14, value: "볼링", isInterested: false },
    { id: 15, value: "자전거/사이클", isInterested: false },
    { id: 16, value: "기타", isInterested: false },
  ];

  const handleClickFileterButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleChangeCheckBox = (id) => {
    interestList[id - 1].isInterested = !interestList[id - 1].isInterested;
    console.log("id: " + id + ` / interestList[${id - 1}].isInterested: ` + interestList[id - 1].isInterested);
  }


  const handleClickSave = () => {
    console.log("서버에 관심 운동 종목 설정 변경 요청");
  }

  return (
    <IconButton ref={anchorEl}>
      <AutoAwesomeOutlinedIcon
        onClick={handleClickFileterButton} />
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
        <p className="interest-filter__desc">설정한 관심 운동 종목을 바탕으로 최신 글이 보입니다.</p>
        <Grid>
          <ThemeProvider theme={theme}>
            {interestList.map((item) => {
              console.log(item);
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
        <Grid className="interest-filter__button" >
          <GrButton variant="contained" children="설정 저장하기" onClick={handleClickSave} />
        </Grid>
      </Menu>
    </IconButton>
  );
}

export default FilterButton;
