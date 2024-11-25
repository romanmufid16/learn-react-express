const express = require('express')
const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const { validateRegister, validateLogin } = require('../utils/validators/auth');
const userController = require('../controllers/UserController');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.post('/register', validateRegister, registerController.register);
router.post('/login', validateLogin, loginController.login);

router.get('/admin/users', verifyToken, userController.findUsers);
router.get('/admin/users/:id', verifyToken, userController.findUserById);
router.post('/admin/users', verifyToken, userController.createUser);
router.put('/admin/users/:id', verifyToken, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, userController.deleteUser);

module.exports = router;