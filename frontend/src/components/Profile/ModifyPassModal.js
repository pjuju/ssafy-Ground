import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import GrButton from "components/common/GrButton";
import { Grid } from "@mui/material";
import "styles/Profile/ProfileEdit.scss";
import { useState } from "react";
import { logout, modifyPass } from "api/user";
import { Controller, useForm } from "react-hook-form";
import GrTextField from "components/common/GrTextField";
import ErrorMessage from "components/Register/ErrorMessage";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function ModifyPassModal({ open, setOpen, email, username }) {
  const [isSamePass, setIsSamePass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setError,
    trigger,
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      pass: "",
      passCheck: "",
    },
    mode: "onBlur",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOK = (data) => {
    setOpen(false);

    const detail = {
      email: email,
      pass: data.pass,
      username: username,
    };

    console.log(data.pass);

    // 비밀번호 수정 요청
    modifyPass(detail, (res) => {
      logout((res) => {
        localStorage.removeItem("token");
        alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
        navigate(`/`);
      });
    });
  };

  const handlePassCheck = () => {
    if (getValues("pass") === getValues("passCheck")) {
      setIsSamePass(true);
      clearErrors("passCheck");
    } else {
      setError("passCheck", {
        type: "notSamePass",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  return (
    <div>
      <Modal
        className="modify-pass-modal"
        open={open}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              textAlign="center"
              flexWrap="nowrap"
            >
              <Grid className="modify-pass-modal__title" item>
                <h2>비밀번호 변경</h2>
              </Grid>
              <Grid item>
                <Grid className="modify-pass-modal__content" container>
                  <Controller
                    name="pass"
                    control={control}
                    render={({ field }) => (
                      <GrTextField
                        className="modify-pass-modal__content__password"
                        size="small"
                        label="비밀번호"
                        type="password"
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
                  {errors.pass && (
                    <ErrorMessage>{errors.pass.message}</ErrorMessage>
                  )}
                  <Controller
                    name="passCheck"
                    control={control}
                    rules={{ required: "비밀번호를 한번 더 입력해주세요." }}
                    render={({ field: { name, ref, value } }) => (
                      <GrTextField
                        className="modify-pass-modal__content__password"
                        ref={ref}
                        name={name}
                        size="small"
                        label="비밀번호 확인"
                        type="password"
                        value={value}
                        onChange={(e) => {
                          setValue("passCheck", e.target.value);
                          handlePassCheck();
                        }}
                      />
                    )}
                  />
                  {errors.passCheck && (
                    <ErrorMessage>{errors.passCheck.message}</ErrorMessage>
                  )}
                </Grid>
              </Grid>
              <Grid className="modify-pass-modal__button" item>
                <GrButton
                  className="modify-pass-modal__button--cancel"
                  variant="outlined"
                  onClick={handleCancel}
                >
                  취소
                </GrButton>
                <GrButton
                  className="modify-pass-modal__button--ok-1"
                  variant="contained"
                  onClick={handleSubmit(handleOK)}
                >
                  변경
                </GrButton>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
