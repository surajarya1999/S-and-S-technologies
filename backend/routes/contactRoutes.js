const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getContacts); // Baad me admin auth middleware add karege

module.exports = router;