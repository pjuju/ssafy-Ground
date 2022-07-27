import React from "react";
import "styles/FindId/FindIdPage.scss";
import { Grid }  from "@mui/material";
import { Container } from "@mui/material";
import { Tabs, Tab, Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

import logo from "assets/images/text_logo.png";
import TabPanel from "components/FindId/TabPanel.js";

function FindIdPage() {
	const [value, setValue] = React.useState(0);
	

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
					<ThemeProvider theme={theme}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider', margin: "1rem"}} >
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
								<Tab label="아이디 찾기"  />
								<Tab label="비밀번호 찾기"  />
							</Tabs>
						</Box>
					</ThemeProvider>
					<TabPanel value={value} index={0}/>
					<TabPanel value={value} index={1}/>
				</Grid>
			</Grid>
		</Container>
	);
}

export default FindIdPage;