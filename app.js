/**
 * Module dependencies.
 */

var express = require('express')
    , sync = require('./syncmodule')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.get('/:lib/:version/*', sync);
app.use(express.static(path.join(__dirname, 'serve/npm')));

app.listen(app.get('port'));

