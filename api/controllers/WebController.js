module.exports = {
    index: function(req, res) {
        var jsFiles = require("../../frontend/files.js");
        res.view(sails.config.environment, {
            jsFiles: jsFiles,
            title: "Dharma Production",
            description: "Dharma Production",
            keywords: "Dharma Production",
            image: "http://www.wohlig.com/img/logo.png",
        });
    },
    download: function(req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    backend: function(req, res) {
        var jsFiles = require("../../backend/files.js");
        res.view("backend", {
            jsFiles: jsFiles,
            title: "Dharma Production Backend",
            description: "Dharma Production Backend",
            keywords: "Dharma Production Backend",
            image: "http://www.wohlig.com/img/logo.png",
        });
    }
};
