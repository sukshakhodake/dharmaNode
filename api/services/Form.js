var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Form', schema);
var models = {
    // saveData: function(data, callback) {
    //   var form = this(data);
    //   form.timestamp = new Date();
    //   form.save(function(err, created) {
    //     if (err) {
    //       callback(err, null);
    //     } else if (created) {
    //       callback(null, created);
    //     } else {
    //       callback(null, {});
    //     }
    //   });
    // },
    saveData: function (data, callback) {
        var form = this(data);
        if (data.email) {
            this.findOne({
                email: data.email
            }, data, function (err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(data2);
                    if (data2 == null) {
                        form.save(function (err, data2) {
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
            form.save(function (err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

    },
    getAll: function (data, callback) {
        this.find({}).exec(function (err, found) {
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

    findLimited: function (data, callback) {
        var newreturns = {};
        newreturns.data = [];
        var check = new RegExp(data.search, "i");
        console.log(check);
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        async.parallel([
                function (callback) {
                    Subscribe.count({
                        email: {
                            '$regex': check
                        }
                    }).exec(function (err, number) {
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
                function (callback) {
                    Subscribe.find({
                        email: {
                            '$regex': check
                        }
                    }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
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
            function (err, data4) {
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