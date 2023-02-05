import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.routes";
import SignIn from "./routes/signIn/signIn.component";
import SignUp from "./routes/signUp/signUp.routes";
import ProfilePage from "./routes/profilePage/profilePage.component";
import HomePage from "./routes/homePage/homePage.routes";
import Edit from "./routes/edit/edit.routes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/editprofile" element={<Edit />} />
    </Routes>
  );
}

export default App;
