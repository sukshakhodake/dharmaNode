module.exports = {
    index: function(req, res) {
        res.metaView();
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
