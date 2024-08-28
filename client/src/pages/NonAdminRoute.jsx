import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function NonAdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  // If user is logged in and not an admin or masterAdmin, render the children
  if (user && user.role !== "admin" && user.role !== "masterAdmin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

// PropTypes validation
NonAdminRoute.propTypes = {
  children: PropTypes.node.isRequired, //Ensure children is a React node and is required
};

export default NonAdminRoute;
