import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user && (user.role === "admin" || user.role === "masterAdmin")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

// PropTypes validation
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired, //Ensure children is a React node and is required
};

export default AdminRoute;
