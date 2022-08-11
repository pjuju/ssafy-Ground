import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import userImage from "assets/images/userImage.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Comment() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

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

  return (
    <div className="comment">
      <Stack className="comment__inner">
        <Grid className="comment__info" container justifyContent="center">
          <Grid item xs={0.8}>
            <img
              className="comment__info__image"
              src={userImage}
              alt="user_image"
            />
          </Grid>
          <Grid item xs={11}>
            <Grid
              container
              className="comment__info--right"
              direction="column"
              justifyContent="center"
            >
              <Grid container justifyContent="space-between">
                <Stack direction="row">
                  <Grid className="comment__nickname" item textAlign="center">
                    nickname
                  </Grid>
                  <Grid className="comment__regDate" item textAlign="center">
                    5분전
                  </Grid>
                </Stack>
                <Grid item>
                  <ModeEditOutlinedIcon
                    className="comment__edit comment__button"
                    fontSize="small"
                    onClick={() => handleClickEdit()}
                  />
                  <DeleteOutlinedIcon
                    className="comment__delete comment__button"
                    color="warning"
                    fontSize="small"
                    onClick={() => handleClickDelete()}
                  />
                </Grid>
              </Grid>
              <Grid className="comment__content">
                댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
                내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default Comment;
