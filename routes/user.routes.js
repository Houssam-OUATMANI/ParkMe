const { Router } = require("express");
const router = Router();

const { userLogin, userSignup } = require("../controllers/user.ctrl");
const multer = require("../middlewares/upload.middleware");

router.post("/signup", multer, userSignup);
router.post("/login", userLogin);

module.exports = router;
