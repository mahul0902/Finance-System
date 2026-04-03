import {ExpressError} from "./utils/ExpressError.js"

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized. Please log in." });
};

export const hasAccess = (allowedRoles) => {
  return (req, res, next) => {
    // Passport populates req.user after successful login
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: This action requires one of the following roles: ${allowedRoles.join(', ')}` 
      });
    }
    next();
  }
}

export const isActive = (req, res, next) => {
  if(!req.user){
    return next(new ExpressError(401,"Please login to continue"));
  }
  if(req.user.status !== "Active"){
    return next(new ExpressError(403, "You are not an active user. Please contact an admin"));
  }
  next();
}