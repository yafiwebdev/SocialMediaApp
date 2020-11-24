require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res, next) => {
	return res.json({message: 'API works!'});
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	console.log(error);

	const statusCode = error.statusCode || 500;
	const message = error.message;
	const data = error.data;

	res.status(statusCode).json({ message, data });
});

const port = process.env.PORT || '8080';

mongoose.connect(
	process.env.DB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true } // Avoid deprecation errors
)
.then(() => {
	app.listen(port);
})
.catch(err => {
	console.log(err);
})
