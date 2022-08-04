import { ThemeProvider } from "@emotion/react";
import { Grid, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BadgeButton from "./BadgeButton";
import PersonIcon from "@mui/icons-material/Person";
import theme from "../theme";

function BottomNavbar({ menuIdx, onSetMenuIdx }) {
  return (
    <Grid className="navbar-bottom">
      <ThemeProvider theme={theme}>
        <BottomNavigation
          className="navbar-bottom__menu"
          showLabels
          value={menuIdx}
          onChange={(event, newValue) => {
            onSetMenuIdx(newValue);
          }}
        >
          <BottomNavigationAction icon={<HomeIcon />} />
          <BottomNavigationAction icon={<BadgeButton />} />
          <BottomNavigationAction icon={<FiberNewOutlinedIcon />} />
          <BottomNavigationAction icon={<SearchOutlinedIcon />} />
          <BottomNavigationAction icon={<PersonIcon />} />
        </BottomNavigation>
      </ThemeProvider>
    </Grid>
  );
}

export default BottomNavbar;
