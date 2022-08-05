import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import GrButton from "components/common/GrButton";
import theme from "components/common/theme.js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { interest } from "./initData";

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

function FilterModal({ open, handleClose, ...props }) {
  const [interestList, setInterestList] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [interestRadio, setInterestRadio] = useState("all");

  const { control } = useForm({ defaultValues: { interestList: [] } });


  const handleInterestCheckBoxChange = (e) => {
    const isCheck = e.target.checked;
    const name = e.target.name;
    if (isCheck) {
      setInterestList([...interestList, name]);
    } else {
      setInterestList(interestList.filter((i) => i !== name));
    }
  };

  const handleGenderCheckBoxChange = (e) => {
    const isCheck = e.target.checked;
    const name = e.target.name;
    if (isCheck) {
      setGender([...gender, name]);
    } else {
      setGender(gender.filter((i) => i !== name));
    }
  };

  const leftInterestCheckList = () => {
    let interestCheckList = [];
    for (let i = 0; i < 8; i++) {
      let item = interest[i];
      interestCheckList.push(
        <FormControlLabel
          control={
            <Controller 

            />
          }
          label={item.value}
          key={item.id}
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
          control={
            <Checkbox
              name={item.value}
              onChange={handleInterestCheckBoxChange}
            />
          }
          label={item.value}
          key={item.id}
        />
      );
    }
    return interestCheckList;
  };

  const onModalClose = () => {
    setInterestList(props.interestList);
    setGender(props.gender);
    setAge(props.age);
    setLocation(props.location);
    handleClose();
  };

  const onSubmit = () => {
    console.log(interestList);
    console.log(gender);
    console.log(age);
    console.log(location);
    props.setInterestList(interestList);
    props.setGender(gender);
    props.setAge(age);
    props.setLocation(location);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onModalClose}
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
                <ThemeProvider theme={theme}>
                  <FormControl>
                    <RadioGroup
                      row
                      value={interestRadio}
                      onChange={(e) => {
                        setInterestRadio(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="all"
                        label="전체"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="custom"
                        label="직접 선택"
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </FormControl>

                  {interestRadio === "custom" && (
                    <FormControl>
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
                    </FormControl>
                  )}
                </ThemeProvider>
              </Grid>
            </Grid>
            <Grid xs={5} item>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel
                  className="filter-modal__label"
                  id="filter-modal__gender"
                  sx={labelStyle}
                >
                  성별
                </FormLabel>
                <FormControl fullWidth>
                  <ThemeProvider theme={theme}>
                    <Select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      size="small"
                    >
                      <MenuItem value="">선택 안함</MenuItem>
                      <MenuItem value="male">남</MenuItem>
                      <MenuItem value="female">여</MenuItem>
                    </Select>
                  </ThemeProvider>
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
              onClick={onSubmit}
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
