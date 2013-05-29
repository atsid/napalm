napalm
===============

An express server that serves up libraries published to npm.

A request of the form: http://napalm-server/underscore/1.4.4/underscore.js will result in the
underscore.js file being served if underscore@1.4.4 has been published to npm and that file exists
in its root.

The server installs and caches the npm modules it attempts to serve.

Self-contained express app server:
```
npm install; // to install that app once cloned
npm main; // to run the express app
```

http://host:4000 // to access the app locally.


