import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RenderSecureData from "./components/RenderSecureData";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/secure-data"
      element={<ProtectedRoute component={RenderSecureData} />}
    />
  </Routes>
);

export default App;
