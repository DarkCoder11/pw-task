const express = require('express');
const AuthController = require('../controllers/auth');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const TransController = require('../controllers/transController');

const router = express.Router();

router.post('/users', AuthController.register);
router.post('/sessions/create', AuthController.login);
router.get('/logout', AuthController.logout);

router.get(
  '/transactions',
  AuthMiddleware.protect,
  TransController.getAllTransactions,
);
router.post(
  '/transactions',
  AuthMiddleware.protect,
  TransController.createTransaction,
);
router.get('/user-info', AuthMiddleware.protect, TransController.getUser);
router.post('/users/list', AuthMiddleware.protect, TransController.filterUser);

module.exports = router;
