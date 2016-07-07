var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  news: [{
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    link: {
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
  }
};
module.exports = _.assign(module.exports, models);
