var npm = require("npm")
    , path = require("path")
    , fs = require("fs")
    , assert = require("assert")
    , fs_extra = require("fs-extra")
    ;

function log_error(err) {
    console.log(err);
};

module.exports = function (req, res) {
    var path = "stage/" + req.params.lib + "/" + req.params.version
        , package = req.params.lib + "@" + req.params.version
        , stagePath = path + "/node_modules/" + req.params.lib
        , cwd = process.cwd()
        , servePath = "serve/npm/" + req.params.lib + "/" + req.params.version
        ;
    fs.stat(path, function (err, stats) {
        if (err) {
            fs_extra.mkdirp(servePath, function (err) {
                log_error(err);
                fs_extra.mkdirp(path, function (err) {
                    log_error(err);
                    npm.load({}, function (err) {
                        log_error(err);
                        var tmp = npm.commands.install(path, [package], function (err) {
                            fs_extra.copy(stagePath, servePath, function (err) {
                                log_error(err);
                                req.next();
                                console.log("installed: " + package);
                            });
                        });
                    });
                })
            });
        } else {
            req.next();
        }
    });
};