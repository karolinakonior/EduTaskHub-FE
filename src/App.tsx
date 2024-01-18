import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Header"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import AssignmentCard from "./components/pages/AssignmentCard";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, setUser } = useContext<any>(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser)
    }
  }, []);

  return (
    <div> 
      <ResponsiveAppBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments/:assignment_id" element={<AssignmentCard />} />
      </Routes>
    </div>
  );
}

export default App;
