import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function NonAdminRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // If user is not logged in, redirect to login page
    navigate("/login");
    return null;
  }

  if (user.role === "admin" || user.role === "masterAdmin") {
    // If user is an admin, redirect to admin dashboard
    navigate("/admin");
    return null;
  }

  //  If user is not an admin, render the children
  return children;
}

// PropTypes validation
NonAdminRoute.propTypes = {
  children: PropTypes.node.isRequired, //Ensure children is a React node and is required
};

export default NonAdminRoute;
