import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TitleBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="titlebar" position="static">
        <Toolbar id="titlebar__toolbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            className="titlebar__text"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TitleBar;
