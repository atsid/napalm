/**
 * Server app that responds to requests for files belonging to a particular version
 * of a particular library that has been published to npm.
 *
 * e.g. a request to napalm-host/underscore/1.4.4/underscore.js will be fulfilled if the
 * underscore@1.4.4 has been published to npm and the file underscore.js exists in it's
 * root directory.
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

