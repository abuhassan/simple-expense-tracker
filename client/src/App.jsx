import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import NonAdminRoute from "./pages/NonAdminRoute";
import AdminRoute from "./pages/AdminRoute";
// import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Non-admin user routes */}
            <Route
              path="/dashboard"
              element={
                <NonAdminRoute>
                  <Dashboard />
                </NonAdminRoute>
              }
            />

            {/* Admin-specific routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
