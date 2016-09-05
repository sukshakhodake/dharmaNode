module.exports = function(data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    if (!sails.config.host) {
        sails.config.host = "http://localhost";
    }
    res.view(sails.config.environment, {
        jsFiles: jsFiles,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        adminurl: sails.config.host + ":" + sails.config.port + "/api/",
        image: sails.config.host + ":" + sails.config.port + "/api/upload/readFile?file=" + data.image,
        url: sails.config.host + ":" + sails.config.port + req.path,

    });
};
