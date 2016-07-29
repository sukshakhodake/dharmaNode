var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  image: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    index: true
  }
});

module.exports = mongoose.model('News', schema);
var models = {
  saveData: function(data, callback) {
    if (data.movie === '') {
      delete data.movie;
    }
    var news = this(data);
    news.timestamp = new Date();
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
      news.save(function(err, created) {
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
          News.aggregate([{
            $lookup: {
              from: 'movies',
              localField: 'movie',
              foreignField: '_id',
              as: 'movie'
            }
          }, {
            $unwind: "$movie"
          }, {
            $match: {
              "movie.name": {
                $regex: check
              }
            }
          }, {
            $project: {
              _id: 1,
              date: 1,
              year: {
                $year: "$date"
              },
              month: {
                $month: "$date"
              }
            }
          }, {
            $match: {
              year: parseInt(data.year),
              month: parseInt(data.month)
            }
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }]).exec(function(err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number.length > 0) {
              newreturns.total = number[0].count;
              newreturns.totalpages = Math.ceil(number[0].count / data.pagesize);
              callback(null, newreturns);
            } else {
              newreturns.total = 0;
              newreturns.totalpages = 0;
              callback(null, newreturns);
            }
          });
        },
        function(callback) {
          News.aggregate([{
            $lookup: {
              from: 'movies',
              localField: 'movie',
              foreignField: '_id',
              as: 'movie'
            }
          }, {
            $unwind: "$movie"
          }, {
            $match: {
              "movie.name": {
                $regex: check
              }
            }
          }, {
            $project: {
              _id: 1,
              title: 1,
              image: 1,
              date: 1,
              text: 1,
              year: {
                $year: "$date"
              },
              month: {
                $month: "$date"
              }
            }
          }, {
            $match: {
              year: parseInt(data.year),
              month: parseInt(data.month)
            }
          }]).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, data2);
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



  findLimitedForBackend: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          News.count({
            title: {
              '$regex': check
            }
          }).exec(function(err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number !== "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function(callback) {
          News.find({
            title: {
              '$regex': check
            }
          }).populate("movie").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
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
};

module.exports = _.assign(module.exports, models);
