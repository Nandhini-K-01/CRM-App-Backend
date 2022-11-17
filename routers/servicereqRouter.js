const express = require("express");
const servicereqModule = require("../modules/servicereqModule")
const auth = require("../modules/authModule")
const router = express.Router()

router.get("/get", servicereqModule.getServices)
router.put("/update/:id", auth.authorizeUser ,servicereqModule.updateServices)
router.post("/create", auth.authorizeUser, servicereqModule.createServices)
router.delete("/delete/:id", auth.authorizeUser, servicereqModule.deleteServices)

module.exports = router;