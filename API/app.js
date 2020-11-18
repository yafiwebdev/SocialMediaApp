const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res, next) => {
	return res.json({message: 'API works!'});
});

const port = process.env.PORT || '8000';

app.listen(port);