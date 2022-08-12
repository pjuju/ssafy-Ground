import theme from "components/common/theme.js";
import { setFeedData } from "modules/feed";
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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { feedDelete } from "api/feed";

function ArticleMore(props) {
  const state = useSelector((state) => state);
  const feedData = useSelector((state) => state.feed.feedData);

  const dispatch = useDispatch();
  const onSetFeedData = (feedData) => dispatch(setFeedData(feedData));

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [isSaveClicked, setIsSaveClicked] = useState(props.isSaved);
  let navigate = useNavigate();
  let path = `/feed/update/${props.id}`;

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    onSetFeedData(props.content)
    navigate(path)
    console.log("edit");
  };

  const handleClickDelete = () => {
    feedDelete(props.id, (res) => {
      console.log("delete");
    })
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
