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
    delete: function (req, res) {
				if (req.body) {
					Movie.deleteData(req.body, res.callback);
				} else {
					res.json({
						value: false,
						data: "Invalid Request"
					});
				}
    },
    find: function (req, res) {
			if (req.body) {
				Movie.getAll(req.body, res.callback);
			} else {
				res.json({
					value: false,
					data: "Invalid Request"
				});
			}
    },
    findCast: function (req, res) {
			if (req.body) {
				Movie.getAllCast(req.body, res.callback);
			} else {
				res.json({
					value: false,
					data: "Invalid Request"
				});
			}
    },
    findOneCast: function (req, res) {
			if (req.body) {
				Movie.getOneCast(req.body, res.callback);
			} else {
				res.json({
					value: false,
					data: "Invalid Request"
				});
			}
    },
		saveCast: function(req, res) {
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
		deleteCast: function(req, res) {
			 if (req.body) {
					 if (req.body._id && req.body._id != "") {
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
    findOne: function (req, res) {
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
};
