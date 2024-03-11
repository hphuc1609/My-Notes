import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * The alert dialog component.
 *
 * @param {object} props - The component props
 * @param {React.RefObject} props.dialogBtnRef - The reference to the dialog button
 * @param {string} props.title - The title of the alert dialog
 * @param {string} props.content - The content of the alert dialog
 * @param {string} props.cancelBtnText - The text for the cancel button
 * @param {string} props.confirmBtnText - The text for the confirm button
 * @param {function} props.handleConfirm - The callback function for the confirmation action
 * @param {import("@material-ui/core/Dialog").DialogProps} props.DialogProps - The props for the dialog
 * @param {import("@material-ui/core/DialogTitle").DialogTitleProps} props.DialogTitleProps - The props for the dialog title
 * @param {import("@material-ui/core/DialogContentText").DialogContentTextProps} props.DialogContentTextProps - The props for the dialog content text
 * @param {import("@material-ui/core/DialogActions").DialogActionsProps} props.DialogActionsProps - The props for the dialog actions
 * @return {JSX.Element} The rendered alert dialog component
 */
export default function AlertDialog({
  dialogBtnRef,
  title,
  content,
  cancelBtnText,
  confirmBtnText,
  handleConfirm,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    handleConfirm();
  };

  return (
    <>
      <Button
        ref={dialogBtnRef}
        onClick={handleClickOpen}
        style={{ display: "none" }}
      />
      <Dialog open={open} onClose={handleClose} {...props?.DialogProps}>
        <DialogTitle {...props?.DialogTitleProps}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText {...props?.DialogContentTextProps}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions {...props?.DialogActionsProps}>
          <Button onClick={handleClose} variant='contained'>
            {cancelBtnText}
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            color={confirmBtnText === t("deleteBtn") ? "secondary" : "primary"}
            autoFocus
          >
            {confirmBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  dialogBtnRef: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.string,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  handleConfirm: PropTypes.func,
  DialogProps: PropTypes.object,
  DialogTitleProps: PropTypes.object,
  DialogContentTextProps: PropTypes.object,
  DialogActionsProps: PropTypes.object
};
