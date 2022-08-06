import React from "react";
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

function FindIdPage() {
	const [value, setValue] = React.useState('1');
	

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
    <Container className="findid-form" maxwidth="xs" fixed>
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
        <Grid item>
          <TabContext value={value}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", margin: "1rem" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <Tab label="아이디 찾기" value="1"/>
                  <Tab label="비밀번호 찾기" value="2" />
                </TabList>
              </Box>
            </ThemeProvider>
            <TabPanel value="1">
              <IdTab />
            </TabPanel>
            <TabPanel value="2">
              <PasswordTab />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FindIdPage;