import theme from "components/common/theme.js";

import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function ArticleMore(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [isSaveClicked, setIsSaveClicked] = useState(props.isSaved);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    console.log("edit");
  };

  const handleClickDelete = () => {
    console.log("delete");
  };
  const handleClickSave = () => {
    setIsSaveClicked(!isSaveClicked);

    // 저장 요청
    console.log("저장 요청");
  };

  const handleClickUnsave = () => {
    setIsSaveClicked(!isSaveClicked);

    // 저장 취소 요청
    console.log("저장 취소 요청");
  };

  return (
    <Grid className="more">
      <Grid className="more__menu">
        <IconButton ref={anchorEl}>
          {/* <MoreVertIcon /> */}
          <MoreVertIcon
            aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={handleClickMenu}
          />
          <Menu
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClickEdit}>
              <ListItemIcon>
                <ModeEditOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>수정</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClickDelete}>
              <ThemeProvider theme={theme}>
                <ListItemIcon>
                  <DeleteOutlinedIcon color="warning" fontSize="small" />
                </ListItemIcon>
                <ListItemText style={{ color: "#E6330F" }}>삭제</ListItemText>
              </ThemeProvider>
            </MenuItem>
          </Menu>
        </IconButton>
      </Grid>
      <Grid className="more__save">
        <Grid>
          {isSaveClicked ? (
            <ThemeProvider theme={theme}>
              <IconButton
                className="more__save-icon"
                color="secondary"
                onClick={() => handleClickUnsave()}
              >
                <BookmarkIcon />
              </IconButton>
            </ThemeProvider>
          ) : (
            <IconButton
              className="more__save-icon"
              onClick={() => handleClickSave()}
            >
              <BookmarkBorderIcon />
            </IconButton>
          )}
        </Grid>
        <Grid className="more__save-cnt">{props.saveCnt}</Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleMore;
