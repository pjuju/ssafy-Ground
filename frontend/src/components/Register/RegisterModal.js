import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import GrButton from "components/common/GrButton";
import text_logo from "assets/images/text_logo.png";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

export default function RegisterModal({ open, setOpen }) {
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (localStorage.getItem("token")) {
      navigate("/welcome");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
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
              <Container className="register-modal__logo-wrapper">
                <img
                  className="register-modal__logo"
                  src={text_logo}
                  alt="text_logo"
                />
              </Container>
              <Grid className="register-modal__title" item>
                회원가입이 완료되었습니다!
              </Grid>
              <Grid item>
                <GrButton
                  className="register-modal__button"
                  variant="contained"
                  onClick={handleClose}
                >
                  확인
                </GrButton>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
