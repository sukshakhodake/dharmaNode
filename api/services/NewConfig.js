/**
 * NewConfig.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var schema = new Schema({
   title: {
     type: String,
     default: ""
   },
   description: {
     type: String,
     default: ""
   },
   thumbnail: {
     type: String,
     default: ""
   },
   url: {
     type: String,
     default: ""
   }



 });

 module.exports = mongoose.model('NewConfig', schema);
 var models = {
   saveData: function(data, callback) {
     var newConfig = this(data);
     newConfig.timestamp = new Date();
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
       newConfig.save(function(err, created) {
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
 };

 module.exports = _.assign(module.exports, models);
