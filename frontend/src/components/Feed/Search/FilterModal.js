import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import GrButton from "components/common/GrButton";
import GrSelect from "components/common/GrSelect";
import { useState } from "react";
import theme from "components/common/theme.js";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0.5px solid #888",
  p: 4,
};

const labelStyle = {
  color: "black",
  fontWeight: "600",
};

const interest = [
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

function FilterModal({ open, handleClose }) {
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const leftInterestCheckList = () => {
    let interestCheckList = [];
    for (let i = 0; i < 8; i++) {
      let item = interest[i];
      interestCheckList.push(
        <FormControlLabel
          key={item.id}
          control={<Checkbox name={item.value} />}
          label={item.value}
        />
      );
    }
    return interestCheckList;
  };

  const rightInterestCheckList = () => {
    let interestCheckList = [];
    for (let i = 8; i < 16; i++) {
      let item = interest[i];
      interestCheckList.push(
        <FormControlLabel
          key={item.id}
          control={<Checkbox name={item.value} />}
          label={item.value}
        />
      );
    }
    return interestCheckList;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Grid className="filter-modal" container direction="column">
          <Grid container>
            <Grid xs={7} item>
              <Grid container direction="column">
                <FormLabel
                  className="filter-modal__label"
                  id="filter-modal__interest"
                  sx={labelStyle}
                >
                  운동 종목
                </FormLabel>
                <Grid container>
                  <Grid xs={6} item>
                    <Grid container direction="column">
                      {leftInterestCheckList()}
                    </Grid>
                  </Grid>
                  <Grid xs={6} item>
                    <Grid container direction="column">
                      {rightInterestCheckList()}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={5} item>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel id="filter-modal__gender" sx={labelStyle}>
                  성별
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    row
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Checkbox />}
                      label="남"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Checkbox />}
                      label="여"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel
                  className="filter-modal__label"
                  id="filter-modal__age"
                  sx={labelStyle}
                >
                  연령대
                </FormLabel>
                <FormControl fullWidth>
                  <Select
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value="">선택 안함</MenuItem>
                    <MenuItem value={10}>10대</MenuItem>
                    <MenuItem value={20}>20대</MenuItem>
                    <MenuItem value={30}>30대</MenuItem>
                    <MenuItem value={40}>40대</MenuItem>
                    <MenuItem value={50}>50대</MenuItem>
                    <MenuItem value={60}>60대 이상</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel
                  className="filter-modal__label"
                  id="filter-modal__location"
                  sx={labelStyle}
                >
                  지역
                </FormLabel>
                <FormControl fullWidth>
                  <Select
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value="">선택 안함</MenuItem>
                    <MenuItem value="서울">서울</MenuItem>
                    <MenuItem value="경기">경기</MenuItem>
                    <MenuItem value="강원">강원</MenuItem>
                    <MenuItem value="충북">충북</MenuItem>
                    <MenuItem value="충남">충남</MenuItem>
                    <MenuItem value="부산">부산</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="filter-modal__button-wrapper" item>
            <GrButton
              className="filter-modal__button"
              xs={1}
              variant="contained"
            >
              필터 설정
            </GrButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default FilterModal;
