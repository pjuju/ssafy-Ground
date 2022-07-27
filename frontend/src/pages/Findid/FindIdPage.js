import React from "react";
import "styles/FindId/FindIdPage.scss";
import { Grid }  from "@mui/material";
import { Container } from "@mui/material";
import { Tabs, Tab, Box } from "@mui/material";
import logo from "assets/images/text_logo.png";
import { TabPanel } from "components/FindId/TabPanel.js";



function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}


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
					<Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
							<Tab label="아이디 찾기" {...a11yProps(0)} />
							<Tab label="비밀번호 찾기" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}/>
					<TabPanel value={value} index={1}/>
				</Grid>
			</Grid>
		</Container>
	);
}

export default FindIdPage;