var express = require('express');
var colors = require('colors/safe');
var moment = require('moment');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');

var app = express();
app.use(express.static('img'));

function log(msg) {
    console.log(colors.green('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ') + msg);
}

app.get('/', function (req, res) {
    res.json({success: "ext"});
});

app.post('/', function (req, res) {
    log('Handling post request...');
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/img/' + moment().format('YYYY-MM-DD'));
    fs.mkdir(form.uploadDir, function () {
        form.parse(req, function (err, fields, files) {
            files = files[''];
            for (var i = 0; i < files.length; i++) {
                files[i]['path'] = files[i]['path'].replace(path.join(__dirname, '/img/'), '').replace(/\\/g, '/');
            }
            res.json(files);
        });
    });
});

app.listen(9007, function () {
    log('Server started.');
});
