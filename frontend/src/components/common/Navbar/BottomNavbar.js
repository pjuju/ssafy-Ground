import theme from "../theme";
import BadgeButton from "./BadgeButton";

import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

function BottomNavbar({
  sideMenuIdx,
  bottomMenuIdx,
  onSetSideMenuIdx,
  onSetBottomMenuIdx,
}) {
  return (
    <Grid className="navbar-bottom">
      <ThemeProvider theme={theme}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={bottomMenuIdx}
            onChange={(event, newValue) => {
              switch (newValue) {
                case 2:
                case 3:
                  onSetSideMenuIdx(newValue - 1);
                  break;
                default:
                  onSetSideMenuIdx(newValue);
                  break;
              }
              onSetBottomMenuIdx(newValue);
              console.log(bottomMenuIdx);
            }}
          >
            <BottomNavigationAction
              component={Link}
              to="/feed/follow"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/notification"
              icon={<BadgeButton />}
            />
            <BottomNavigationAction
              component={Link}
              to="/feed/latest"
              icon={<FiberNewOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/feed/search"
              icon={<SearchOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/profile/1"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}

export default BottomNavbar;
