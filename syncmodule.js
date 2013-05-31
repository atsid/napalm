/**
 * Module that retrieves npm published modules and makes them available
 * for serving if they do not already exist on this server.
 */
var npm = require("npm")
    , path = require("path")
    , fs = require("fs")
    , assert = require("assert")
    , fs_extra = require("fs-extra")
    ;

function log_error(err, msg) {
    if (err) {
        console.log(msg + " : " + err);
    }
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
                log_error(err, "At make serve path - " + servePath);
                fs_extra.mkdirp(path, function (err) {
                    log_error(err, "At make staging path - " + path);
                    npm.load({cache: cwd + "/npm-cache"}, function (err) {
                        log_error(err, "on npm load ");
                        var tmp = npm.commands.install(path, [package], function (err) {
                            log_error(err, "At npm install - " + path + " : " + package);
                            if (!err) {
                                fs_extra.copy(stagePath, servePath, function (err) {
                                    log_error(err, "At copy - " + stagePath + " : " + servePath);
                                    console.log("installed: " + package);
                                    req.next();
                                });
                            } else {
                                fs_extra.remove(path);
                                fs_extra.remove(servePath);
                                req.next();
                            }
                        });
                    });
                })
            });
        } else {
            req.next();
        }
    });
};