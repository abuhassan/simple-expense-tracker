// DashboardLayout.jsx
import { Outlet, Link } from "react-router-dom";
//import Header from "./Header"; // Optional: Include a header or navigation here

function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      {/* Outlet renders the child routes */}
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
