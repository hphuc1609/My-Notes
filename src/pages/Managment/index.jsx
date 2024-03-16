import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import TryAgain from "common/TryAgain";
import NoteCard from "containers/Layout/subs-container/NoteCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { deleteNoteById, getNotes } from "services/notes";

function NoteManagment() {
  const { t } = useTranslation();

  /** @type {{data: NoteType[], requesting: "loading" | "success" | "fail"}} */
  const initialNotes = { data: [], requesting: "loading" };

  const [notes, setNotes] = useState(initialNotes);

  const getAllNotes = async () => {
    try {
      setNotes(initialNotes);
      const response = await getNotes();
      if (response) {
        setNotes({ data: response, requesting: "success" });
      }
    } catch (error) {
      setNotes({ ...notes, requesting: "fail" });
      toast.error(`Error: ${error.message}`);
    } finally {
      toast.clearWaitingQueue();
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  /**
   * Asynchronously handles the deletion of a note.
   *
   * @param {number|string} noteId - The ID of the note to be deleted
   * @param {string} title - The title of the note
   * @return {void}
   */
  const handleDeleteNote = async (noteId, title) => {
    try {
      await deleteNoteById(noteId);
      await getAllNotes();
      toast.success(`Note "${title}" deleted successfully`);
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
