import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.routes";
import SignIn from "./routes/signIn/signIn.component";
import HomePage from "./routes/homePage/homePage.component";

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
