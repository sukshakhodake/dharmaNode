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
    // saveData: function(data, callback) {
    //   var subscribe = this(data);
    //   subscribe.timestamp = new Date();
    //   subscribe.save(function(err, created) {
    //     if (err) {
    //       callback(err, null);
    //     } else if (created) {
    //       callback(null, created);
    //     } else {
    //       callback(null, {});
    //     }
    //   });
    // },
    saveData: function(data, callback) {
        var subscribe = this(data);
        if (data.email) {
            this.findOne({
                email: data.email
            }, data, function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(data2);
                    if (data2 == null) {
                        subscribe.save(function(err, data2) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, data2);
                            }
                        });
                    } else {
                        callback(null, {
                            message: "already exist"
                        });
                    }


                }
            });
        } else {
            //booking.timestamp = new Date();
            subscribe.save(function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

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
