import { FaSignInAlt, FaSignOutAlt, FaUser, FaTools } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {
  canAccessAdminPanel,
  canManageOrganization,
} from "../utils/roleChecks";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current user from the Redux store
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Expense Tracker test</Link>
      </div>
      <ul>
        {/* Conditional rendering based on user presence and role */}
        {user ? (
          <>
            {/* Links visible to all logged-in users */}
            <li>
              <Link to="/dashboard">Dashboard </Link>
            </li>

            {/* Use utility functions to conditionally render based on roles */}
            {canAccessAdminPanel(user) && (
              <li>
                <Link to="/admin">
                  <FaTools /> Admin Panel
                </Link>
              </li>
            )}
            {canManageOrganization(user) && (
              <li>
                <Link to="/manage">Manage Organization</Link>
              </li>
            )}

            {/* Logout button for all logged-in users */}
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Public links */}
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
