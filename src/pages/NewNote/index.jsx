import { Paper } from "@material-ui/core";
import postNote from "API/New";
import FormNoteDetail from "containers/Layout/subs-container/FormNoteDetail";
import isSuccessResponse from "helpers/isSuccessResponse";
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

  const sendDataToServer = async (data) => {
    try {
      const response = await postNote(data);
      const { status } = response;

      if (isSuccessResponse(response)) {
        toast.success(`Created note successfully.`);
        navigate("/management");
      } else {
        toast.error(`Failed to create note. Server returned: ${status}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setFormSubmitted(true);

      const { title, decription, category } = values;
      if (!title.trim() || !decription.trim() || !category.trim()) {
        return;
      }

      await sendDataToServer(values);
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
        handleSubmit={handleSubmit}
      />
    </Paper>
  );
}

export default NewDetailNote;
