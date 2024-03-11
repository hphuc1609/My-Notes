import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { deleteById, getListNote } from "API/Detail";
import TryAgain from "common/TryAgain";
import NoteCard from "containers/Layout/subs-container/NoteCard";
import isSuccessResponse from "helpers/isSuccessResponse";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function NoteManagment() {
  const [notes, setNotes] = useState({ data: [], requesting: "loading" });
  const { t } = useTranslation();

  const getAllNotes = async () => {
    try {
      const response = await getListNote();
      const { data, status } = response;

      if (isSuccessResponse(response)) {
        setNotes({ data, requesting: "success" });
      } else {
        setNotes({ ...notes, requesting: "fail" });
        toast.error(`Failed to get notes. Server returned: ${status}`);
      }
    } catch (error) {
      setNotes({ ...notes, requesting: "fail" });
      toast.error(`Error: ${error.message}`);
    } finally {
      toast.clearWaitingQueue();
    }
  };

  // Get all notes
  useEffect(() => {
    getAllNotes();
  }, []);

  /**
   * Asynchronously handles the deletion of a note.
   *
   * @param {number} noteId - The ID of the note to be deleted
   * @param {string} title - The title of the note
   * @return {void}
   */
  const handleDeleteNote = async (noteId, title) => {
    try {
      const response = await deleteById(noteId);
      const { status } = response;

      if (isSuccessResponse(response)) {
        getAllNotes();
        toast.success(`Deleted ${title} successfully.`);
      } else {
        toast.error(
          `Failed to delete note ${title}. Server returned: ${status}`
        );
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const renderPageUI = (status) => {
    switch (status) {
      case "loading":
        return (
          <Box display={"flex"} alignItems={"center"} gridGap={10}>
            <CircularProgress size={25} color='inherit' />
            <p>{t("loading")}</p>
          </Box>
        );
      case "success":
        return (
          <Grid container spacing={3}>
            {notes.data.length > 0 ? (
              notes.data.map((note) => (
                <Grid item key={note.id} xs={12} sm={6} lg={4} xl={3}>
                  <NoteCard
                    note={note}
                    handleDeleteNote={() =>
                      handleDeleteNote(note.id, note.title)
                    }
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant='h5' style={{ fontWeight: "bold" }}>
                  {t("nothingHereYet")}
                </Typography>
                <Typography variant='body2'>
                  {t("pleaseCreateANewNote")}
                </Typography>
              </Grid>
            )}
          </Grid>
        );
      case "fail":
        return <TryAgain onTryAgain={() => getAllNotes()} />;
      default:
        return null;
    }
  };

  return <>{renderPageUI(notes.requesting)}</>;
}

export default NoteManagment;
