import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Header"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";

function App() {
  return (
    <div> 
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
