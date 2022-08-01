import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const ages = [
  { value: "0", label: "선택 안함" },
  { value: "10", label: "10대" },
  { value: "20", label: "20대" },
  { value: "30", label: "30대" },
  { value: "40", label: "40대" },
  { value: "50", label: "50대" },
  { value: "60", label: "60대 이상" },
];

const ageList = ages.map((item, index) => (
  <MenuItem key={index} value={item.value}>
    {item.label}
  </MenuItem>
));

const nickNameReg = /^[가-힣a-zA-Z0-9]{2,8}$/;

function OtherInfo({ changeOtherInfo, sendRequest }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      nickName: "",
      age: ages[0].value,
      gender: "male",
    },
  });

  const onSubmit = (data) => {
    const newOtherInfo = {
      nickName: data.nickName,
      age: data.age,
      gender: data.gender,
    };
    changeOtherInfo(newOtherInfo);
    sendRequest();
  };

  const onNickNameDuplicated = () => {
    const nickName = getValues("nickName");
    console.log("닉네임 중복 확인: " + nickName);
  };

  return (
    <form className="register-form__bottom">
      <Grid
        className="register-form__inner-wrapper"
        container
        direction="column"
      >
        <Grid container justifyContent="space-between">
          <Controller
            name="nickName"
            control={control}
            render={({ field }) => (
              <GrTextField
                className="register-form__field"
                size="small"
                label="닉네임"
                {...field}
                {...register("nickName", {
                  required: "닉네임을 입력해주세요",
                  pattern: {
                    value: { nickNameReg },
                    message: "닉네임은 한글, 영문 대소문자, 숫자 2-8자입니다.",
                  },
                })}
              />
            )}
          />
          <GrButton
            className="register-form__innerBtn"
            variant="contained"
            onClick={onNickNameDuplicated}
          >
            중복확인
          </GrButton>
        </Grid>
        <Grid item>
          {errors.nickName && (
            <ErrorMessage>{errors.nickName.message}</ErrorMessage>
          )}
        </Grid>
      </Grid>
      <Grid
        className="register-form__select-field"
        container
        justifyContent="space-between"
      >
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="age-label">연령대</InputLabel>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Select labelId="age-label" label="연령대" {...field}>
                {ageList}
              </Select>
            )}
          />
        </FormControl>
        <Divider orientation="vertical" flexItem />
        <FormControl>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value="male" label="남" control={<Radio />} />
                <FormControlLabel
                  value="female"
                  label="여"
                  control={<Radio />}
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Grid>
      <GrButton
        className="register-form__button"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        회원가입
      </GrButton>
    </form>
  );
}

export default OtherInfo;
