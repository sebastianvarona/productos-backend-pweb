const express = require('express');
const Database = require('./conf/database');
const config = require('./conf/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors'));


app.use('/producto', require('./routes/router'));

// Conexion con la BD
Database.connect();

app.listen(config.PORT, err => {
	if (err) return console.log(err);
	console.log(`Server running on port: ${config.PORT}`);
});