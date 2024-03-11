import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import AlertDialog from "common/AlertDialog";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return theme.palette.secondary.main;
      }

      if (note.category === "money") {
        return theme.palette.success.main;
      }

      if (note.category === "todo") {
        return theme.palette.warning.main;
      }

      return theme.palette.primary.main;
    }
  }
}));

/**
 * Renders a NoteCard component with the given note and handleDeleteNote function.
 *
 * @param {object} props - the props for the component
 * @param {NoteType} props.note - the note object to be displayed
 * @param {function} props.handleDeleteNote - the function to handle note deletion
 * @return {JSX.Element} NoteCard component
 */
function NoteCard({ note, handleDeleteNote }) {
  const classes = useStyles(note);
  const dialogBtnRef = React.createRef();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          style: { fontWeight: 500, fontSize: 16, width: "50%" },
          className: "text-overflow"
        }}
        title={note.title}
        subheader={`${t(note.category.toLowerCase())}`}
        action={
          <IconButton
            className={classes.icon}
            onClick={() => dialogBtnRef.current.click()}
          >
            <DeleteOutline />
          </IconButton>
        }
        avatar={
          <Avatar variant='h5' className={classes.avatar}>
            {note.category[0]?.toUpperCase()}
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant='body1' color='textPrimary'>
          {note.decription}
        </Typography>
      </CardContent>

      <AlertDialog
        dialogBtnRef={dialogBtnRef}
        title={t("deleteTitle")}
        content={t("deleteContent")}
        cancelBtnText={t("cancelBtn")}
        confirmBtnText={t("deleteBtn")}
        handleConfirm={handleDeleteNote}
      />
    </Card>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object,
  handleDeleteNote: PropTypes.func
};

export default NoteCard;
