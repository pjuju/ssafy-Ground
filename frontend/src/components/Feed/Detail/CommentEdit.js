import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GrTextField from "components/common/GrTextField";
import GrButton from "components/common/GrButton";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1.2, fontSize: "1rem" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CommentEdit({
  id,
  comment,
  open,
  setOpen,
  handleCommentEdit,
}) {
  const [updated, setUpdated] = useState(comment);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        댓글 수정
      </BootstrapDialogTitle>
      <DialogContent className="comment-update" dividers>
        <GrTextField
          className="comment-update__field"
          value={updated}
          onChange={(e) => setUpdated(e.target.value)}
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <GrButton
          variant="contained"
          color="secondary"
          onClick={() => {
            handleCommentEdit(id, updated);
            setOpen(false);
          }}
        >
          완료
        </GrButton>
      </DialogActions>
    </BootstrapDialog>
  );
}
