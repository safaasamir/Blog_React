const express=require("express")
const {SignUp,Login, getProfile, logout}= require("../controller/users.controller");

const router = express.Router();

router.post("/signup",SignUp)
router.post("/login",Login)
router.get("/profile",getProfile)
router.post("/logout",logout)

module.exports = router