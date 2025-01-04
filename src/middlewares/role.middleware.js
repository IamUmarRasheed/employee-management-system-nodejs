
export const authorizeRole = (roles) => {
    return (req, res, next) => {
      const { role } = req.user;
      console.log("role",role)
      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Forbidden YOU HAVE NOT ACCESS TO..." });
      }
  
      next();
    };
  };