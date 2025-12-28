const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({
                message: "Role missing in token",
                success: false
            });
        }

        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({
                message: `Role ${req.role} not allowed`,
                success: false
            });
        }

        next();
    };
};

export default authorizeRoles;
