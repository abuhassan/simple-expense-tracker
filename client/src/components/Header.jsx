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
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <FaTools className="inline-block mr-2" />
          Expense Tracker
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
              {canManageOrganization(user) && (
                <Link to="/organization" className="mr-4">
                  Organization
                </Link>
              )}
              {canAccessAdminPanel(user) && (
                <Link to="/admin" className="mr-4">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="mr-4">
                <FaUser className="inline-block mr-2" />
                Profile
              </Link>
              <button onClick={onLogout}>
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                <FaSignInAlt className="inline-block mr-2" />
                Login
              </Link>
              <Link to="/register">
                <FaUser className="inline-block mr-2" />
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
