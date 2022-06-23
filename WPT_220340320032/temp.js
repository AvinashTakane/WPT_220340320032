let dbParameters = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'book',
	port: 3306
};
const mysql = require("mysql2");
let conn = mysql.createConnection(dbParameters);
const express = require("express");
const { Console } = require("console");
const app = express();
app.use(express.static("abc"));
app.get("/getItem", (req, res) => {
	let id = req.query.id;
	let output = { status: false, row: {} };
	conn.query("select * from book where bookid=?", [id], (err, rows) => {
		if (rows.length > 0) {
			console.log("Connected to database");
			output.status = true;
			output.row = rows[0];
			console.log(rows[0]);
		}
		if (err) {
			console.log("Could not connect to database");
		}
		res.send(output);
	});
});
app.get("/update", (req, res) => {
	let input = {
		price: req.query.price, id: req.query.id
	}
	let output = { status: false }
	conn.query('update book set price=? where bookid =? ', [input.price, input.id], (err, res1) => {
		if (err) {
			console.log("error occurred " + err);
		} else {
			if (res1.affectedRows > 0) {
				output.status = true;
			}
		}
		res.send(output);
	});
});
app.listen(8081, function () {
	console.log("server listening at port 8081...");
});