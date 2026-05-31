import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Upload from "./pages/Upload";
import Tasks from "./pages/Tasks";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/Protectedroute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/tasks" element={<Tasks />} /> </Route>
    </Routes>
  );
}

export default App;