var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  url: {
    type: String,
    default: ""
  },
  tag: [],
  order: {
    type: String,
    default: ""
  },
  thumbnail: {
    type: String,
    default: ""
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    index: true
  },
  isbanner: {
    type: Boolean,
    default: ""
  },
  image:String,
  title:String,
  videos:[{thumbnail: String,url:String,description:String}],


});

module.exports = mongoose.model('Dharmatv', schema);
var models = {
  saveData: function(data, callback) {
    var dharmatv = this(data);
    dharmatv.timestamp = new Date();
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
      dharmatv.save(function(err, created) {
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
          Dharmatv.count({
            tag: {
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
          Dharmatv.find({
            tag: {
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

  getAllDharmatv: function(data, callback) {
      var check = new RegExp(data.search, "i");
      Dharmatv.find({
          $and: [{
              $or: [{
                  tag: {
                      $regex: check
                  }
              }, {
                  title: {
                      $regex: check
                  }
              }, {
                  "videos.description": {
                      $regex: check
                  }
              }]
          }]
      }).exec(function(err, respo) {
          if (err) {
              console.log(err);
              callback(err, null);
          } else {
              callback(null, respo);
          }
      });
  }
};

module.exports = _.assign(module.exports, models);
