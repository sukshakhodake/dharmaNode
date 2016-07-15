module.exports = {
  save: function(req, res) {
    if (req.body) {
      Movie.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  delete: function(req, res) {
    if (req.body) {
      Movie.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  find: function(req, res) {
    if (req.body) {
      Movie.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  findOne: function(req, res) {
    if (req.body) {
      Movie.getOne(req.body, res.callback);
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
        Movie.findLimited(req.body, res.callback);
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


  // cast

  findCast: function(req, res) {
    if (req.body.pagenumber && req.body.pagesize) {
      Movie.getAllCast(req.body, function(err, respo) {
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
  findOneCast: function(req, res) {
    if (req.body) {
      Movie.getOneCast(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  deleteCast: function(req, res) {
    if (req.body) {
      if (req.body._id && req.body._id !== "") {
        //	console.log("not valid");
        Movie.deleteCast(req.body, function(err, respo) {
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
  saveCast: function(req, res) {
		console.log(req.body);
    if (req.body) {
      Movie.saveCast(req.body, function(err, respo) {
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



	// crew

	findCrew: function(req, res) {
		if (req.body.pagenumber && req.body.pagesize) {
			Movie.getAllCrew(req.body, function(err, respo) {
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
	findOneCrew: function(req, res) {
		if (req.body) {
			Movie.getOneCrew(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: "Invalid Request"
			});
		}
	},

	deleteCrew: function(req, res) {
		if (req.body) {
			if (req.body._id && req.body._id !== "") {
				//	console.log("not valid");
				Movie.deleteCrew(req.body, function(err, respo) {
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
	saveCrew: function(req, res) {
		console.log(req.body);
		if (req.body) {
			Movie.saveCrew(req.body, function(err, respo) {
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
};
