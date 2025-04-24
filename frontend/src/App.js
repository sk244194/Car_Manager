import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import {ImageUpload}  from "./screens/imageUpload";
import {AllCarsPage} from "./screens/cars";
import { MyCars } from "./screens/mycars";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/imageUpload' element ={<ImageUpload />} />
        <Route path='/cars' element = {<AllCarsPage />} />
        <Route path ='/mycars' element = {<MyCars />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
