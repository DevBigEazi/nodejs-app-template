const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const loginLimiter = require("../middleware/loginLimitter");
const { protect } = require("../middleware/protect");
const ROLE_LIST = require("../config/roleList");
const verifyRoles = require("../middleware/verifyRoles");

router
    .route('/')
    .post(protect, verifyRoles(ROLE_LIST.Director), adminController.handleNewAdmin)
    .patch(protect, verifyRoles(ROLE_LIST.Director), adminController.handleUpdateAdmin)
    .delete(protect, verifyRoles(ROLE_LIST.Director), adminController.handleDeleteAdmin)

router.route('/auth')
    .post(loginLimiter, adminController.handleLogin)


module.exports = router;