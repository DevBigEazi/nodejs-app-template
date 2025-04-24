const express = require('express');
const router = express.Router();
const AdminAuthController = require("../controllers/adminAuthController");

router.route("/")
    .post(AdminAuthController.login)

router.route("/refresh")
    .get(AdminAuthController.refresh)

module.exports = router;