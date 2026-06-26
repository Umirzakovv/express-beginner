export function allowRoles(...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Bu API uchun ruxsat yo'q",
      });
    }

    next();
  };
}