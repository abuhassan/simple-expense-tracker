// utils/roleChecks.js

export const canAccessAdminPanel = (user) => {
  return user && (user.role === "admin" || user.role === "masterAdmin");
};

export const canManageOrganization = (user) => {
  return user && (user.role === "orgSupervisor" || user.role === "masterAdmin");
};
