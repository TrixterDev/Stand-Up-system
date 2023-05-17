import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import "../src/App.css";
import Auth from "../src/components/Auth/Auth.jsx";
import Register from "../src/components/Auth/Register.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
