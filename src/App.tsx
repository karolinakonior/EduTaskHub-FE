import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Header"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import AssignmentCard from "./components/pages/AssignmentCard";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import Loader from "./components/Loader";

function App() {
  const { setUser } = useContext<any>(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  if(loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div> 
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments/:assignment_id" element={<AssignmentCard />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
