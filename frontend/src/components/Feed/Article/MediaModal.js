import MediaSlider from "components/Feed/Article/MediaSlider";

import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MediaModal({ open, handleClose, src }) {
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <MediaSlider />
    </Dialog>
  );
}

export default MediaModal;
