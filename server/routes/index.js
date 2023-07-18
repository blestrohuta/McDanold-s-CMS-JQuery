const express = require("express");
const router = express.Router();

const user = require("./user");
const customer = require("./customer");

router.use("/customers", customer);
router.use("/", user);

module.exports = router;
