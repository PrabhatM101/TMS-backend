const express = require('express');
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require('../middlewares/validate.middleware');
const validation = require('../validations/user.validate');
const validateObjectId = require('../middlewares/validateObjectId');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('', validate(validation.registerSchema), controller.registerUser);
router.get('/:id',validateObjectId("id"),authMiddleware, controller.getUserById);
router.patch('/:id',validateObjectId("id"),authMiddleware, validate(validation.updateSchema), controller.updateUser);
router.delete('/:id',validateObjectId("id"),authMiddleware, controller.deleteUser);

module.exports = router;
