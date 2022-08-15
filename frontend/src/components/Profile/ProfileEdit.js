import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { getUserModifyInfo, getUserState, modifyUserInfo } from "api/user";
import TitleBar from "components/common/TitleBar";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "styles/common/_utils.scss";
import "styles/Profile/ProfileEdit.scss";
import userImg from "assets/images/userImage.png";
import GrTextField from "components/common/GrTextField";
import { Controller, useForm } from "react-hook-form";
import GrButton from "components/common/GrButton";
import { nicknameDupCheck } from "api/register";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorMessage from "components/Register/ErrorMessage";
import OkMessage from "components/Register/OkMessage";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import CustomModal from "../common/CustomModal";
import ModifyPassModal from "./ModifyPassModal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "api/firebase";

function ProfileEdit() {
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  // navigate
  const navigate = useNavigate();

  // 유저 정보
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [gender, setGender] = useState("");
  const [userImage, setUserImage] = useState("");
  const [privateYN, setPrivateYN] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [imageInfo, setImageInfo] = useState({});

  const [changedNickname, setChangedNickname] = useState("");
  const [changedIntroduce, setChangedIntroduce] = useState("");
  const [changedAge, setChangedAge] = useState("");
  const [changedGender, setChangedGender] = useState("");
  const [changedUserImage, setChangedUserImage] = useState("");
  const [changedPrivateYN, setChangedPrivateYN] = useState(false);
  const [imageChange, setImageChange] = useState(false);

  // 모달창 컨트롤
  const [open, setOpen] = useState(false);
  const [modifyPassOpen, setModifyPassOpen] = useState(false);

  const ages = [
    { id: "teenager", value: "10대", checked: false },
    { id: "twenty", value: "20대", checked: false },
    { id: "thirty", value: "30대", checked: false },
    { id: "forty", value: "40대", checked: false },
    { id: "fifty", value: "50대", checked: false },
    { id: "sixty", value: "60대 이상", checked: false },
  ];

  const ageList = ages.map((item, index) => (
    <MenuItem key={index} value={item.id}>
      {item.value}
    </MenuItem>
  ));

  const nickNameReg = /^[가-힣a-zA-Z0-9]{2,8}$/;
  const [isNicknameDupChecked, setIsNicknameDupChecked] = useState(false);
  const [isSamePass, setIsSamePass] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    getValues,
    setError,
    trigger,
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      nickname: " ",
    },
    mode: "onBlur",
  });

  const selectUserImg = useRef("");

  useEffect(() => {
    getUserState((res) => {
      setUserId(res.data.id);
      setUsername(res.data.username);
      setEmail(res.data.email);
    });

    getUserModifyInfo((res) => {
      console.log(res.data);
      setNickname(res.data.nickname);
      setAge(res.data.age);
      setIntroduce(res.data.introduce);
      setGender(res.data.gender);
      setUserImage(res.data.userImage);
      if (res.data.privateYN) {
        setPrivateYN("true");
      } else {
        setPrivateYN("false");
      }

      // 값이 수정되었는지 비교하기 위한 state 설정
      // setChangedNickname(res.data.nickname);
      setValue("nickname", res.data.nickname);
      setChangedAge(res.data.age);
      setChangedIntroduce(res.data.introduce);
      setChangedGender(res.data.gender);
      setChangedUserImage(res.data.userImage);
      if (res.data.privateYN) {
        setChangedPrivateYN("true");
      } else {
        setChangedPrivateYN("false");
      }
    });
  }, []);

  useEffect(() => {
    // 이미지 프리뷰 보여주기
      preview();
  }, [profileImg]);

  useEffect(() => {
    fetchImage();
  },[userImage])

  useEffect(() => {
    console.log(imageInfo)
  },[open])
  /* 이미지를 첨부했을 때 프리뷰로 해당 이미지 미리보기 */
  const preview = () => {
    if (changedUserImage.length === 0) return false;

    const imgElement = document.querySelector(
      ".profile-edit__img > button > img"
    );
    if (imgElement !== null) {
      imgElement.src = profileImg;
    }
  };
  
  const fetchImage = () => {
    const storageRef = ref(storage, `images/${userImage}`);
    if (userImage !== undefined && userImage !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download");
        setProfileImg(url);
      });
    }
  };

  /* 이미지 첨부 버튼을 눌렀을 때 호출되는 핸들러 */
  const handleClickInput = (event) => {
    const file = event.target.files[0];
    const randNum = parseInt((new Date().getTime() + Math.random())*100);
    const info = {
      imageUrl: randNum.toString(),
      file: file
    }
    setChangedUserImage(URL.createObjectURL(file));
    setImageInfo(info)
    console.log("handleClickInput");
    console.log(event.target.files[0]);
  };

  const handleClickBack = () => {
    window.history.back();
  };

  const handleClickModifyPass = () => {
    setModifyPassOpen(true);
  };

  const handleNicknameDupCheck = async () => {
    const valid = await trigger("nickname");
    console.log(getValues("nickname"));
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

  const handleChangeNickname = (event) => {
    setChangedNickname(event.target.value);
  };

  const handleChangeIntroduce = (event) => {
    setChangedIntroduce(event.target.value);
  };

  const handleChangeAge = (event) => {
    setChangedAge(event.target.value);
  };

  const handleChangeGender = (event) => {
    setChangedGender(event.target.value);
  };

  const handleChangePrivateYN = (event) => {
    setChangedPrivateYN(event.target.value);
    console.log(event.target.value);
  };

  const handleClickEditButton = () => {
    if (nickname !== getValues("nickname")) {
      if (!nicknameDupCheck) {
        alert("닉네임 중복을 확인 해주세요.");
        return;
      }
    }

    const num = imageInfo.imageUrl
    const userDetail = {
      age: changedAge,
      gender: changedGender,
      introduce: changedIntroduce,
      nickname: getValues("nickname"),
      privateYN: changedPrivateYN,
      userImage: num
    };
    console.log(userDetail)

    if(imageInfo.imageUrl !== undefined){
      const storageRef = ref(storage, `images/${imageInfo.imageUrl}`);
      uploadBytes(storageRef, imageInfo.file).then((snapshot) => {
        console.log("Uploaded a blob or file!")
      }).then((snapshot) => {
        modifyUserInfo(userDetail, (res) => {
          console.log(userDetail)
          navigate(`/profile/${userId}`);
          window.location.reload();
        });
      });
    }
  };

  return (
    <Grid className="content">
      <Grid className="content__title-desktop">
        <IconButton onClick={handleClickBack}>
          <ArrowBackIcon />
        </IconButton>
        <h2 className="back">프로필 수정</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="프로필 수정" isBack={true} />
      </Grid>
      <Grid id="inner" className="content__inner">
        <Grid className="profile-edit">
          <Grid>
            <Grid className="profile-edit__img">
              <input
                className="profile-edit__img__input"
                ref={selectUserImg}
                type="file"
                accept="image/*"
                onChange={handleClickInput}
              />
              <button
                className="profile-edit__img__input-button"
                onClick={() => selectUserImg.current.click()}
              >
                {userImage.length === 0 && userImage === changedUserImage ? (
                  <img src={profileImg} alt="img-input" />
                ) : (
                  <img src={changedUserImage} alt="img-input" />
                )}
              </button>
            </Grid>
            <table className="profile-edit__table">
              <tbody>
                <tr className="profile-edit__table__id">
                  <th>아이디</th>
                  <td>{username}</td>
                </tr>
                <tr className="profile-edit__table__email">
                  <th>이메일</th>
                  <td>{email}</td>
                </tr>
                <tr className="profile-edit__table__password">
                  <th>비밀번호</th>
                  <td>
                    <GrButton
                      variant="contained"
                      children="비밀번호 수정"
                      onClick={handleClickModifyPass}
                    />
                    <ModifyPassModal
                      open={modifyPassOpen}
                      setOpen={setModifyPassOpen}
                      email={email}
                      username={username}
                    />
                  </td>
                </tr>
                <tr className="profile-edit__table__nickname">
                  <th>닉네임</th>
                  <td>
                    <Grid container justifyContent="space-between">
                      <Controller
                        name="nickname"
                        control={control}
                        render={({ field }) => (
                          <GrTextField
                            className="profile-edit__field"
                            size="small"
                            label="닉네임"
                            {...field}
                            {...register("nickname", {
                              required: "닉네임을 입력해주세요",
                              pattern: {
                                value: nickNameReg,
                                message:
                                  "닉네임은 한글, 영문 대소문자, 숫자 2-8자입니다.",
                              },
                            })}
                          />
                        )}
                      />
                      <GrButton
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
                  </td>
                </tr>
                <tr className="profile-edit__table__introduce">
                  <th>한줄 소개</th>
                  <td>
                    <GrTextField
                      value={changedIntroduce}
                      variant="outlined"
                      label="한줄 소개"
                      onChange={handleChangeIntroduce}
                    />
                  </td>
                </tr>
                <tr className="profile-edit__table__age">
                  <th>연령대</th>
                  <td>
                    <Grid container justifyContent="space-between">
                      <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel id="age-label">연령대</InputLabel>
                        <ThemeProvider theme={theme}>
                          <Select
                            labelId="age-label"
                            label="연령대"
                            value={changedAge}
                            onChange={handleChangeAge}
                          >
                            {ageList}
                          </Select>
                        </ThemeProvider>
                      </FormControl>
                    </Grid>
                  </td>
                </tr>
                <tr className="profile-edit__table__gender">
                  <th>성별</th>
                  <td>
                    <FormControl>
                      <ThemeProvider theme={theme}>
                        <RadioGroup
                          row
                          name="gender"
                          value={changedGender}
                          onChange={handleChangeGender}
                        >
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
                    </FormControl>
                  </td>
                </tr>
                <tr className="profile-edit__table__privateYN">
                  <th>공개 여부</th>
                  <td>
                    <FormControl>
                      <ThemeProvider theme={theme}>
                        <RadioGroup
                          row
                          name="privateYN"
                          value={changedPrivateYN}
                          onChange={handleChangePrivateYN}
                        >
                          <FormControlLabel
                            value="false"
                            label="공개"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            value="true"
                            label="비공개"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </ThemeProvider>
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </table>
            <Grid className="profile-edit__button">
              {nickname === getValues("nickname") &&
              introduce === changedIntroduce &&
              age === changedAge &&
              userImage === changedUserImage &&
              gender === changedGender &&
              privateYN == changedPrivateYN ? (
                <Button
                  className="disabled"
                  children="수정하기"
                  variant="outlined"
                  disabled
                />
              ) : (
                <GrButton
                  className="edit"
                  children="수정하기"
                  variant="contained"
                  onClick={() => setOpen(true)}
                />
              )}
            </Grid>
            <CustomModal
              open={open}
              setOpen={setOpen}
              title="수정하시겠습니까?"
              type="0"
              handleClickOKButton={handleClickEditButton}
            />
          </Grid>
        </Grid>
        <div style={{ height: "30px" }}></div>
      </Grid>
    </Grid>
  );
}

export default ProfileEdit;
