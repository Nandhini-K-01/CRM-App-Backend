const express = require("express");
const contactModule = require("../modules/contactModule")
const auth = require("../modules/authModule")
const router = express.Router()

router.get("/get", contactModule.getContacts)
router.put("/update/:id", auth.authorizeUser ,contactModule.updateContacts)
router.post("/create", auth.authorizeUser, contactModule.createContacts)
router.delete("/delete/:id", auth.authorizeUser, contactModule.deleteContacts)

module.exports = router;