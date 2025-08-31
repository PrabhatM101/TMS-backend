const express = require('express');
const router = express.Router();

const controller = require("../controllers/auth.controller");
const validate = require('../middlewares/validate.middleware');
const validation = require('../validations/auth.validate');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', validate(validation.loginSchema), controller.login);
router.post('/logout', authMiddleware, controller.logout);

module.exports = router;
