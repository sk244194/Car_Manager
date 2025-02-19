import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
