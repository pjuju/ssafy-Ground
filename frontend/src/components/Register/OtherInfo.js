import Grid from "@mui/material/Grid";
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

import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

import theme from "components/common/theme";
import { ThemeProvider } from "@mui/material/styles";
import OkMessage from "./OkMessage";
import { nicknameDupCheck } from "api/register";
import { useState } from "react";

const age = [
  { id: "teenager", value: "10대", checked: false },
  { id: "twenty", value: "20대", checked: false },
  { id: "thirty", value: "30대", checked: false },
  { id: "forty", value: "40대", checked: false },
  { id: "fifty", value: "50대", checked: false },
  { id: "sixty", value: "60대 이상", checked: false },
];

const ageList = age.map((item, index) => (
  <MenuItem key={index} value={item.id}>
    {item.value}
  </MenuItem>
));

const nickNameReg = /^[가-힣a-zA-Z0-9]{2,8}$/;

function OtherInfo({ sendRequest }) {
  const [isNicknameDupChecked, setIsNicknameDupChecked] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setError,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: {
      nickname: "",
      age: age[0].id,
      gender: "MALE",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    if (isNicknameDupChecked === false) {
      setError("nickname", {
        type: "nicknameDupCheck",
        message: "닉네임 중복 확인을 해주세요.",
      });
    }
    else {
      const newOtherInfo = {
        nickname: data.nickname,
        age: data.age,
        gender: data.gender,
      };
      sendRequest(newOtherInfo);
    }
  };

  const handleNicknameDupCheck = async () => {
    const valid = await trigger("nickname");
    if (valid === true) {
      nicknameDupCheck(getValues("nickname"), (res) => {
        if (res.data === false) {
          setIsNicknameDupChecked(false);
          setError("nickname", {
            type: "nicknameDup",
            message: "이미 사용 중인 닉네임입니다.",
          });
        } else {
          clearErrors("nickname");
          setIsNicknameDupChecked(true);
        }
      });
    }
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
            name="nickname"
            control={control}
            render={({ field }) => (
              <GrTextField
                className="register-form__field"
                size="small"
                label="닉네임"
                {...field}
                {...register("nickname", {
                  required: "닉네임을 입력해주세요",
                  pattern: {
                    value: nickNameReg,
                    message: "닉네임은 한글, 영문 대소문자, 숫자 2-8자입니다.",
                  },
                })}
              />
            )}
          />
          <GrButton
            className="register-form__innerBtn"
            variant="contained"
            onClick={handleNicknameDupCheck}
          >
            중복확인
          </GrButton>
        </Grid>
        <Grid item>
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
          {isNicknameDupChecked && (
            <OkMessage>
              <span>사용 가능한 닉네임입니다.</span>
            </OkMessage>
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
              <ThemeProvider theme={theme}>
                <Select labelId="age-label" label="연령대" value="teenager" {...field}>
                  {ageList}
                </Select>
              </ThemeProvider>
            )}
          />
        </FormControl>
        <Divider orientation="vertical" flexItem />
        <FormControl>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <ThemeProvider theme={theme}>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="MALE"
                    label="남"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="FEMALE"
                    label="여"
                    control={<Radio />}
                  />
                </RadioGroup>
              </ThemeProvider>
            )}
          />
        </FormControl>
      </Grid>
      <GrButton
        className="register-form__button"
        variant="contained"
        color="secondary"
        onClick={handleSubmit(onSubmit)}
      >
        회원가입
      </GrButton>
    </form>
  );
}

export default OtherInfo;
