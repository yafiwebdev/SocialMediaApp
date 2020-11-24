const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.register = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		const error = new Error('Validation failed!');
		error.statusCode = 422;
		error.data = errors.array();

		throw error;
	}

	const {
		email,
		username,
		password,
		firstName,
		lastName } = req.body;

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const newUser = await new User({
			email,
			username,
			firstName,
			lastName,
			password: hashedPassword
		})
		.save();

		res.status(201)
			.json({
				message: 'User created successfully',
				userId: newUser._id
			});

	} catch(err) {
		err.statusCode = err.statusCode || 500;
		next(err); // Send error to error-handling middleware in app.js
	}

};

exports.login = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if(!user) {
			const error = new Error('No registered account with this username!');
			error.statusCode = 401;

			throw error;
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);

		if(!passwordsMatch) {
			const error = new Error('Wrong password!');
			error.statusCode = 401;

			throw error;
		}

		const userId = user._id.toString();

		const token = jwt.sign(
			{
				username: user.username,
				userId
			},
			process.env.SECRET_KEY,
			{ expiresIn: '2h'}
		);

		res.status(200).json( { token, userId });

	} catch(err) {

		if(!err.statusCode) {
			err.statusCode = 500;
		}

		next(err);
	}
};