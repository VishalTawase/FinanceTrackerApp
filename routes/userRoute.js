const express = require("express");
const {loginController,registerController,updatePassword,updateBudget,getBudget} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

router.put("/update-password", updatePassword);

router.post("/update-budget", authMiddleware, updateBudget);
router.get("/budget", authMiddleware, getBudget);
module.exports = router;