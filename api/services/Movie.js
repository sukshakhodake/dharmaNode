var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;

var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  bigImage: {
    type: String,
    default: ""
  },
  smallImage: {
    type: String,
    default: ""
  },
  mediumImage: {
    type: String,
    default: ""
  },
  cutImage: {
    type: String,
    default: ""
  },
  releaseType: {
    type: String,
    default: ""
  },
  synopsis: {
    type: String,
    default: ""
  },
  cast: [{
    actor: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    }
  }],
  crew: [{
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }],
  gallery: [{
    image: {
      type: String,
      default: ""
    },
    order: {
      type: String,
      default: ""
    }
  }],
  videos: [{
    url: {
      type: String,
      default: ""
    },
    order: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: String,
      default: ""
    }
  }],
  wallpaper: [{
    type: {
      type: String,
      default: ""
    },
    order: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    }
  }],
  awards: [{
    awardname: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    winner: {
      type: String,
      default: ""
    },
    year: {
      type: String,
      default: ""
    }
  }],


});

module.exports = mongoose.model('Movie', schema);
var models = {
  saveData: function(data, callback) {
    var movie = this(data);
    movie.timestamp = new Date();
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (updated) {
          callback(null, updated);
        } else {
          callback(null, {});
        }
      });
    } else {
      movie.timestamp = new Date();
      movie.save(function(err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
        } else {
          callback(null, {});
        }
      });
    }
  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  getAll: function(data, callback) {
    this.find({}).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getOne: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },

  findLimited: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          Movie.count({
            name: {
              '$regex': check
            }
          }).exec(function(err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number != "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function(callback) {
          Movie.find({
            name: {
              '$regex': check
            }
          }, {
            password: 0
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  //SIDEMENU CAST

  saveCast: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          cast: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "cast.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "cast._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllCast: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$cast"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$cast"
          }, {
            $group: {
              _id: "_id",
              cast: {
                $push: "$cast"
              }
            }
          }, {
            $project: {
              _id: 0,
              cast: {
                $slice: ["$cast", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].cast;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteCast: function(data, callback) {
    Movie.update({
      "cast._id": data._id
    }, {
      $pull: {
        "cast": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneCast: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$cast"
    }, {
      $match: {
        "cast._id": objectid(data._id)
      }
    }, {
      $project: {
        cast: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].cast) {
        callback(null, respo[0].cast);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },



  //SIDEMENU CREW

  saveCrew: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          crew: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "crew.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "crew._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllCrew: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$crew"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$crew"
          }, {
            $group: {
              _id: "_id",
              crew: {
                $push: "$crew"
              }
            }
          }, {
            $project: {
              _id: 0,
              crew: {
                $slice: ["$crew", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].crew;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteCrew: function(data, callback) {
    Movie.update({
      "crew._id": data._id
    }, {
      $pull: {
        "crew": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneCrew: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$crew"
    }, {
      $match: {
        "crew._id": objectid(data._id)
      }
    }, {
      $project: {
        crew: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].crew) {
        callback(null, respo[0].crew);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },


  //SIDEMENU Gallery

  saveGallery: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          gallery: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "gallery.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "gallery._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllGallery: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$gallery"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$gallery"
          }, {
            $group: {
              _id: "_id",
              gallery: {
                $push: "$gallery"
              }
            }
          }, {
            $project: {
              _id: 0,
              gallery: {
                $slice: ["$gallery", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].gallery;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteGallery: function(data, callback) {
    Movie.update({
      "gallery._id": data._id
    }, {
      $pull: {
        "gallery": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneGallery: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$gallery"
    }, {
      $match: {
        "gallery._id": objectid(data._id)
      }
    }, {
      $project: {
        gallery: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].gallery) {
        callback(null, respo[0].gallery);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },


  //SIDEMENU Videos

  saveVideos: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          videos: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "videos.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "videos._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllVideos: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$videos"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$videos"
          }, {
            $group: {
              _id: "_id",
              videos: {
                $push: "$videos"
              }
            }
          }, {
            $project: {
              _id: 0,
              videos: {
                $slice: ["$videos", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].videos;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteVideos: function(data, callback) {
    Movie.update({
      "videos._id": data._id
    }, {
      $pull: {
        "videos": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneVideos: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$videos"
    }, {
      $match: {
        "videos._id": objectid(data._id)
      }
    }, {
      $project: {
        videos: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].videos) {
        callback(null, respo[0].videos);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },


  //SIDEMENU Wallpaper

  saveWallpaper: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          videos: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "wallpaper.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "wallpaper._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllWallpaper: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$wallpaper"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$wallpaper"
          }, {
            $group: {
              _id: "_id",
              wallpaper: {
                $push: "$wallpaper"
              }
            }
          }, {
            $project: {
              _id: 0,
              wallpaper: {
                $slice: ["$wallpaper", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].wallpaper;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteWallpaper: function(data, callback) {
    Movie.update({
      "wallpaper._id": data._id
    }, {
      $pull: {
        "wallpaper": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneWallpaper: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$wallpaper"
    }, {
      $match: {
        "wallpaper._id": objectid(data._id)
      }
    }, {
      $project: {
        wallpaper: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].wallpaper) {
        callback(null, respo[0].wallpaper);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },


  //SIDEMENU Awards

  saveAwards: function(data, callback) {
    console.log(data);
    var movie = data.movie;
    if (!data._id) {
      Movie.update({
        _id: movie
      }, {
        $push: {
          videos: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "awards.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Movie.update({
        "awards._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllAwards: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$awards"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          Movie.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$awards"
          }, {
            $group: {
              _id: "_id",
              awards: {
                $push: "$awards"
              }
            }
          }, {
            $project: {
              _id: 0,
              awards: {
                $slice: ["$awards", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].awards;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },


  deleteAwards: function(data, callback) {
    Movie.update({
      "awards._id": data._id
    }, {
      $pull: {
        "awards": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneAwards: function(data, callback) {
    // aggregate query
    Movie.aggregate([{
      $unwind: "$awards"
    }, {
      $match: {
        "awards._id": objectid(data._id)
      }
    }, {
      $project: {
        awards: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].awards) {
        callback(null, respo[0].awards);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },
};
module.exports = _.assign(module.exports, models);
