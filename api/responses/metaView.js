module.exports = function(data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    res.view(sails.config.environment, {
        jsFiles: jsFiles,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        adminurl: "http://localhost:" + sails.config.port+"/api",
        image: "http://localhost:" + sails.config.port +"/api/upload/readFile?file=" + data.image,
        url: "http://localhost:" + sails.config.port + req.path,

    });
};
