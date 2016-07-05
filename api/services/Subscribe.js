var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  email: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Subscribe', schema);
var models = {
  saveData: function(data, callback) {
    var subscribe = this(data);
    subscribe.timestamp = new Date();
    subscribe.save(function(err, created) {
      if (err) {
        callback(err, null);
      } else if (created) {
        callback(null, created);
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

};

module.exports = _.assign(module.exports, models);
