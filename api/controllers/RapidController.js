
module.exports = {
  save: function(req, res) {
    if (req.body) {

      Rapid.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function(req, res) {

    if (req.body) {
      Rapid.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function(req, res) {
    if (req.body) {
      Rapid.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function(req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      Rapid.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function(req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        Rapid.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Please provide parameters"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },



  // RAPID QUESTIONS



    findQuestion: function(req, res) {
      if (req.body.pagenumber && req.body.pagesize) {
        Rapid.getAllQuestion(req.body, function(err, respo) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: respo
            });
          }
        });
      } else {
        res.json({
          value: false,
          data: "Invalid call"
        });
      }
    },
    findOneQuestion: function(req, res) {
      if (req.body) {
        Rapid.getOneQuestion(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Invalid Request"
        });
      }
    },

    deleteQuestion: function(req, res) {
      if (req.body) {
        if (req.body._id && req.body._id !== "") {
          //	console.log("not valid");
          Rapid.deleteQuestion(req.body, function(err, respo) {
            if (err) {
              res.json({
                value: false,
                data: err
              });
            } else {
              res.json({
                value: true,
                data: respo
              });
            }
          });
        } else {
          res.json({
            value: false,
            data: "Invalid Id"
          });
        }
      } else {
        res.json({
          value: false,
          data: "Invalid call"
        });
      }
    },
    saveQuestion: function(req, res) {
      console.log(req.body);
      if (req.body) {
        Rapid.saveQuestion(req.body, function(err, respo) {
          if (err) {
            res.json({
              value: false,
              data: err
            });
          } else {
            res.json({
              value: true,
              data: respo
            });
          }
        });
      } else {
        res.json({
          value: false,
          data: "Invalid call"
        });
      }
    },
    // AWARD API
};
