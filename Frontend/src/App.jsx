import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AssignmentDetails from "./pages/AssignmentDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/assignmentDetails/:id"
          element={
            <ProtectedRoute>
              {" "}
              <AssignmentDetails />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
