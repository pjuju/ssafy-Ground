import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { setInterest, toggleInterestList } from "modules/interest";
import FilterModal from "components/Feed/Latest/FilterModal";
import { useState } from "react";
import { logout, updateInterest } from "api/user";
import CustomModal from "./CustomModal";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function TitleBar(props) {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const interestList = useSelector((state) => state.interest.interestList);

  const dispatch = useDispatch();
  const onToggleInterestList = (id) => dispatch(toggleInterestList(id));

  const handleClickTitle = () => {
    document.querySelector(".content").scrollTo(0, 0);
  };

  const handleClickBack = () => {
    window.history.back();
  };

  const changeInterestList = () => {
    const interestArray = [];
    // interestList에서 isInterested가 true인 것들의 id만 뽑아서 새로운 배열 생성
    interestList.map((item) => {
      if (item.isInterested) {
        console.log(interestList);
        interestArray.push(item.id);
      }
    });
    console.log(interestArray);

    updateInterest(interestArray, (res) => {
      window.location.reload();
      console.log(res);
    });
  };

  /* 로그아웃 */
  const handleClickLogout = () => {
    logout(
      () => {
        localStorage.removeItem("token");
        navigate("/");
      },
      (err) => {
        // JWT 토근이 만료되어 500 에러가 반환됐다면
        if (err.response.status === 500) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="center">
      <AppBar id="titlebar" position="static">
        <Toolbar>
          {props.isBack && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              onClick={handleClickBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {(props.title === "알림" ||
            props.title === "최신 글 피드" ||
            props.title === "프로필") && (
            <div style={{ width: "50.25px" }}></div>
          )}
          <Typography
            className="titlebar__text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <span onClick={() => handleClickTitle()}>{props.title}</span>
          </Typography>
          {props.title === "최신 글 피드" ? (
            <IconButton
              size="large"
              color="inherit"
              aria-label="filter"
              onClick={() => setFilterModalOpen(true)}
            >
              <AutoAwesomeOutlinedIcon />
            </IconButton>
          ) : props.title === "알림" ? (
            <IconButton
              size="large"
              color="inherit"
              aria-label="filter"
              onClick={() => setDeleteModalOpen(true)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          ) : props.title === "프로필" ? (
            <IconButton>
              <LogoutIcon
                size="large"
                color="inherit"
                aria-label="filter"
                onClick={() => setLogoutModalOpen(true)}
              />
            </IconButton>
          ) : (
            props.isBack && <div style={{ width: "50.25px" }}></div>
          )}
          <FilterModal
            open={filterModalOpen}
            setOpen={setFilterModalOpen}
            interestList={interestList}
            onToggleInterestList={onToggleInterestList}
            changeInterestList={changeInterestList}
          />
          <CustomModal
            open={logoutModalOpen}
            setOpen={setLogoutModalOpen}
            title="로그아웃 하시겠습니까?"
            type="0"
            handleClickOKButton={handleClickLogout}
          />
          <CustomModal
            open={deleteModalOpen}
            setOpen={setDeleteModalOpen}
            title="알림 전체를 삭제하시겠습니까?"
            type="0"
            handleClickOKButton={props.handleClickAllDelete}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TitleBar;
