import './App.css';
import Registration from "./components/auth/Registration";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Profile from "./components/auth/Profile";
import UserPage from "./components/userPage/UserPage";
import WelcomePage from "./components/userPage/WelcomePage";
import UsersView from "./components/userPage/UsersView";

function App() {
  return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/*" element={<UserPage/>}/>
                <Route path="/people" element={<UsersView/>}/>


            </Routes>
    </BrowserRouter>
  );
}

export default App;
