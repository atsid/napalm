[![Code Climate](https://codeclimate.com/github/atsid/napalm/badges/gpa.svg)](https://codeclimate.com/github/atsid/napalm)
[![Build Status](https://travis-ci.org/atsid/napalm.svg?branch=master)](https://travis-ci.org/atsid/napalm)
[![Dependency Status](https://david-dm.org/atsid/napalm.svg)](https://david-dm.org/atsid/napalm)
[![Dev Dependency Status](https://david-dm.org/atsid/dev-status/napalm.svg)](https://david-dm.org/atsid/napalm)


napalm
===============

An express server that serves libraries published to npm.

A request of the form: http://napalm-server/underscore/1.4.4/underscore.js will result in the
underscore.js file being served if underscore@1.4.4 has been published to npm and that file exists
in its root.

The server installs and caches the npm modules it attempts to serve.

Self-contained express app server:
```
npm install; // to install that app once cloned
node main.js; // to run
```

http://host:4000 // to access the app locally.


