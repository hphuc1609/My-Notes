import { firestoreDB } from "configs/firebase";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";

const getNotes = async () => {
  const notesCol = collection(firestoreDB, "notes");
  const data = await getDocs(notesCol);
  const response = data.docs.map((doc) => doc.data());

  return response;
};

/**
 * Deletes a note by its ID.
 *
 * @param {number|string} noteId - The ID of the note to be deleted
 * @return {boolean} Returns true if the note is successfully deleted
 */
const deleteNoteById = async (noteId) => {
  const notesCol = collection(firestoreDB, "notes");
  const data = await getDocs(notesCol);
  data.forEach(async (doc) => {
    if (doc.data().id === noteId) {
      await deleteDoc(doc.ref);
    }
  });
};

export { deleteNoteById, getNotes };
