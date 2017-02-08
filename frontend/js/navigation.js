var imgpath = adminurl + "upload/readFile";
var uploadurl = adminurl + "upload/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Overview",
            classis: "active",
            // noanchor: "overview",
            anchor: "overview",
              subnav: []
            // class: "fa fa-angle-down",
            // subnav: [{
            //     name: "About Us",
            //     classis: "active",
            //     anchor: "overview",
            //     isId: "no",
            // }, {
            //     name: "Dharma Journey",
            //     classis: "active",
            //     anchor: "dharma-journey",
            //     isId: "no",
            // }]
        }, {
            name: "Movies",
            classis: "active",
            anchor: "movies",
            subnav: []
        },

        {
            name: "Videos",
            classis: "active",
            anchor: "dharma-tv",
            subnav: []
        }, {
            name: "Social",
            classis: "active",
            anchor: "dharma-world",
            class: "fa fa-angle-down",

            subnav: [{
                name: "Dharma @ 140",
                classis: "active",
                anchor: "dharma140",
                isId: "yes",
            },

            // {
            //     name: "Dharma & You",
            //     classis: "active",
            //     anchor: "dharma-you",
            //     isId: "no",
            // },

            {
                name: "Fancorner",
                classis: "active",
                anchor: "",
            },

            //  {
            //     name: "Dharma Insta",
            //     classis: "active",
            //     anchor: "dharma-insta",
            //     isId: "no",
            // },

            {
                name: "Fan Corner",
                classis: "active",
                anchor: "fan-landing",
                isId: "no",
            }]
        }, {
            name: "News & Events",
            classis: "active",
            anchor: "news-events",
            subnav: []
        }, {
            name: "Contact Us",
            classis: "active",
            anchor: "contact-us",
            subnav: []
        }
    ];


    return {
        getnav: function () {
            return navigation;
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        getMovieDetails: function (callback) {
            $http.post(adminurl + 'movie/getMovieDetails').then(function (data) {
              data=data.data;
                _.each(data.data, function (n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },

        getJourney: function (callback) {
            $http.post(adminurl + 'journey/getall').then(function (data) {
              data=data.data;
                var a = _.orderBy(data.data, ["date"], ["desc"]);
                _.each(a, function (n) {
                    n.dateShow = moment(a.date).format("D MMM YYYY");
                });
                a = _.reverse(_.toArray(_.groupBy(a, "year")));
                callback(a);
            });
        },
        getNews: function (callback) {
            $http.post(adminurl + 'News/getAll').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        subScribe: function (email, callback) {
            $http.post(adminurl + 'subscribe/saveData', {
                "email": email
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        submitFormData: function (formData, callback) {
            $http.post(adminurl + 'Form/saveData', formData).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        submitFormDataScore: function (formData, callback) {
          console.log('submitFormDataScore',formData);
            $http.post(adminurl + 'Form/getOneFormUpdate', formData).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getDharmatvOne: function (id, callback) {
            $http.post(adminurl + 'Dharmatv/getOne', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllUpcomingMovies: function (callback) {
            $http.post(adminurl + 'Movie/getAllUpcomingMovies').then(function (data) {
              data=data.data;
                _.each(data.data, function (n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },
        getAllUpcomingMoviesHome: function (callback) {
            $http.post(adminurl + 'dharmatv/getDharmaTvHomeSlider').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllRecentMovies: function (callback) {
            $http.post(adminurl + 'Movie/getAllRecentMovies').then(function (data) {
              data=data.data;
                _.each(data.data, function (n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },
        newGetOneMovie: function (id, callback) {
            $http.post(adminurl + 'Movie/getOneMovie', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getMovieAwards: function (id, callback) {
            $http.post(adminurl + 'NewAward/getMovieAward', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getNewsHomeSearch: function (request, i, callback) {
            $http.post(adminurl + 'news/findLimited', request).then(function (data) {
              data=data.data;
                callback(data, i,request.pagenumber);
            });

        },
        getDictionary: function (request, i, callback) {
            $http.post(adminurl + 'dictionary/findLimited', request).then(function (data) {
              data=data.data;
                callback(data, i);
            });
        },
        getAllMovieName: function (callback) {

            $http.post(adminurl + 'Movie/getAllMovieName').then(function (data) {
              data=data.data;
                _.each(data.data, function (n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },
        getAllSlides: function (callback) {
            $http.post(adminurl + 'homeslider/getAllHomeSlider').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getDharmaTvSlides: function (callback) {

            $http.post(adminurl + 'dharmahome/getDharmaTvHome').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllDharmaTvSlider: function (callback) {
            $http.post(adminurl + 'dharmaslider/getAllDharmaTvSlider').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllDharmatv10: function (callback) {
            $http.post(adminurl + 'Dharmatv/getAll').then(function (data) {
              data=data.data;
                _.each(data.data, function (n) {
                    n.movie._id = _.kebabCase(n.movie.name) + "_" + n.movie.year;
                });
                callback(data);
            });
        },
        getAllTags: function (callback) {
            $http.post(adminurl + 'tag/getAll').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getOneNews: function (id, callback) {
            $http.post(adminurl + 'News/getOneNews', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getMonthYear: function (callback) {
            $http.post(adminurl + 'news/getMonthYear').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getOneRelated: function (id, callback) {
            $http.post(adminurl + 'news/getOneArticle', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllPosts: function (filterdata, callback) {
            $http.post(adminurl + 'dharmainsta/getAllInstaPosts', filterdata).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllTwitter: function (callback) {
            $http.post(adminurl + 'dharma140/getAll').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        dharmaYouAll: function (callback) {
            $http.post(adminurl + 'dharmanyou/getAll').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getOneHashTag: function (id, callback) {
            $http.post(adminurl + 'dharma140/getHash', {
                _id: id
            }).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        youSave: function (formData, callback) {
            $http.post(adminurl + 'dharmanyou/save', formData).then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        getAllConfig: function (callback) {
            $http.post(adminurl + 'NewConfig/getAll').then(function(data) {
        data = data.data;
        callback(data);
      });
        },
        changeTimerRapid: function () {
            var rapidTimer = $.jStorage.get("rapidTimer");
            var returnVal;
            if (rapidTimer && rapidTimer != 1) {
                returnVal = rapidTimer - 1;
                $.jStorage.set("rapidTimer", returnVal);
            } else if (rapidTimer != 1) {
                $.jStorage.set("rapidTimer", 90);
                returnVal = 90;
            } else {
                $.jStorage.set("rapidTimer", null);
                returnVal = 0;
            }
            return returnVal;
        }

    };
});
