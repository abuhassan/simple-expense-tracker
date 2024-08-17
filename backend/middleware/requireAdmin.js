// middleware/requireAdmin.js
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, so proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
