import axios from "axios";

const getListNote = async () => {
  const url = "http://localhost:8000/notes";
  const response = await axios.get(url);

  return response;
};

const deleteById = async (id) => {
  const url = `http://localhost:8000/notes/${id}`;
  const response = await axios.delete(url);

  return response;
};

export { getListNote, deleteById };
