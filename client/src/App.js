import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home from "./pages/Home";
import Profile  from "./pages/Profile";
import  SingUp  from "./pages/SingUp";
import  Singin from "./pages/Singin";
import  About  from "./pages/About";
import Header from "./components/header";
import UserHome from "./pages/userHome"
import Page from "./page/index"
import Room from "./page/room/index"
function App() {
 
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/page" element={<Page/>} />
        <Route path="/room/:roomId" element={<Room/>} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/signin" element={<Singin/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/UserHome" element={<UserHome/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
