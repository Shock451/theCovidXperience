require('dotenv').config();

// required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const multer = require("multer");

var mysql = require('mysql');
let db_config = {}

if (process.env.NODE_ENV === "production") {
    db_config = {
        host: process.env.REMOTE_DB_HOST,
        user: process.env.REMOTE_DB_USER,
        password: process.env.REMOTE_DB_PASS,
        database: process.env.REMOTE_DB_NAME
    }
} else{
    db_config = {
        host: process.env.LOCAL_DB_HOST,
        user: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASS,
        database: process.env.LOCAL_DB_NAME
    }
}

const connection = mysql.createConnection(db_config);

app.disable("x-powered-by");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./build/static/uploads");
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

module.exports = connection;

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser());

app.post("/api/posts", upload.single('image'), function (req, res) {
    const image_uri = req.file.originalname;
    const { name, story } = req.body;

    connection.query("Insert into posts set ?", { name, story, image_uri }, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/api/posts/:id/like', function (req, res) {
    connection.query("Update posts set likes=likes+1 where id=?", req.params.id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });

});

app.post('/api/posts/:id/unlike', function (req, res) {
    connection.query("Update posts set likes=likes-1 where id=?", req.params.id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });

});

app.post('/api/posts/:id/share', function (req, res) {
    connection.query("Update posts set shares=shares+1 where id=?", req.params.id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });

});

app.get('/api/posts', function (req, res) {
    connection.query("Select * from posts ORDER BY id desc", function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });

});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build'));
})

app.listen(process.env.PORT || 3001);