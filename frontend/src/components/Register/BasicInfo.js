import Grid from "@mui/material/Grid";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

function BasicInfo({ changeBasicInfo, goToOtherInfo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      pass: "",
      passCheck: "",
      cert: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const newBasicInfo = {
      id: data.id,
      pass: data.pass,
      email: data.email,
    };
    changeBasicInfo(newBasicInfo);
    // 컴포넌트전환
    goToOtherInfo();
  };

  return (
    <form>
      <Grid className="register-form__top" item>
        <Grid
          className="register-form__inner-wrapper"
          container
          direction="column"
        >
          <Grid container justifyContent="space-between">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <GrTextField
                  className="register-form__field"
                  size="small"
                  label="아이디"
                  {...field}
                  {...register("id", {
                    required: "아이디를 입력해주세요",
                    pattern: {
                      value: /^[a-zA-Z0-9|]{5,20}$/,
                      message: "아이디는 영문, 숫자 5-20자입니다",
                    },
                  })}
                />
              )}
            />
            <GrButton className="register-form__innerBtn" variant="contained">
              중복확인
            </GrButton>
          </Grid>
          <Grid item>
            {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
          </Grid>
        </Grid>
        <Grid
          className="register-form__inner-wrapper"
          container
          direction="column"
        >
          <Grid container>
            <Controller
              name="pass"
              control={control}
              render={({ field }) => (
                <GrTextField
                  className="register-form__password"
                  size="small"
                  label="비밀번호"
                  type="password"
                  {...field}
                  {...register("pass", {
                    required: "비밀번호를 입력해주세요",
                    pattern: {
                      value: /^[a-zA-Z0-9d`~!@#$%^&*()-_=+]{8,20}$/,
                      message: "비밀번호는 영문, 특수문자 8-20자입니다",
                    },
                  })}
                />
              )}
            />
            {errors.pass && <ErrorMessage>{errors.pass.message}</ErrorMessage>}
            <Controller
              name="passCheck"
              control={control}
              render={({ field }) => (
                <GrTextField
                  className="register-form__password"
                  size="small"
                  label="비밀번호 확인"
                  type="password"
                  {...field}
                  {...register("passCheck", {
                    required: "비밀번호 확인을 해주세요",
                  })}
                />
              )}
            />
            {errors.passCheck && (
              <ErrorMessage>{errors.passCheck.message}</ErrorMessage>
            )}
          </Grid>
        </Grid>
        <Grid
          className="register-form__inner-wrapper"
          container
          direction="column"
        >
          <Grid container justifyContent="space-between">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <GrTextField
                  className="register-form__field"
                  size="small"
                  label="이메일"
                  {...field}
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*.[a-zA-Z]{2,3}$/,
                      message: "올바르지 않은 이메일 형식입니다.",
                    },
                  })}
                />
              )}
            />
            {!isAuthenticated && (
              <GrButton className="register-form__innerBtn" variant="contained">
                중복확인
              </GrButton>
            )}
            {isAuthenticated && !isSubmitted && (
              <GrButton className="register-form__innerBtn" variant="contained">
                전송
              </GrButton>
            )}
            {isSubmitted && (
              <GrButton className="register-form__innerBtn" variant="contained">
                재전송
              </GrButton>
            )}
          </Grid>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Grid>
        {!isSubmitted && (
          <Grid
            className="register-form__inner-wrapper"
            container
            direction="column"
          >
            <Grid container justifyContent="space-between">
              <Controller
                name="cert"
                control={control}
                render={({ field }) => (
                  <GrTextField
                    className="register-form__field"
                    size="small"
                    label="인증번호"
                    {...field}
                    {...register("cert", {
                      required: "인증번호를 입력해주세요",
                    })}
                  />
                )}
              />
              <GrButton className="register-form__innerBtn" variant="contained">
                인증
              </GrButton>
            </Grid>
            {errors.cert && <ErrorMessage>{errors.cert.message}</ErrorMessage>}
          </Grid>
        )}
        <GrButton
          className="register-form__button"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          다음
        </GrButton>
      </Grid>
    </form>
  );
}

export default BasicInfo;
