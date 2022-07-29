import Grid from "@mui/material/Grid";
<<<<<<< HEAD
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
=======
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
>>>>>>> front
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
<<<<<<< HEAD
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
=======

import "styles/Register/RegisterPage.scss";
>>>>>>> front

import { useState } from "react";

const ages = [
  { value: "0", content: "선택 안함" },
  { value: "10", content: "10대" },
  { value: "20", content: "20대" },
  { value: "30", content: "30대" },
  { value: "40", content: "40대" },
  { value: "50", content: "50대" },
  { value: "60", content: "60대 이상" },
];

const ageList = ages.map((item, index) => (
  <MenuItem key={index} value={item.value}>
    {item.content}
  </MenuItem>
));

<<<<<<< HEAD
function OtherInfo({ changeOtherInfo, sendRequest }) {
  const [nickName, setNickName] = useState("");
  const [age, setAge] = useState(ages[0].value);
  const [gender, setGender] = useState("male");

  // 회원가입 버튼 핸들러
  const onClickRegister = () => {
    const newOtherInfo = {
      nickname: nickName,
      age: age,
      gender: gender,
    };
    changeOtherInfo(newOtherInfo);

    sendRequest();
  };

  return (
    <>
      <Grid
        className="register-form__inner-wrapper"
        container
        justifyContent="space-between"
      >
        <GrTextField
          className="register-form__field"
          size="small"
          label="닉네임"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <GrButton className="register-form__innerBtn" variant="contained">
          중복확인
        </GrButton>
      </Grid>
      <Grid
        className="register-form__select-field"
        container
        justifyContent="space-between"
      >
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="age-label">연령대</InputLabel>
          <Select
            labelId="age-label"
            label="연령대"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          >
=======
function OtherInfo() {
  const [age, setAge] = useState(ages[0].value);

  return (
    <Grid className="register-form__bottom" item>
      <Grid className="id-field" container justifyContent="center">
        <TextField size="small" label="닉네임" />
        <Button variant="contained">중복 확인</Button>
      </Grid>
      <Grid className="select-field" container justifyContent="space-between">
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="age-label">연령대</InputLabel>
          <Select labelId="age-label" label="연령대" value={age}>
>>>>>>> front
            {ageList}
          </Select>
        </FormControl>
        <Divider orientation="vertical" flexItem />
        <FormControl>
<<<<<<< HEAD
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="남" />
            <FormControlLabel value="female" control={<Radio />} label="여" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <GrButton
        className="register-form__button"
        variant="contained"
        onClick={onClickRegister}
      >
        회원가입
      </GrButton>
    </>
=======
          <RadioGroup row>
            <FormControlLabel value="female" control={<Radio />} label="남" />
            <FormControlLabel value="male" control={<Radio />} label="여" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
>>>>>>> front
  );
}

export default OtherInfo;
