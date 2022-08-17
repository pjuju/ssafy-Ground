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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { feedDelete } from "api/feed";
import { getUserState } from "api/user";
import { saveBoard, unsaveBoard } from "api/board";

function ArticleMore(props) {
  const {
    id,
    writerId,
    userId,
    isSaved,
    setIsSaved,
    saveCnt,
    setSaveCnt,
    content,
  } = props;

  const state = useSelector((state) => state);
  const feedData = useSelector((state) => state.feed.feedData);

  const dispatch = useDispatch();
  const onSetFeedData = (feedData) => dispatch(setFeedData(feedData));

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  let navigate = useNavigate();
  let path = `/feed/update/${id}`;

  // isSaved가 바뀔 때마다 리렌더링
  useEffect(() => {}, [isSaved]);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    onSetFeedData(props.content);
    navigate(path);
    console.log("edit");
  };

  const handleClickDelete = () => {
    feedDelete(props.id, (res) => {
      console.log(res.data);
    });
    console.log("delete");
  };

  const handleClickSave = () => {
    // 게시글 저장 요청
    saveBoard(id, (res) => {
      setIsSaved(() => true);
      setSaveCnt((saveCnt) => saveCnt + 1);
      console.log(res);
    });
  };

  const handleClickUnsave = () => {
    // 게시글 저장 취소 요청
    unsaveBoard(id, (res) => {
      setIsSaved(() => false);
      setSaveCnt((saveCnt) => saveCnt - 1);
      console.log(res);
    });
  };

  return (
    <Grid className="more">
      {userId === writerId && (
        <Grid className="more__menu">
          <IconButton ref={anchorEl}>
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
      )}
      <Grid className="more__save">
        <Grid>
          {isSaved ? (
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
