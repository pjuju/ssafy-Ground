import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import GrButton from "components/common/GrButton";
import { Grid } from "@mui/material";
import "styles/Profile/ProfileEdit.scss";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({
  open,
  setOpen,
  title,
  type,
  handleClickOKButton,
}) {
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOK = () => {
    setOpen(false);
    handleClickOKButton();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              textAlign="center"
              flexWrap="nowrap"
            >
              <Grid className="profile-edit-modal__title" item>
                {title}
              </Grid>
              {type === "0" ? (
                <Grid className="profile-edit-modal__button" item>
                  <GrButton
                    className="profile-edit-modal__button--cancel"
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    취소
                  </GrButton>
                  <GrButton
                    className="profile-edit-modal__button--ok-1"
                    variant="contained"
                    onClick={handleOK}
                  >
                    확인
                  </GrButton>
                </Grid>
              ) : (
                <Grid className="profile-edit-modal__button" item>
                  <GrButton
                    className="profile-edit-modal__button--ok-2"
                    variant="contained"
                    onClick={handleCancel}
                  >
                    확인
                  </GrButton>
                </Grid>
              )}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
