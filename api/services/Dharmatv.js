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
    image: String,
    title: String,
    videos: [{
        thumbnail: String,
        url: String,
        description: String
    }],


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
        this.find({}).populate("movie","name").sort({ "upcomingOrder": -1 }).lean().exec(function(err, found) {
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
    getData: function(data, callback) {
        this.find({}, {
            url: 1
        }).lean().exec(function(err, found) {
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
        console.log(check);
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
        console.log(data.search);
        var check = new RegExp(data.search, "i");
        Dharmatv.aggregate([{
            $lookup: {
                from: 'movies',
                localField: 'movie',
                foreignField: '_id',
                as: 'movie'
            }
        }, {
            $unwind: "$movie"
        }, {
            $unwind: "$tag"
        }, {
            $unwind: "$videos"
        }, {
            $match: {
                videos: {
                    $exists: true
                },
                $or: [{
                    title: {
                        $regex: check
                    }
                }, {
                    "movie.name": {
                        $regex: check
                    }
                }, {
                    tag: {
                        $regex: check
                    }
                }, {
                    "videos.description": {
                        $regex: check
                    }
                }]
            }
        }, {
            $group: {
                _id: "$_id",
                movie: {
                    $addToSet: "$movie.name"
                },
                videos: {
                    $addToSet: "$videos"
                }
            }
        }, {
            $unwind: "$movie"
        }]).exec(function(err, data2) {
            // console.log(data2);
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (data2 && data2.length > 0) {
                // newreturns.data = data2;
                callback(null, data2);
            } else {
                callback(null, data2);
            }
        });
    },
    getDharmaTvHomeSlider: function(data, callback) {
        this.find({}).sort({
            _id: -1
        }).sort({
          order: -1,
        }).limit(20).exec(function(err, found) {
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
