import { Paper } from "@material-ui/core";
import { firestoreDB } from "configs/firebase";
import FormNoteDetail from "containers/Layout/subs-container/FormNoteDetail";
import { addDoc, collection } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewDetailNote() {
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    decription: "",
    category: ""
  };
  const defaultErrors = {
    title: false,
    decription: false,
    category: false
  };

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCreateNote = async (event) => {
    try {
      event.preventDefault();
      setFormSubmitted(true);

      const { title, decription, category } = values;
      if (!title.trim() || !decription.trim() || !category.trim()) {
        return;
      }

      const noteId = Math.floor(Math.random() * 10000);
      const notesCollect = collection(firestoreDB, "notes");

      await addDoc(notesCollect, { id: noteId, title, decription, category });
      toast.success(`Note "${title}" created successfully`);
      navigate("/management");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Validate the form
  useEffect(() => {
    const { title, decription, category } = values;

    if (formSubmitted) {
      setErrors({
        title: !title.trim(),
        decription: !decription.trim(),
        category: !category.trim()
      });
    }
  }, [values, formSubmitted]);

  return (
    <Paper style={{ padding: "10px 24px 15px" }}>
      <FormNoteDetail
        values={values}
        errors={errors}
        setValues={setValues}
        handleSubmit={handleCreateNote}
      />
    </Paper>
  );
}

export default NewDetailNote;
