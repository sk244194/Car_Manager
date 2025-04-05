import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import {ImageUpload}  from "./screens/imageUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/imageUpload' element ={<ImageUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
