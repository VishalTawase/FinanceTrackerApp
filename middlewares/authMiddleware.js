// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel.js");

// // Middleware to verify user authentication
// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1]; // Extract token

//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("🔍 Incoming Request to:", req.originalUrl);
    console.log("🛠️ Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
        console.log("🚨 No Token Provided!");
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified;
        console.log("✅ Token Verified. User:", verified);
        next();
    } catch (error) {
        console.log("🚨 Invalid Token:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;

