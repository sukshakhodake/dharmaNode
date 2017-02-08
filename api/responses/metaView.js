module.exports = function(data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    console.log('reqqqqqqqqqqqqqqqqqqqqqqq', req);
    console.log('dattttttttttttttttttta', data);
    console.log('reqqqqqqqqqqqqqqqqqqqqqqqqqppppppppppppppppppppp', req.path);
    var env = require("../../config/env/" + sails.config.environment + ".js");
    var scoerPath = req.path;
    if(scoerPath.indexOf('/fan-corner-score') == -1){
      console.log('iffffff score');
      var obj = {
          jsFiles: jsFiles,
          title: data.title,
          description: data.description,
          keywords: data.keywords,
          adminurl: env.realHost + "/api/",
          image: env.realHost + "/api/download/" + data.image,
          url: env.realHost + req.path,
      };
    }else{
      console.log('elseeeeeee score');
      var obj = {
          jsFiles: jsFiles,
          title: data.title,
          description: data.description,
          keywords: data.keywords,
          adminurl: env.realHost + "/api/",
          image: env.realHost + "/api/download/" + data.image,
          url: env.realHost + '/fan-corner',
      };
    }

    if (!data.image) {
        delete obj.image;
    }
    // console.log(obj);
    res.view(sails.config.environment, obj);
};
