import Grid from "@mui/material/Grid";
import { emailAuth, emailDupCheck, idDupCheck } from "api/register";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import OkMessage from "./OkMessage";

const idReg = /^[a-zA-Z0-9]{5,20}$/;
const emailReg =
  /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*.[a-zA-Z]{2,3}$/;

function BasicInfo({ changeBasicInfo, goToOtherInfo }) {
  const [isIdDupChecked, setIsIdDupChecked] = useState(false);
  const [isEmailDupChecked, setIsEmailDupChecked] = useState(false);
  const [certCode, setCertCode] = useState(0);
  const [isCertcodeAuth, setIsCertcodeAuth] = useState(false);

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
      id: "",
      pass: "",
      passCheck: "",
      email: "",
      cert: "",
    },
  });

  // 다음 버튼 핸들러
  const onSubmit = (data) => {
    const newBasicInfo = {
      username: data.id,
      pass: data.pass,
      email: data.email,
    };
    changeBasicInfo(newBasicInfo);
    // 컴포넌트전환
    goToOtherInfo();
  };

  // 아이디 중복 확인 버튼 핸들러
  const handleIdDupCheck = async () => {
    const valid = await trigger("id");
    if (valid === true) {
      idDupCheck(getValues("id"), (res) => {
        if (res.data === false) {
          setIsIdDupChecked(false);
          setError("id", {
            type: "idDup",
            message: "이미 사용 중인 아이디입니다.",
          });
        } else {
          clearErrors("id");
          setIsIdDupChecked(true);
        }
      });
    }
  };

  // 이메일 중복 확인 버튼 핸들러
  const handleEmailDupCheck = async () => {
    const valid = await trigger("email");
    if (valid === true) {
      emailDupCheck(getValues("email"), (res) => {
        if (res.data === false) {
          setIsEmailDupChecked(false);
          setError("email", {
            type: "emailDup",
            message: "이미 사용 중인 이메일입니다.",
          });
        } else {
          clearErrors("email");
          setIsEmailDupChecked(true);
          handleCertCodeSend();
        }
      });
    }
  };

  // 인증번호 전송 버튼 핸들러
  const handleCertCodeSend = () => {
    emailAuth(
      getValues("email"),
      (res) => {
        console.log(res.data);
        setCertCode(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // 인증 버튼 핸들러
  const onCertCodeSubmit = () => {
    console.log(certCode);
    if (+getValues("cert") === certCode) {
      clearErrors("cert");
      setIsCertcodeAuth(true);
    } else {
      setError("cert", {
        type: "invalidCert",
        message: "인증번호가 일치하지 않습니다.",
      });
    }
  };

  return (
    <form className="register-form__top">
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
                className="register-form__field register-form__field--fullWidth"
                size="small"
                label="아이디"
                {...field}
                {...register("id", {
                  required: "아이디를 입력해주세요",
                  pattern: {
                    value: idReg,
                    message: "아이디는 영문, 숫자 5-20자입니다",
                  },
                })}
              />
            )}
          />
          <GrButton
            className="register-form__innerBtn register-form__innerBtn--bottom"
            variant="contained"
            onClick={handleIdDupCheck}
          >
            중복확인
          </GrButton>
        </Grid>
        <Grid item>
          {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
          {isIdDupChecked && (
            <OkMessage>
              <span>사용 가능한 아이디입니다. </span>
            </OkMessage>
          )}
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
                  required: "비밀번호를 한번 더 입력해주세요.",
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
                className="register-form__field register-form__field--fullWidth"
                size="small"
                label="이메일"
                {...field}
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: emailReg,
                    message: "올바르지 않은 이메일 형식입니다.",
                  },
                })}
              />
            )}
          />
          {!isEmailDupChecked && (
            <GrButton
              className="register-form__innerBtn register-form__innerBtn--bottom"
              variant="contained"
              onClick={handleEmailDupCheck}
            >
              중복확인
            </GrButton>
          )}
          {isEmailDupChecked && (
            <GrButton
              className="register-form__innerBtn register-form__innerBtn--bottom"
              variant="contained"
              onClick={handleCertCodeSend}
            >
              재전송
            </GrButton>
          )}
        </Grid>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        {isEmailDupChecked && (
          <OkMessage>
            <span>이메일로 전송된 인증번호를 확인해주세요.</span>
          </OkMessage>
        )}
      </Grid>
      {isEmailDupChecked && (
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
            <GrButton
              className="register-form__innerBtn"
              variant="contained"
              onClick={onCertCodeSubmit}
            >
              인증
            </GrButton>
          </Grid>
          {errors.cert && <ErrorMessage>{errors.cert.message}</ErrorMessage>}
          {isCertcodeAuth && (
            <OkMessage>
              <span>인증되었습니다.</span>
            </OkMessage>
          )}
        </Grid>
      )}
      <GrButton
        className="register-form__button"
        variant="contained"
        color="secondary"
        onClick={handleSubmit(onSubmit)}
      >
        다음
      </GrButton>
    </form>
  );
}

export default BasicInfo;
