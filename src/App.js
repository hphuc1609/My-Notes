import Layout from "containers/Layout";
import NoteManagment from "pages/Managment";
import NewDetailNote from "pages/NewNote";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/management' element={<NoteManagment />} />
          <Route exact path='/create-note' element={<NewDetailNote />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
