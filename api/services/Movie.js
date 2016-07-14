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
  getAllCast: function(data, callback) {
    this.findOne({
      "_id": data._id
    }, {
      cast: 1
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
  saveCast: function(data, callback) {
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
            ExpertUser.update({
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
  }
};
module.exports = _.assign(module.exports, models);
