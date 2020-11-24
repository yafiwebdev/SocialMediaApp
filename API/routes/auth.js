const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.put(
	'/register',
	[
		body('email')
			.normalizeEmail()
			.isEmail()
			.withMessage('Email invalid!'),
		body('username')
			.trim()
			.isLength({ min: 8 })
			.withMessage('Username is too short!'),
		body('password', 'Password too short!')
			.trim()
			.isLength({ min: 8 }),
		body('confirm_password')
			.trim()
			.custom((confirmPassword, { req }) => {
				if(confirmPassword !== req.body.password) {
					throw Error('Passwords do not match!');
				}

				return true;
			}),
		body('firstname', 'First name has to be of type string!')
			.optional()
			.trim()
			.isString(),
		body('lastname', 'Last name has to be of type string!')
			.optional()
			.trim()
			.isString()
	],
	authController.register
);

router.post('/login', authController.login);

module.exports = router;