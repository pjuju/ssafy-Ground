import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "styles/FindId/FindIdPage.scss";
import { Grid }  from "@mui/material";
import { Container } from "@mui/material";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

import logo from "assets/images/text_logo.png";
import IdTab from "components/FindId/IdTab";
import PasswordTab from "components/FindId/PasswordTab";
import { setIdFlag, setPwFlag, setUserEmail, setUserId } from "modules/find";

function FindIdPage() {
	const [value, setValue] = useState('1');
  const state = useSelector((state) => state);
	const userId = useSelector((state) => state.find.userId);
  const idFlag = useSelector((state) => state.find.idFlag);
  const pwFlag = useSelector((state) => state.find.pwFlag);
  const userEmail = useSelector((state) => state.find.userEmail);

  const dispatch = useDispatch();

  const onSetUserId = (userId) => dispatch(setUserId(userId));
  const onSetUserEmail = (userEmail) => dispatch(setUserEmail(userEmail));
  const onSetIdFlag = (idFlag) => dispatch(setIdFlag(idFlag));
  const onSetPwFlag = (pwFlag) => dispatch(setPwFlag(pwFlag));
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const onFlagHandler = (event) => {
    onSetIdFlag(0);
    onSetPwFlag(0);
    onSetUserId("");
    onSetUserEmail("");
  }

  useEffect(() => {
    console.log(state);
  });

	return (
    <Container maxWidth="sm">
      <Grid
        container
        className="findid-form__wrapper"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="login-form__logo" item>
          <img className="logo" src={logo} alt="text_logo" width="300px" />
        </Grid>
        <Grid className="findid-form__inner" item>
          <TabContext value={value}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", margin: "1rem" }}
              >
                <TabList
                  onChange={handleChange}
                  variant="fullWidth"
                >
                  <Tab label="아이디 찾기" value="1" onClick={onFlagHandler}/>
                  <Tab label="비밀번호 찾기" value="2" onClick={onFlagHandler}/>
                </TabList>
              </Box>
            </ThemeProvider>
            <TabPanel value="1">
              <IdTab
                userId={userId}
                idFlag={idFlag}
                onSetUserId={onSetUserId}
                onSetIdFlag={onSetIdFlag}
              />
            </TabPanel>
            <TabPanel value="2">
              <PasswordTab
                userId={userId}
                userEmail={userEmail}
                pwFlag={pwFlag}
                onSetUserId={onSetUserId}
                onSetUserEmail={onSetUserEmail}
                onSetPwFlag={onSetPwFlag}
              />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FindIdPage;