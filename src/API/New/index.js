import axios from "axios";

const postNote = async (data) => {
  const url = "http://localhost:8000/notes";
  const response = await axios.post(url, data);

  return response;
};

export default postNote;
