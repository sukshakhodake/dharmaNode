module.exports = {
    index: function(req, res) {
        res.metaView();
    },
    movie: function(req, res) {
        if (req.params && req.params[0]) {
            Movie.getOneMovie({
                _id: req.params[0]
            }, function(err, data) {
                if (err) {
                    res.callback(err, data);
                } else if (_.isEmpty(data)) {
                    res.callback(err, data);
                } else {
                    var movie = data.movie;
                    res.metaView({
                        title: movie.name + " - " + movie.year,
                        keywords: movie.keywords,
                        description: movie.desciption,
                        image: movie.mediumImage
                    });
                }
            });
        } else {
            res.metaView();
        }
    },
    download: function(req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    backend: function(req, res) {
        res.view("backend", {
            jsFiles: jsFilesBackend,
            title: "Dharma Production Backend",
            description: "Dharma Production Backend",
            keywords: "Dharma Production Backend",
        });
    }
};
