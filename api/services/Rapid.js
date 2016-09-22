var mongoose = require('mongoose');
var objectid = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var schema = new Schema({
    contestName: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    question: [{
        questionName: {
            type: String,
            default: ""
        },
        option: [{
            type: String,
            default: ""
        }],
        order: {
            type: String,
            default: ""
        },
        option1: {
            type: String,
            default: ""
        },
        option2: {
            type: String,
            default: ""
        },
        option3: {
            type: String,
            default: ""
        },
        option4: {
            type: String,
            default: ""
        },
        correctOption: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: ""
        }
    }]
});

module.exports = mongoose.model('Rapid', schema);
var models = {
    saveData: function(data, callback) {
        var rapid = this(data);
        rapid.timestamp = new Date();
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
            rapid.save(function(err, created) {
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
                    Rapid.count({
                        contestName: {
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
                    Rapid.find({
                        contestName: {
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




    //RAPID CONTROLLER


    //SIDEMENU NEW AWARD

    saveQuestion: function(data, callback) {
      console.log(data);
      var rapid = data.rapid;
      if (!data._id) {
        Rapid.update({
          _id: rapid
        }, {
          $push: {
            question: data
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
        var attribute = "question.$.";
        _.forIn(data, function(value, key) {
          tobechanged[attribute + key] = value;
        });
        Rapid.update({
          "question._id": data._id
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

    getAllQuestion: function(data, callback) {
      var newreturns = {};
      newreturns.data = [];
      var check = new RegExp(data.search, "i");
      data.pagenumber = parseInt(data.pagenumber);
      data.pagesize = parseInt(data.pagesize);
      var skip = parseInt(data.pagesize * (data.pagenumber - 1));
      async.parallel([
          function(callback) {
            Rapid.aggregate([{
              $match: {
                _id: objectid(data._id)
              }
            }, {
              $unwind: "$question"
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
            Rapid.aggregate([{
              $match: {
                _id: objectid(data._id)
              }
            }, {
              $unwind: "$question"
            }, {
              $group: {
                _id: "_id",
                question: {
                  $push: "$question"
                }
              }
            }, {
              $project: {
                _id: 0,
                question: {
                  $slice: ["$question", skip, data.pagesize]
                }
              }
            }]).exec(function(err, found) {
              console.log(found);
              if (found && found.length > 0) {
                newreturns.data = found[0].question;
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


    deleteQuestion: function(data, callback) {
      Rapid.update({
        "question._id": data._id
      }, {
        $pull: {
          "question": {
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
    getOneQuestion: function(data, callback) {
      // aggregate query
      Rapid.aggregate([{
        $unwind: "$question"
      }, {
        $match: {
          "question._id": objectid(data._id)
        }
      }, {
        $project: {
          question: 1
        }
      }]).exec(function(err, respo) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (respo && respo.length > 0 && respo[0].question) {
          callback(null, respo[0].question);
        } else {
          callback({
            message: "No data found"
          }, null);
        }
      });
    },


};

module.exports = _.assign(module.exports, models);
