const Admin = require("../models/Admin");

const requireAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      firebaseUid: req.user.uid,
      status: "active",
    });

    if (!admin) {
      return res.status(403).json({
        message: "Admin access denied",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);

    return res.status(500).json({
      message: "Server error while checking admin access",
    });
  }
};

module.exports = requireAdmin;
