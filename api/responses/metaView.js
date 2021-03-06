module.exports = function (data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    var env = require("../../config/env/" + sails.config.environment + ".js");
    var obj = {
        jsFiles: jsFiles,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        adminurl: env.realHost + "/api/",
        image: env.realHost + "/api/download/" + data.image,
        url: env.realHost + req.path,
    };


    if (!data.image) {
        delete obj.image;
    }
    // console.log(sails.config.environment);
    // console.log(obj);
    res.view(sails.config.environment, obj);
};
