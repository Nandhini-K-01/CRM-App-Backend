const express = require("express");
const leadsModule = require("../modules/leadsModule")
const auth = require("../modules/authModule")
const router = express.Router()

router.get("/get", leadsModule.getLeads)
router.put("/update/:id", auth.authorizeUser ,leadsModule.updateLeads)
router.post("/create", auth.authorizeUser, leadsModule.createLeads)
router.delete("/delete/:id", auth.authorizeUser, leadsModule.deleteLeads)

module.exports = router;