import { Grid, Stack } from "@mui/material";
import userImage from "assets/images/userImage.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Comment({ comment, userId, handleCommentEdit, handleCommentDelete }) {
  const { id, user, regDttm, reply } = comment;

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
                    {user.nickname}
                  </Grid>
                  <Grid className="comment__regDate" item textAlign="center">
                    5분전
                  </Grid>
                </Stack>
                <Grid item>
                  {userId === user.id && (
                    <>
                      <ModeEditOutlinedIcon
                        className="comment__edit comment__button"
                        fontSize="small"
                        onClick={() => handleCommentEdit(id)}
                      />
                      <DeleteOutlinedIcon
                        className="comment__delete comment__button"
                        color="warning"
                        fontSize="small"
                        onClick={() => handleCommentDelete(id)}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid className="comment__content">{reply}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default Comment;
