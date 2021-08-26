const { Router } = require("express");
const router = Router();
const { userLogin, userSignup } = require("../controllers/user.ctrl");

router.post("/signup", userSignup);
router.post("/login", userLogin);


module.exports = router;
