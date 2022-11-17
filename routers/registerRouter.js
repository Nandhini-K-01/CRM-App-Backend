const express = require("express");
const router = express.Router();
const registerModule = require("../modules/registerModule")

router.post("/signup",registerModule.signup)
router.post("/signin",registerModule.signin)

module.exports = router;
