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
