#!/usr/bin/env node

const express = require('express');
const colors = require('colors/safe');
const moment = require('moment');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Configurations
var dir = 'static/data/';
var app = express();
app.set('view engine', 'pug');
app.use(express.static('static'));

// Common methods
function log(msg, color) {
    if (color === undefined || color === null) color = colors.green;
    console.log(color('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ') + msg);
}

function listdir(dir) {
    var files = fs.readdirSync(dir);
    var tree = [];
    for (var i = 0; i < files.length; i++) {
        var p = path.join(dir, files[i]);
        var is_dir = fs.lstatSync(p).isDirectory();
        tree.push({
            name: files[i],
            directory: is_dir,
            children: is_dir ? listdir(p) : null
        });
    }
    return tree;
}

function senderr(res) {
    res.writeHead(404, {'Content-Type': 'image/gif'});
    res.end(fs.readFileSync('static/img/404.gif'), 'binary');
}

// Views
app.get('*', function (req, res) {
    var v = req.path.replace(/\//g, '');
    if (v === 'list') {
        log('Processing list request...');
        res.send(listdir(dir));
    } else {
        if (v === '') v = 'index';
        log('Processing view request: ' + v);
        try {
            res.render(v, null, function (err, html) {
                if (err) {
                    log('View not found: ' + v, colors.red);
                    senderr(res);
                } else {
                    res.send(html);
                }
            });
        } catch (exp) {
            log('File not found: ' + v, colors.red);
            senderr(res);
        }
    }
});

app.post('/', function (req, res) {
    log('Handling post request...');
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.uploadDir = path.join(dir, moment().format('YYYY-MM-DD'));
    fs.mkdir(form.uploadDir, function () {
        form.parse(req, function (err, fields, files) {
            var f = files[''];
            if (f === undefined) f = files['files[]'];
            if (f === undefined) f = files['files'];
            if (f === undefined) f = files['file'];
            if (f) {
                if (f.constructor !== Array) f = [f];
                for (var i = 0; i < f.length; i++) {
                    f[i]['path'] = f[i]['path'].replace('static/', '').replace(/\\/g, '/');
                }
                res.json(f);
            } else {
                log('Error while handling post request.', colors.red);
                res.status(500).send();
            }
        });
    });
});

app.listen(9007, function () {
    log('Server listening on port 9007.');
});
