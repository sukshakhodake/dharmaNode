var initMap = {};
var calculateAndDisplayRoute = {};
var abc = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'wu.masonry', 'ksSwiper', 'imageupload', 'ui.select', 'infinite-scroll'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $filter, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.openModal = function() {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/subscribe.html',
            controller: 'HomeCtrl',
            size: 'lg',
            windowClass: 'subscribe-modal',
        });
    };

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.removeLoaderOn(5);

    $scope.mySlides = [
        'img/banners/slide1.jpg',
        'img/banners/slide1.jpg'
    ];
    $scope.mySlide = [
        'img/banners/mob-slider.jpg',
        'img/banners/mob-slider.jpg'
    ];
    NavigationService.getAllUpcomingMovies(function(data) {
        $scope.AllUpcomingMovies = _.orderBy(data.data, function(n) {
            var date2 = moment("1/" + n.month + "/" + n.year);
            return (date2.unix());
        });
        // console.log('AllUpcomingMovies', $scope.AllUpcomingMovies);
        TemplateService.removeLoader();
    });
    NavigationService.getAllRecentMovies(function(data) {
        $scope.AllRecentMovies = data.data;
        // console.log('AllRecentMovies', $scope.AllRecentMovies);
        TemplateService.removeLoader();
    });
    NavigationService.getAllSlides(function(data) {
        $scope.getAllSlides = data.data;
        // console.log('getAllSlides', $scope.getAllSlides);
        TemplateService.removeLoader();
    });
    NavigationService.getDharmaTvSlides(function(data) {
        $scope.getDharmaTvSlides = data.data[0];
        // console.log('getDharmaTvSlides', $scope.getDharmaTvSlides);
        TemplateService.removeLoader();
    });
    NavigationService.getAllUpcomingMoviesHome(function(data) {
        $scope.getAllUpcomingMovies = data.data;
        $scope.getAllUpcomingMovies = $filter('limitTo')($scope.getAllUpcomingMovies, 20);
        console.log('getAllUpcomingMovies', $scope.getAllUpcomingMovies);
        TemplateService.removeLoader();
    });



    $scope.movie = [{
        img: "img/movie/m1.jpg",
        name: "Ae Dil hai mushkil"
    }, {
        img: "img/movie/m2.jpg",
        name: "BAAR BAAR DEKHO"
    }, {
        img: "img/movie/m3.jpg",
        name: "BADRINATH KI DULHANIYA"
    }, {
        img: "img/movie/m4.jpg",
        name: "RAM LAKHAN"
    }, {
        img: "img/movie/m5.jpg",
        name: "ok jaanu"
    }];
    $scope.video = [{
        img: "img/video/v1.jpg",
        name: "Director S.S. Rajamouli tells us why Katappa killed Bahubali"

    }, {
        img: "img/video/v2.jpg",
        name: "Kapoor & Sons | The Funny One: Fawad Khan"

    }, {
        img: "img/video/v3.jpg",
        name: "Arjun fights with his Bai? | Movie Review | Kapoor & Sons | Sidharth..."

    }, {
        img: "img/video/v4.jpg",
        name: "Kapoor & Sons | Rahul Meets Tia | Dialogue Promo | Fawad Khan..."

    }, {
        img: "img/video/v1.jpg",
        name: "Director S.S. Rajamouli tells us why Katappa killed Bahubali"

    }, {
        img: "img/video/v2.jpg",
        name: "Kapoor & Sons | The Funny One: Fawad Khan"

    }, {
        img: "img/video/v3.jpg",
        name: "Arjun fights with his Bai? | Movie Review | Kapoor & Sons | Sidharth..."

    }, {
        img: "img/video/v4.jpg",
        name: "Kapoor & Sons | Rahul Meets Tia | Dialogue Promo | Fawad Khan..."

    }];
    $scope.news = [{
        img: "img/news/n1.jpg",
        name: "Kapoor & Sons out now!",
        date: "28 Mar 2016",
        desc: "The story that will tug at your heartstrings, tickle your funny bone and leave you wanting to love your family evermore."

    }, {
        img: "img/news/n2.jpg",
        name: "Bahubali bags The Best Film Of 2015 National Award",
        date: "28 Mar 2016",
        desc: "Baahubali wins National Award for the best film in 2015! Congratulations to the team. We are proud partners! "

    }, {
        img: "img/news/n3.jpg",
        name: "Baahubali added to the Top 10 World TV premiere list!",
        date: "16 Nov 2015",
        desc: "Baahubali storms television ratings as TAM reports add it to the Top 10 World TV premiere list! Huge congratulations to the team."

    }, {
        img: "img/news/n4.jpg",
        name: "Shaandaar Out In Cinemas",
        date: "21 Oct 2015",
        desc: "Shaandaar starring Shahid Kapoor and Alia Bhatt hits the screens today. The movie is directed by Vikas Bahl and co produced by Fox Star Studios and Phantom films. "

    }, {
        img: "img/news/n5.jpg",
        name: "Shaandaar's title track out now!",
        date: "16 Sep 2015",
        desc: "Shaandaar's title track 'Shaam Shaandaar' sung by Amit Trivedi was released today. The song is a grand celebration featuring Shahid Kapoor and Alia Bhatt."

    }, {
        img: "img/news/n6.jpg",
        name: "35 Years Of Dharma",
        date: "08 Oct 2015",
        desc: "Heart-warming storylines, Stellar megastar casts, Record box-office collections...A legacy that paved way into the hearts of the audience completes celebrates 35 glorious years today."

    }];
    NavigationService.getNews(function(data) {
        $scope.News = data.data;
        console.log($scope.News);
        $scope.limitedNews = $filter('limitTo')($scope.News, 10);
        console.log($scope.limitedNews, "$scope.limitedNews");
        _.each($scope.limitedNews, function(value) {
            value.date = new Date(value.date);
        });
        // console.log('News', $scope.News);
    });

    $scope.subscribe = {};
    $scope.subscribe.email = "";
    $scope.checkEmail = false;
    $scope.subscribeEmail = false;
    $scope.subscribe = function(email, form) {
        if (email && email !== '' && form.$valid) {
            NavigationService.subScribe(email, function(data) {
                if (data.data.message == 'already exist') {
                    // if ($scope.subscribe.email) {
                    $scope.checkEmail = true;
                    // $scope.subscribeEmail = false;
                    $timeout(function() {
                        $scope.checkEmail = false;
                    }, 2000);

                    // }
                } else {
                    $scope.openModal();
                    $scope.checkEmail = false;
                    // $scope.subscribeEmail = true;
                    // $timeout(function() {
                    //     $scope.subscribeEmail = false;
                    // }, 2000);


                }
                $scope.subscribe.email = "";
            });
        }
    };


    $scope.tabs = 'upcoming';
    $scope.classp = 'active-tab';
    $scope.classv = '';


    $scope.tabchanges = function(tabs, a) {
        //        console.log(tab);
        $scope.tabs = tabs;
        if (a == 1) {

            $scope.classp = "active-tab";
            $scope.classv = '';

        } else {

            $scope.classp = '';
            $scope.classv = "active-tab";
        }
    };

})

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService;
    NavigationService.getAllMovieName(function(data) {
        $scope.allMovieName = data.data;
        // console.log('*********************', $scope.allMovieName);
    });
    NavigationService.getAllTwitter(function(data) {
        $scope.getAllTwitterTag = data.data;
        $scope.getFirstId = data.data[0]._id;
        // console.log($scope.getFirstId);
        // $scope.selectOneHashTag($scope.getFirstId);
        // console.log($scope.getAllTwitterTag);
    })
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.showSub = function(menu) {
        console.log("show sub");
        menu.show = !menu.show;
        // $scope.navigation = NavigationService.getnav();
    }
    $scope.headerSearch = false;
    $scope.crossdisplay = true;
    $scope.getHeaderSearch = function() {
        $scope.headerSearch = true;
    }
    $scope.closeCross = function() {
        $scope.headerSearch = false;
    }
    $scope.DoSearch = function(search, id) {
        $state.go('movie-inside', {
            id: id
        });
    };


})

.controller('OverviewCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("overview");
    $scope.menutitle = NavigationService.makeactive("Overview");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})
.controller('PrivacyPolicyCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("privacy-policy");
    $scope.menutitle = NavigationService.makeactive("Privacy Policy");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})

.controller('AwardsCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("awards");
    $scope.menutitle = NavigationService.makeactive("Awards");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})

.controller('DharmaJourneyCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("dharma-journey");
    $scope.menutitle = NavigationService.makeactive("Dharma Journey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    NavigationService.getJourney(function(data) {
        $scope.journeys = data;
    });

})

.controller('MapCtrl', function($scope, TemplateService, NavigationService, $timeout) {

        var directionsService = {};
        var directionsDisplay = {};

        initMap = function() {

            var mapTheme = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#f5b690"
                }, {
                    "visibility": "on"
                }]
            }];


            var customMapType = new google.maps.StyledMapType(mapTheme, {
                name: 'Dharma Style'
            });
            var customMapTypeId = 'custom_style';

            var location = {
                lat: 19.133687,
                lng: 72.836493
            };

            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: location,
                scrollwheel: false,
            });

            directionsDisplay.setMap(map);

            addMarker(location, map);
        };

        var icon = {
            url: "img/dharmamapmarker.png",
            fillOpacity: 1,
            scaledSize: {
                width: 75,
                height: 60
            },
        };

        function addMarker(location, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            var marker = new google.maps.Marker({
                position: location,
                icon: icon,
                map: map
            });
        }

        /// MAX til here
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAc75yahObocBDF_deZ7T6_rUkS8LS4t00&callback=initMap", function(data, textStatus, jqxhr) {
            console.log("Load was performed.");
        });


    })
    .controller('TvInsideCtrl', function($scope, TemplateService, NavigationService, $stateParams, $state) {
        $scope.template = TemplateService.changecontent("tv-inside");
        $scope.menutitle = NavigationService.makeactive("TV Inside");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        //
        // NavigationService.getDharmatvOne($stateParams.id, function(data) {
        //     console.log('getDharmatvOne', data);
        //     $scope.allvideos = data.data;
        //     console.log("$scope.allvideos", $scope.allvideos.videos);
        // });

        // $scope.goMovie = false;
        $scope.getDharmaTV = function() {
            NavigationService.getAllDharmatv10(function(data) {
                var data2 = _.filter(data.data, function(video) {
                    if (video.movie && video.movie._id) {
                        return video.movie._id == $stateParams.id;
                    }
                });
                // console.log(data2);
                $scope.allvideos = data2;
                TemplateService.removeLoader();
            });
        }
        if ($stateParams.id) {
            $scope.getDharmaTV();

        }
        // $scope.allMovieName=[];

        $scope.seeMore = false;
        $scope.seeLess = false;
        var movieNameArray = [];
        $scope.seeLessMovieName = function() {
            NavigationService.getAllMovieName(function(data) {
                $scope.allMovieName = data.data;
                movieNameArray = _.cloneDeep($scope.allMovieName);
                // $scope.allMovieName = _.chunk($scope.allMovieName,10);
                $scope.allMovieName = _.slice($scope.allMovieName, [0], [10]);
                $scope.seeMore = true;
                if ($stateParams.id) {
                    $scope.currentMovie = _.find($scope.allMovieName, function(key) {
                        // $scope.goMovie=false;
                        return key._id == $stateParams.id;
                    }).name;
                }

                // console.log($scope.allMovieName);
                TemplateService.removeLoader();
                // $scope.MovieGal10 = _.chunk($scope.MovieGal, 4);
                // console.log('chunk',$scope.MovieGal10);
            });
        };
        $scope.seeLessMovieName();
        $scope.seeMoreMovieName = function() {
            $scope.seeMore = false;
            $scope.seeLess = true;
            // $scope.allMovieName = {}
            $scope.allMovieName = movieNameArray;
            // console.log('dfgyhujkdrftgh', $scope.allMovieName);
        }

        NavigationService.getAllTags(function(data) {
            $scope.getAllTags = data.data;
            TemplateService.removeLoader();
        });

        $scope.goToMovie = function(id, name) {
            // $scope.goMovie = true;
            // $scope.currentMovie = name;
            $state.go('tv-inside', {
                id: id
            });
            console.log(id, name);
        };
        $scope.searchdata = {};
        $scope.searchdata.search = "";
        $scope.nodata = false;
        $scope.getsearch = false;
        // $scope.searchdata.search = [];
        if ($stateParams.search) {
            $scope.searchdata.search = $stateParams.search;
        }
        $scope.viewSearch = function() {
            $scope.searchdata.search = "";
            // $scope.getsearch = false;
        };


        $scope.allvideos = [];
        $scope.currentMovie = '';

        // $scope.goToMovie($stateParams.id,$scope.currentMovie);

    })
    .controller('MovieInsideCtrl', function($scope, TemplateService, NavigationService, $uibModal, $stateParams, $filter, $window, $timeout, $state) {
        $scope.template = TemplateService.changecontent("movie-inside");
        $scope.menutitle = NavigationService.makeactive("Movie Inside");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);

        $scope.animationsEnabled = true;
        $scope.viewCastText = "VIEW";

        $scope.getAllvideo = false;
        $scope.isSubCast = false;
        $scope.myUrl = '';
        NavigationService.newGetOneMovie($stateParams.id, function(data) {

            $scope.myUrl = window.location.href;
            // console.log($scope.myUrl);
            $scope.myid = $stateParams.id;
            $scope.moviefindOne = data.data.movie;
            $scope.moviefindOne.backgroundImage = $filter('uploadpath')($scope.moviefindOne.backgroundImage);
            $scope.moviefindOne.cutImage2 = $filter('uploadpath')($scope.moviefindOne.cutImage2);
            $scope.moviefindOne.cutImage = $filter('uploadpath')($scope.moviefindOne.cutImage);
            console.log($scope.moviefindOne.cutImage2);
            console.log('moviefindOne', $scope.moviefindOne);
            TemplateService.removeLoader();
            $scope.getOneMovie = data.data;
            // TemplateService.removeLoader();
            $scope.movieCast = data.data.movie.cast;
            _.each($scope.movieCast, function(n) {
                if (n.type == 'Sub-cast') {
                    $scope.isSubCast = true;
                }
                // TemplateService.removeLoader();
                $scope.movieCrew = data.data.crew;
            });
            // TemplateService.removeLoader();
            $scope.MovieGal = data.data.gallery;
            // TemplateService.removeLoader();
            $scope.movieBehindTheScenes = data.data.behindTheScenes;
            // TemplateService.removeLoader();
            $scope.movieVideo = data.data.videos;
            console.log('getMovieVideo', $scope.movieVideo);
            $scope.movieVideo10 = _.chunk($scope.movieVideo, 6);
            // TemplateService.removeLoader();
            $scope.movieWallpaper = data.data.wallpaper;
            // TemplateService.removeLoader();

            // TemplateService.removeLoader();
            if (_.isArray(data.data.award)) {
                $scope.MovieAwards = data.data.award;
            }
            // TemplateService.removeLoader();


            $scope.movieNews = data.data.news;
            _.each($scope.movieNews, function(n) {
                n.date = new Date(n.date);
                console.log($scope.movieNews, '$scope.movieNews');
            });
            // TemplateService.removeLoader();
        })

        $scope.subCast = false;
        $scope.viewAllCast = function() {
            $scope.subCast = !$scope.subCast;
            if ($scope.subCast) {
                $scope.viewCastText = "HIDE";
            } else {
                $scope.viewCastText = "VIEW";
            }
        }
        $scope.tabing = [{
                name: "Synopsis",
                class: "classa",
                tab: "synopsis",
                id: "1",
                ngclass: "movieSynopsisAndNote.synopsis ==''",
                ngdisabled: "movieSynopsisAndNote.synopsis ==''",
                index: 0
            }, {
                name: "CAST & CREDITS",
                class: "classb",
                tab: "cast",
                id: "2",
                ngclass: "movieCast.length<=0",
                ngdisabled: "movieCast.length<=0",
                index: 1
            }, {
                name: "News",
                class: "classc",
                tab: "news",
                id: "3",
                ngclass: "movieNews.length<=0",
                ngdisabled: "movieNews.length<=0",
                index: 2,
                nghide: "movieNews.length<=0"
            }, {
                name: "Gallery",
                class: "classd",
                tab: "gallery",
                id: "4",
                ngclass: "MovieGal.length<=0",
                ngdisabled: "MovieGal.length<=0",
                index: 3
            }, {
                name: "behind the scenes",
                class: "classe",
                tab: "scene",
                id: "5",
                ngclass: "movieBehindTheScenes.length<=0",
                ngdisabled: "movieBehindTheScenes.length<=0",
                index: 4
            }, {
                name: "VIDEOS",
                class: "classf",
                tab: "video",
                id: "6",
                ngclass: "movieVideo10.length<=0",
                ngdisabled: "movieVideo10.length<=0",
                index: 5
            }, {
                name: "WALLPAPERS",
                class: "classg",
                tab: "wallpapper",
                id: "7",
                ngclass: "movieWallpaper.length<=0",
                ngdisabled: "movieWallpaper.length<=0",
                index: 6
            }, {
                name: "AWARDS",
                class: "classh",
                tab: "awards",
                id: "8",
                ngclass: "MovieAwards.length  == 0",
                ngdisabled: "MovieAwards.length  == 0",
                index: 7,
                nghide: "MovieAwards.length  == 0"
            }]
            // }, 1000);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });



        // $(document).ready(function() {
        //     console.log("tab");
        //     if ($scope.tabing.class == 'classa') {
        //         $scope.movieSynopsisAndNote.synopsis.length <= 0
        //     } else if ($scope.tabing.class == 'classb') {
        //         $scope.movieCast.length <= 0
        //     } else if ($scope.tabing.class == 'classc') {
        //         $scope.movieNews.length <= 0;
        //     }
        // });

        $scope.open = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/modal.html',
                controller: 'MovieInsideCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

        };

        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };


        $scope.accordian = [];
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });


        $scope.tabs = 'desktop';
        $scope.classp = 'active-list';
        $scope.classv = '';


        $scope.tabchanges = function(tabs, a) {
            //        console.log(tab);
            $scope.tabs = tabs;
            if (a == 2) {

                $scope.classp = "active-list";
                $scope.classv = '';

            } else {

                $scope.classp = '';
                $scope.classv = "active-list";
            }
        };


        $scope.tab = 'synopsis';
        $scope.classa = 'active-list';
        $scope.classb = '';
        $scope.classc = '';
        $scope.classd = '';
        $scope.classe = '';
        $scope.classf = '';
        $scope.classg = '';
        $scope.classh = '';



        $scope.tabchange = function(tab, a, id) {

            console.log(tab);
            console.log(a);
            console.log($scope.tabing);
            $scope.tab = tab;
            if (a == 1) {


                $scope.classa = "active-list";
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 2) {

                $scope.classa = '';
                $scope.classb = "active-list";
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 3) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "active-list";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 4) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = 'active-list';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 5) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = 'active-list';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 6) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = 'active-list';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 7) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = 'active-list';
                $scope.classh = '';
            } else if (a == 8) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = 'active-list';
            }
        };
        $scope.tabchangeMob = function(selected, id) {
            console.log("tabchangeMob", selected, id);
            $scope.tab = selected;
            $scope.tabid = id;
            _.each($scope.tabing, function(key) {
                key.activemob = false;
            });
            $scope.tabing[id].activemob = true;
        };
        $scope.tabchangeMob($scope.tabing[0].tab, 0);
        $scope.tabchangeByURl = function(text) {
            var id = _.find($scope.tabing, function(key) {
                return key.tab == text;
            }).id;
            var tabindex = _.find($scope.tabing, function(key) {
                return key.tab == text;
            }).index;
            $scope.tabchange(text, id);
            $scope.tabchangeMob(text, tabindex);

        }
        if ($stateParams.tab) {
            $scope.tabchangeByURl($stateParams.tab);

        }
        $scope.cast = [{
            img: "img/cast/c1.png",
            name: "Ranbir Kapoor",
            nick: "BUNNY"
        }, {
            img: "img/cast/c2.png",
            name: "Deepika Padukone",
            nick: "NAINA"
        }, {
            img: "img/cast/c3.png",
            name: "Kalki Koechlin",
            nick: "ADITI"
        }, {
            img: "img/cast/c4.png",
            name: "Aditya Roy Kapur",
            nick: "AVI"
        }]
        $scope.gallery = [
            "img/gallery/g18.jpg",
            "img/gallery/g19.jpg",
            "img/gallery/g20.jpg",
            "img/gallery/g21.jpg",
            "img/gallery/g22.jpg",
            "img/gallery/g23.jpg",
            "img/gallery/g24.jpg",
            "img/gallery/g25.jpg",
            "img/gallery/g20.jpg"
        ]
        $scope.desktop = [
            "img/wallpapper/d1.jpg",
            "img/wallpapper/d2.jpg",
            "img/wallpapper/d3.jpg",
            "img/wallpapper/d4.jpg",
            "img/wallpapper/d5.jpg",
            "img/wallpapper/d6.jpg"

        ]
        $scope.mobile = [
            "img/wallpapper/m1.jpg",
            "img/wallpapper/m2.jpg",
            "img/wallpapper/m3.jpg",
            "img/wallpapper/m4.jpg",
            "img/wallpapper/m1.jpg",
            "img/wallpapper/m2.jpg",
            "img/wallpapper/m3.jpg",
            "img/wallpapper/m4.jpg"

        ]
        $scope.allvideos = [{
            img: "img/video/v5.jpg",
            name: "KABIRA SONG"
        }, {
            img: "img/video/v6.jpg",
            name: "BALAM PICHKARI SONG"
        }, {
            img: "img/video/v7.jpg",
            name: "GHAGRA SONG"
        }, {
            img: "img/video/v8.jpg",
            name: "BADTAMEEZ DIL SONG"
        }, {
            img: "img/video/v9.jpg",
            name: "ILAHI SONG"
        }, {
            img: "img/video/v10.jpg",
            name: "DILLIWAALI GIRLFRIEND SONG"
        }]
        $scope.news = [{
            img: "img/dharma-world/d5.jpg",
            name: "Deepika scares me as an actor: Ranbir Kapoor",
            date: "21 Mar 2016",
            desc: "New Delhi: Films as varied as Raajneeti, Rockstar, Yeh Jawaani Hai Deewani and Barfi! have been a window to his versatility. But Ranbir Kapoor says his Tamasha ..."

        }, {
            img: "img/dharma-world/d6.jpg",
            name: "Varun Dhawan shares picture of Dharma Productions new office",
            date: "21 Mar 2016",
            desc: "After four years, Varun Dhawan is back at Dharma’s office. Though everything remains the same, the office is now a new place for all those who work there. "

        }, {
            img: "img/dharma-world/d7.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "21 Mar 2016",
            desc: "SS Rajamouli's Bahubali: The Beginning (also spelt as Baahubali), starring Prabhas and Rana Daggubati, has won the Best Feature Film at the 63rd National Film Award (NFA). "

        }, {
            img: "img/dharma-world/d8.jpg",
            name: "Dharma production hints at first ever love franchise",
            date: "21 Mar 2016",
            desc: "Best known for producing films that grab the beauty of exotic locales across the globe and intricately weaving romance, Dharma Productions has hinted at a sequel to Bollywood’s first ever love franchise."

        }, {
            img: "img/dharma-world/d9.jpg",
            name: "Ranbir Kapoor to promote ‘Yeh Jawaani Hai Deewani’ in Russia",
            date: "21 Mar 2016",
            desc: "Mumbai: His grandfather, late cinema legend Raj Kapoor, continues to be a rage in Russia and now actor Ranbir Kapoor is set to promote his latest release ‘Yeh Jawaani Hai..."

        }, {
            img: "img/dharma-world/d10.jpg",
            name: "Arjun and SIddharth’s Dharma Office Darshan",
            date: "21 Mar 2016",
            desc: "Bollywood heartthrobs Arjun Kapoor and Sidharth Malhotra are spilling fun all over the new office of Karan Johar's Dharma Productions. "

        }, {
            img: "img/dharma-world/d5.jpg",
            name: "Deepika scares me as an actor: Ranbir Kapoor",
            date: "21 Mar 2016",
            desc: "New Delhi: Films as varied as Raajneeti, Rockstar, Yeh Jawaani Hai Deewani and Barfi! have been a window to his versatility. But Ranbir Kapoor says his Tamasha ..."

        }, {
            img: "img/dharma-world/d6.jpg",
            name: "Varun Dhawan shares picture of Dharma Productions new office",
            date: "21 Mar 2016",
            desc: "After four years, Varun Dhawan is back at Dharma’s office. Though everything remains the same, the office is now a new place for all those who work there. "

        }, {
            img: "img/dharma-world/d7.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "21 Mar 2016",
            desc: "SS Rajamouli's Bahubali: The Beginning (also spelt as Baahubali), starring Prabhas and Rana Daggubati, has won the Best Feature Film at the 63rd National Film Award (NFA). "

        }]
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 0);
        });

    })
    .controller('ContactUsCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("contact-us");
        $scope.menutitle = NavigationService.makeactive("Contact Us");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('DharmaWorldCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("dharma-world");
        $scope.menutitle = NavigationService.makeactive("Dharma World");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getAllTwitter(function(data) {
            $scope.getAllTwitterTag = data.data;
            $scope.getFirstId = data.data[0]._id;
            console.log($scope.getFirstId);
            // $scope.selectOneHashTag($scope.getFirstId);
            console.log($scope.getAllTwitterTag);
        })
    })
    .controller('NewsEventsCtrl', function($scope, TemplateService, NavigationService, $state, $filter) {
        $scope.template = TemplateService.changecontent("news-events");
        $scope.menutitle = NavigationService.makeactive("News Events");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.news10 = [];
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.filter.pagesize = 10;
        $scope.filter.search = '';
        $scope.filter.year = 0;
        $scope.filter.month = 0;
        $scope.noviewmore = false;
        $scope.noNewsFound = false;
        $scope.crossdisplay = false;
        $scope.forViewMore = false;
        // $scope.noNewsFound = false;
        var lastpage = 1;
        $scope.pages = [1];
        $scope.movie = {};

        // $scope.getNews = function(input) {
        //
        //     $scope.filter.pagenumber++;
        //     NavigationService.getNewsHome(input, function(data) {
        //         if (data.value) {
        //             _.each(data.data.data, function(n) {
        //                 n.date = new Date(n.date);
        //                 $scope.news10.push(n);
        //             });
        //
        //             $scope.lastpage = data.data.totalpages;
        //             if ($scope.lastpage <= $scope.filter.pagenumber) {
        //                 $scope.noviewmore = false;
        //             }
        //         }
        //         TemplateService.removeLoader();
        //     });
        // };

        $scope.goYear = false;
        $scope.goMonth = false;
        var AllNews = [];
        var i = 0;

        function callMe() {
            // $scope.news10 = [];
            NavigationService.getNewsHomeSearch($scope.filter, ++i, function(data, newI) {
                if (newI == i) {
                    $scope.myTotal = data.data.total;
                    if ($scope.filter.search.length == 0) {
                        $scope.crossdisplay = false;
                    }
                    lastpage = data.data.totalpages;
                    if ($scope.filter.pagesize >= $scope.myTotal) {
                        $scope.forViewMore = true;
                    } else {
                        $scope.forViewMore = false;
                    }
                    $scope.myTotal = data.data.total;
                    console.log(data.data.total);
                    if (data.value) {
                        if (data.data.data.length > 0) {
                            $scope.noNewsFound = false;
                            _.each(data.data.data, function(n) {
                                n.date = new Date(n.date);
                                $scope.news10.push(n);
                                AllNews = $scope.news10;

                            });
                        } else {
                            $scope.noNewsFound = true;
                        }

                    }
                    TemplateService.removeLoader();

                }

            });
        }
        // $scope.searchdata='';
        callMe();
        $scope.doSearch = function() {
            $scope.crossdisplay = true;
            $scope.news10 = [];
            callMe();

        };

        $scope.closeCross = function() {
            // $state.reload();
            $scope.news10 = [];
            $scope.crossdisplay = false;
            $scope.filter.search = '';
            // $scope.movie.selected = "";
            //
            callMe();
        }

        // $scope.getNews10 = function(name) {
        //     console.log(name);
        //     $scope.filter.search = name;
        //     callMe();
        // };
        // $scope.getNews10 = function(name) {
        //     console.log(name);
        //     $scope.crossdisplay = true;
        //     $scope.filter.search = name;
        //
        //     callMe();
        // };
        $scope.getNewsYear = function(year) {
            $scope.getYear = year;
            $scope.goYear = true;
            console.log(year);
            $scope.filter.year = year;
            // callMe();
        };
        $scope.getNewsMonth = function(month) {
            $scope.getMonth = month;
            $scope.goMonth = true;
            console.log(month);
            $scope.filter.month = month;
            // callMe();
        };

        // $scope.goSearch = function(month, year) {
        //     console.log(month);
        //     $scope.filter.month = month;
        //     $scope.filter.year = year;
        //     $scope.getNews10 = [];
        //     callMe();
        // };


        // $scope.ViewMore = function(myTotal) {
        //     console.log(myTotal);
        //     if ($scope.filter.pagesize < myTotal) {
        //       $scope.forViewMore = true;
        //         console.log('in iffffffffff');
        //         // $scope.noviewmore = true;
        //         $scope.filter.pagesize = myTotal;
        //         callMe();
        //         console.log($scope.filter.pagesize);
        //     } else {
        //       $scope.forViewMore = false;
        //         $scope.noviewmore = false;
        //     }
        //
        //
        // };
        // ---------------------view more news----------------------------------------
        // $scope.ViewMore = function(myTotal) {
        //     console.log(myTotal);
        //     if ($scope.filter.pagesize < myTotal) {
        //         $scope.forViewMore = true;
        //         $scope.filter.pagesize = myTotal;
        //         callMe();
        //         console.log($scope.filter.pagesize);
        //     } else {
        //         $scope.forViewMore = false;
        //     }
        //
        //
        // };
        // ---------------end of view more news-----------------------------------------------

        $scope.loadMore = function() {
            if (lastpage > $scope.filter.pagenumber) {
                // console.log('lastpageeee: ', lastpage)
                ++$scope.filter.pagenumber;
                $scope.pages.push($scope.filter.pagenumber);
                console.log('pages:', $scope.pages);
                callMe();
            }
        };




        NavigationService.getAllMovieName(function(data) {
            $scope.allMovieName = data.data;
            console.log('edrtghjfghjk', $scope.allMovieName);
        });

        NavigationService.getMonthYear(function(data) {
            $scope.monthYear = data.data;
            $scope.month = data.data.month;


            $scope.month = $scope.month.sort();
            $scope.month = $scope.month.sort(function(a, b) {
                return b - a
            });
            $scope.month = $scope.month.reverse();
            // $scope.month = $filter('getMonthAlpha')($scope.month);
            console.log('$scope.month', $scope.month);
        })

        // NavigationService.findAllSearchParam(function(data) {
        //     $scope.findAllSearchParam = _.uniq(data.data);
        //
        //     console.log('findAllSearchParam', $scope.findAllSearchParam);
        // });


        // $scope.getNews($scope.filter);
        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];

        $scope.news = [{
            img: "img/news/n1.jpg",
            name: "Kapoor & Sons out now!",
            date: "28 Mar 2016",
            desc: "The story that will tug at your heartstrings, tickle your funny bone and leave you wanting to love your family evermore."

        }, {
            img: "img/news/n2.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "28 Mar 2016",
            desc: "Baahubali wins National Award for the best film in 2015! Congratulations to the team. We are proud partners! "

        }, {
            img: "img/news/n3.jpg",
            name: "Baahubali added to the Top 10 World TV premiere list!",
            date: "16 Nov 2015",
            desc: "Baahubali storms television ratings as TAM reports add it to the Top 10 World TV premiere list! Huge congratulations to the team."

        }, {
            img: "img/news/n4.jpg",
            name: "Shaandaar Out In Cinemas",
            date: "21 Oct 2015",
            desc: "Shaandaar starring Shahid Kapoor and Alia Bhatt hits the screens today. The movie is directed by Vikas Bahl and co produced by Fox Star Studios and Phantom films. "

        }, {
            img: "img/news/n5.jpg",
            name: "Shaandaar's title track out now!",
            date: "16 Sep 2015",
            desc: "Shaandaar's title track 'Shaam Shaandaar' sung by Amit Trivedi was released today. The song is a grand celebration featuring Shahid Kapoor and Alia Bhatt."

        }, {
            img: "img/news/n6.jpg",
            name: "35 Years Of Dharma",
            date: "08 Oct 2015",
            desc: "Heart-warming storylines, Stellar megastar casts, Record box-office collections...A legacy that paved way into the hearts of the audience completes celebrates 35 glorious years today."

        }];
    })
    .controller('NewsDetailCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter) {
        $scope.template = TemplateService.changecontent("news-detail");
        $scope.menutitle = NavigationService.makeactive("News Detail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);


        $scope.getSearchNews = false;

        function newsDetail() {
            NavigationService.getOneNews($stateParams.id, function(data) {
                $scope.getOneNews = data.data.data;
                console.log('getOneNews', $scope.getOneNews);
                $scope.getOneRelated = data.data.related;
                TemplateService.removeLoader();
            });
        };


        newsDetail();

        // NavigationService.getOneRelated($stateParams.id, function(data) {
        //     $scope.getOneRelated = data.data;
        //     console.log('getOneRelated11111111111112222222222222222', $scope.getOneRelated);
        //     TemplateService.removeLoader();
        // });


        // $scope.getNews($scope.filter);
        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];







        $scope.news10 = [];
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.filter.pagesize = 10;
        $scope.filter.search = '';
        $scope.filter.year = 0;
        $scope.filter.month = 0;
        $scope.forViewMore = false;
        var AllNews = [];
        $scope.goYear = false;
        $scope.goMonth = false;
        $scope.noNewsFound = false;
        $scope.crossdisplay = false;
        var lastpage = 1;
        $scope.pages = [1];

        // function callMe() {
        //     NavigationService.getNewsHomeSearch($scope.filter, function(data) {
        //         $scope.myTotal = data.data.total;
        //         console.log($scope.myTotal);
        //         if ($scope.filter.pagesize >= $scope.myTotal) {
        //             $scope.forViewMore = true;
        //         } else {
        //             $scope.forViewMore = false;
        //         }
        //
        //         console.log(data);
        //         console.log($scope.filter);
        //         if (data.value) {
        //
        //             console.log(data.data.data.length);
        //             if (data.data.data.length > 0) {
        //                 $scope.noNewsFound = false;
        //                 console.log('herefghfghgh');
        //                 _.each(data.data.data, function(n) {
        //                     n.date = new Date(n.date);
        //                     $scope.news10.push(n);
        //                     AllNews = $scope.news10;
        //                     console.log($scope.news10);
        //                 });
        //             } else {
        //                 $scope.news10 = [];
        //                 $scope.noNewsFound = true;
        //             }
        //
        //         }
        //         TemplateService.removeLoader();
        //     });
        // }

var i = 0;
        function callMe() {
            // $scope.news10 = [];
            NavigationService.getNewsHomeSearch($scope.filter, ++i, function(data, newI) {
                if (newI == i) {
                    $scope.myTotal = data.data.total;
                    if ($scope.filter.search.length == 0) {
                        $scope.crossdisplay = false;
                    }
                    lastpage = data.data.totalpages;
                    if ($scope.filter.pagesize >= $scope.myTotal) {
                        $scope.forViewMore = true;
                    } else {
                        $scope.forViewMore = false;
                    }
                    $scope.myTotal = data.data.total;
                    console.log(data.data.total);
                    if (data.value) {
                        if (data.data.data.length > 0) {
                            $scope.noNewsFound = false;
                            _.each(data.data.data, function(n) {
                                n.date = new Date(n.date);
                                $scope.news10.push(n);
                                // AllNews = $scope.news10;

                            });
                        } else {
                            $scope.noNewsFound = true;
                        }

                    }
                    TemplateService.removeLoader();

                }

            });
        }
        // callMe();
        // $scope.doSearch = function() {
        //     $scope.crossdisplay = true;
        //     $scope.news10 = [];
        //     callMe();
        //
        // };
        $scope.movie = {};
        // $scope.crossdisplay = false;
        $scope.closeCross = function() {
            // $state.reload();
            $scope.getSearchNews = false;
            $scope.noNewsFound = false;
            $scope.crossdisplay = false;
            $scope.filter.search = '';
            $scope.movie.selected = "";
            if ($scope.filter.month || $scope.filter.year) {
                console.log('gosearch');
                $scope.goSearch($scope.filter.month, $scope.filter.year);
            } else {
                console.log('newsdetail runn');
                newsDetail();
            }

        }

        // $scope.closeCross = function() {
        //     $scope.news10 = [];
        //     $scope.crossdisplay = false;
        //     $scope.filter.search = '';
        //
        //     callMe();
        // }
        $scope.getNews10 = function(name) {
            // $scope.crossdisplay = true;
            $scope.filter.search = name;
            console.log($scope.filter.search);
            callMe();
        };
        $scope.getNewsYear = function(year) {
            $scope.getYear = year;
            $scope.goYear = true;
            console.log(year);
            $scope.filter.year = year;
            // callMe();
        };
        $scope.getNewsMonth = function(month) {
            $scope.getMonth = month;
            $scope.goMonth = true;
            console.log(month);
            $scope.filter.month = month;
            // callMe();
        };

        $scope.goSearch = function(month, year) {
            $scope.getSearchNews = true;
            console.log(month);
            $scope.filter.month = month;
            $scope.filter.year = year;
            callMe();
        };
        $scope.loadMore = function() {
            if (lastpage > $scope.filter.pagenumber) {
                // console.log('lastpageeee: ', lastpage)
                ++$scope.filter.pagenumber;
                $scope.pages.push($scope.filter.pagenumber);
                console.log('pages:', $scope.pages);
                callMe();
            }
        };
        NavigationService.getAllMovieName(function(data) {
            $scope.allMovieName = data.data;
            console.log('edrtghjfghjk', $scope.allMovieName);
        });

        NavigationService.getMonthYear(function(data) {
                $scope.monthYear = data.data;
                $scope.month = data.data.month;
                $scope.month = $scope.month.sort();
                $scope.month = $scope.month.sort(function(a, b) {
                    return b - a
                });
                $scope.month = $scope.month.reverse();
                console.log('cjdbsfsdjfhjsdkhf', $scope.month);
                console.log('$scope.monthYear', $scope.monthYear);
            })
            // $scope.doSearch = function() {
            //   $scope.getSearchNews = true;
            //     // console.log($scope.searchdata.search);
            //     console.log(AllNews, "AllNews************");
            //     var data1 = $filter('filter')(AllNews, {
            //         text: $scope.filter.search
            //     });
            //
            //     var data3 = $filter('filter')(AllNews, {
            //         title: $scope.filter.search
            //     });
            //     var data = _.union(data1,data3);
            //     // data = _.orderBy(data,"movie.name");
            //     // console.log('allvideo', Allvideos);
            //     console.log(data);
            //     $scope.news10 = data;
            //     // TemplateService.getLoader();
            //     // groupIt(data);
            //
            // };
        // $scope.doSearch = function() {
        //     $scope.getSearchNews = true;
        //     $scope.crossdisplay = true;
        //     console.log(AllNews, "AllNews************");
        //     var data1 = $filter('filter')(AllNews, {
        //         text: $scope.filter.search
        //     });
        //
        //     var data3 = $filter('filter')(AllNews, {
        //         title: $scope.filter.search
        //     });
        //     var data = _.union(data1, data3);
        //     console.log(data);
        //     $scope.news10 = data;
        //     if ($scope.news10.length == 0) {
        //
        //         $scope.noNewsFound = true;
        //     } else {
        //         $scope.noNewsFound = false;
        //     }
        //     if ($scope.filter.search.length == 0) {
        //
        //         $scope.crossdisplay = false;
        //         $scope.getSearchNews = false;
        //         $scope.noNewsFound = false;
        //         newsDetail();
        //     }
        //
        // };

        $scope.doSearch = function() {

            if ($scope.filter.search.length == 0 && !$scope.filter.month && !$scope.filter.year) {

                  $scope.crossdisplay = false;
                  $scope.getSearchNews = false;
                  $scope.noNewsFound = false;
                  newsDetail();
              }else{
                $scope.getSearchNews = true;
                $scope.crossdisplay = true;
                $scope.news10 = [];
                callMe();
              }

        };
        $scope.ViewMore = function(myTotal) {
            console.log(myTotal);
            if ($scope.filter.pagesize < myTotal) {
                $scope.forViewMore = true;
                $scope.filter.pagesize = myTotal;
                callMe();
                console.log($scope.filter.pagesize);
            } else {
                $scope.forViewMore = false;
            }


        };

    })
    .controller('DharmaTvCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $state) {
        $scope.template = TemplateService.changecontent("dharma-tv");
        $scope.menutitle = NavigationService.makeactive("Dharma Tv");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.mySlides = [
            'img/video-play.jpg',
            'img/video-play.jpg'
        ];
        $scope.mysearch = {};
        $scope.viewAll = function() {
            $scope.AllDharmatv = array;
            console.log('view all', $scope.AllDharmatv);
        };

        NavigationService.getAllDharmaTvSlider(function(data) {
            $scope.getAllDharmaTvSlider = data.data;
            TemplateService.removeLoader();
        });
        $scope.viewSearch = function() {
            // $scope.searchdata.search = "";
            // $scope.callAll();
            if ($stateParams.search) {
                $state.go('dharma-tv');
            } else {
                $scope.searchdata.search = "";
                $scope.callAll();
            }
            // $scope.getsearch = false;
        };
        $scope.searchdata = {};
        $scope.nodata = false;
        $scope.getsearch = false;
        var array = [];
        var Allvideos = [];
        $scope.callAll = function() {
            NavigationService.getAllDharmatv10(function(data) {
                Allvideos = data.data;
                if ($stateParams.search || $stateParams.search === "") {
                    $scope.searchdata.search = $stateParams.search;
                    $scope.doSearch();
                } else {
                    groupIt(Allvideos);
                }

            });
        };
        $scope.callAll();
        // if($stateParams.search){
        //   $scope.searchdata.search=$stateParams.search;
        $scope.noMovieFound = false;
        $scope.doSearch = function() {
            console.log($scope.searchdata.search);
            console.log(Allvideos, "Movies");
            var data1 = $filter('filter')(Allvideos, {
                title: $scope.searchdata.search
            });
            var data2 = $filter('filter')(Allvideos, {
                movie: {
                    name: $scope.searchdata.search
                }
            });
            var data3 = $filter('filter')(Allvideos, {
                tag: $scope.searchdata.search
            });
            var data = _.union(data1, data2, data3);
            data = _.orderBy(data, "movie.name");
            console.log('allvideo', Allvideos);
            console.log(data);
            TemplateService.getLoader();
            groupIt(data);

        };
        // }


        function groupIt(alldata) {
            console.log(alldata);
            var videos = _.groupBy(alldata, "movie.name");
            delete videos.undefined;
            TemplateService.removeLoader();
            console.log(videos);
            if (Object.keys(videos).length == 0) {
                $scope.noMovieFound = true;
            } else {
                $scope.noMovieFound = false;
            }
            $scope.AllDharmatv = videos;
            console.log('****************************', $scope.AllDharmatv);
        }
        // console.log('heeeeeeeeeeeeeeeeeeeee', $scope.searchdata.search);
        // NavigationService.getAllDharmatvSearch({search:$stateParams.search}, function(data) {
        //     console.log("mydata", data);
        //     console.log('statepar', $scope.searchdata.search);
        //     $scope.getsearch = true;
        //     console.log($scope.searchdata);
        //     $scope.mysearch = data.data;
        //     console.log('mysearch', $scope.mysearch);
        //     if ($scope.mysearch == '') {
        //         console.log('here');
        //         $scope.nodata = true;
        //     }
        // });

        $scope.video = [{
            img: "img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "img/movie/m7.jpg",
            name: "Making of Bahubali - Bull Fight Sequence"

        }, {
            img: "img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."

        }, {
            img: "img/movie/m9.jpg",
            name: "Making Of Bahubali VFX Work On Bull Fight With Rana..."

        }, {
            img: "img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "img/movie/m7.jpg",
            name: "Making of Bahubali - Bull Fight Sequence"

        }, {
            img: "img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."

        }, {
            img: "img/movie/m9.jpg",
            name: "Making Of Bahubali VFX Work On Bull Fight With Rana..."


        }, {
            img: "img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."
        }];

    })
    .controller('DharmaInstaCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout) {
        $scope.template = TemplateService.changecontent("dharma-insta");
        $scope.menutitle = NavigationService.makeactive("Dharma Insta");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        $scope.postFilter = {};
        $scope.postFilter.pagenumber = 1;
        $scope.postFilter.pagesize = 18;

        NavigationService.getAllPosts($scope.postFilter, function(data) {
            $scope.myPosts = data.data.data;
            console.log($scope.myPosts);
            TemplateService.removeLoader();
        })

        NavigationService.getAllConfig(function(data) {
            $scope.getInstaConfig = data.data;
            console.log('$scope.getInstaConfig', $scope.getInstaConfig);
            TemplateService.removeLoader();
        })

        $scope.posts = [{
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }];
    })
    .controller('Dharma140Ctrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout) {
        $scope.template = TemplateService.changecontent("dharma140");
        $scope.menutitle = NavigationService.makeactive("Dharma@140");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        NavigationService.getAllTwitter(function(data) {
            $scope.getAllTwitterTag = data.data;
            console.log($scope.getAllTwitterTag);
            $scope.selectOneHashTag($stateParams.id);
            TemplateService.removeLoader();

        })
        $scope.isMatch = false;
        // $scope.getClass = "";
        $scope.selectOneHashTag = function(id) {
            console.log(id);
            _.each($scope.getAllTwitterTag, function(key) {
                if (key._id == id) {
                    key.isMatch = true;

                } else {
                    key.isMatch = false;

                }
            });
            console.log($scope.getAllTwitterTag);
            NavigationService.getOneHashTag(id, function(data) {
                $scope.getOneHashTag = data.data.statuses;
                _.each($scope.getOneHashTag, function(key) {
                    // console.log(key);
                    key.created_at = new Date(key.created_at);
                    // if(key._id==id){
                    //     $scope.isMatch=true;
                    // }else{
                    //     $scope.isMatch=false;
                    // }
                    //
                })
                console.log('rdftghjderfghnj', $scope.getOneHashTag);
                TemplateService.removeLoader();
            });

        };

        $scope.hashtags = [{
            tag: "lifeatdharma"
        }, {
            tag: "baarbaardekho"
        }, {
            tag: "ramlakhan"
        }, {
            tag: "shaandar"
        }, {
            tag: "brothers"
        }];

        $scope.tweets = [{
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }];
    })
    .controller('DharmaYouCtrl', function($scope, TemplateService, NavigationService, $uibModal) {
        $scope.template = TemplateService.changecontent("dharma-you");
        $scope.menutitle = NavigationService.makeactive("Dharma & You");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);

        NavigationService.dharmaYouAll(function(data) {
            $scope.dharmaPosts = data.data;
            console.log($scope.dharmaPosts);
            $scope.enableData = _.groupBy($scope.dharmaPosts, "status");
            console.log($scope.enableData.true);
            $scope.dharmaPosts = [];
            $scope.dharmaPosts = $scope.enableData.true;
            console.log('before chunk', $scope.dharmaPosts);
            $scope.dharmaPosts = _.chunk($scope.dharmaPosts, 2);
            console.log($scope.dharmaPosts, "Postsss");
            TemplateService.removeLoader();
        });

        $scope.posts = [{
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            quest: 'Why was Kal Ho Na Ho shot in New York and not London?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
        }, {
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            quest: 'Why was Kal Ho Na Ho shot in New York and not London?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
        }];
        $scope.openModal = function() {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/dharma-you.html',
                controller: 'DharmaYouCtrl',
                size: 'lg',
                windowClass: 'dharma-you-modal',
            });
        };

        $scope.submitForm = function(data) {
            console.log(data);
        };
        $scope.questionSubmit = false;
        $scope.formData = {};
        $scope.saveYou = function(formData) {
            NavigationService.youSave($scope.formData, function(data) {
                if (data.value == true) {
                    $scope.questionSubmit = true;
                }
            });
        }
    })
    .controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout, $state) {
        $scope.template = TemplateService.changecontent("movies");
        $scope.menutitle = NavigationService.makeactive("Movies");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        // $scope.upcomingrelease = [{
        //     img: "img/movie-banner-dam.png",
        //     date: "10 March 2017",
        //     director: "Shashank Khaitan",
        //     cast: "Alia Bhatt, Varun Dhawan"
        // }, {
        //     img: "img/movie-banner-dam.png",
        //     date: "10 March 2017",
        //     director: "Shashank Khaitan",
        //     cast: "Alia Bhatt, Varun Dhawan"
        // }]
        // NavigationService.getMovieDetails(function(data) {
        //   $scope.MovieDetails = data.data;
        //   console.log('MovieDetails', $scope.MovieDetails);
        //   console.log('$scope.MovieDetails',$scope.MovieDetails.upcoming);
        //   });


        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];

        $scope.video = [{
            img: "img/movie/m11.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "img/movie/m11.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "img/movie/m11.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "img/movie/m11.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "img/movie/m11.jpg",
            name: "ok jaanu"

        }, {
            img: "img/movie/m11.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "img/movie/m11.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "img/movie/m11.jpg",
            name: "BADRINATH KI DULHANIYA"

        }];
        $scope.video = _.chunk($scope.video, 4);
        for (var i = 0; i < $scope.video.length; i++) {
            $scope.video[i] = _.chunk($scope.video[i], 4);
        }
        var array = [];
        var allMovies = [];
        NavigationService.getMovieDetails(function(data) {
            populateData(data.data);
            allMovies = data.data;
            TemplateService.removeLoader();

        });

        function populateData(data) {
            $scope.MovieDetails = data;
            $scope.movieList = _.groupBy($scope.MovieDetails, "releaseType");
            $scope.movieList.PastViewAll = $scope.movieList.Past;
            console.log($scope.movieList.PastViewAll);
            console.log($scope.movieList.Past);
            $scope.movieList.Recent = _.chunk($scope.movieList.Recent, 4);
            // $scope.movieList.Recent = _.sort($scope.movieList.Recent, 4);
            console.log('  $scope.movieList.Recent', $scope.movieList.Recent);


            for (var i = 0; i < $scope.movieList.Recent.length; i++) {
                console.log("CHECKING");
                $scope.movieList.Recent[i] = _.chunk($scope.movieList.Recent[i], 4);
            }
            if ($scope.movieList.Past) {
                // $scope.movieList.PastViewAll = $scope.movieList.Past;
                $scope.movieList.PastMore = _.takeRight($scope.movieList.Past, $scope.movieList.Past.length - 10);
                $scope.movieList.PastMore = _.chunk($scope.movieList.PastMore, 5);
                $scope.movieList.Past = $scope.movieList.Past.splice(0, 10);
                console.log($scope.movieList.Past);
                $scope.movieList.Past = _.chunk($scope.movieList.Past, 5);
            }
            $scope.showRecent = false;
            $timeout(function() {
                $scope.showRecent = true;
            }, 100);
        }
        $scope.searchdata = {};
        $scope.searchdata.search = $stateParams.search;

        // var searchdatasend={
        //   search:$scope.searchdata.search
        // }
        $scope.viewAll = false;

        $scope.showViewAll = function() {
            $scope.viewAll = true;
        };
        $scope.nodata = false;
        $scope.getsearch = false;
        $scope.searchdata.search = [];
        // $scope.mySearchFor=false;
        $scope.DoSearch = function(search, id) {
            $state.go('movie-inside', {
                id: id
            });
            $scope.mySearchFor = search;
            console.log('rdftghrtfg', $scope.mySearchFor);
            console.log(search);
            console.log(id);
            console.log(allMovies);
            $scope.viewAll = true;
            var data = $filter('filter')(allMovies, {
                name: search
            });
            console.log(data);
            populateData(data);
        };

        $scope.viewSearch = function(moviename) {
            console.log(moviename);
            $scope.moviename = '';
            $scope.mySearchFor = '';
            NavigationService.getMovieDetails(function(data) {
                populateData(data.data);
                allMovies = data.data;
                TemplateService.removeLoader();

            });
            // console.log('rdftghrtfgviewSearchClick',$scope.mySearchFor);
            // $scope.mySearchFor = '';
            // $scope.viewAll = false;
            //   console.log('rdftghrtfgviewSearchClick',$scope.mySearchFor);
        };



        $scope.allvideos = [{
            img: "img/movie/m1.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "img/movie/m2.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "img/movie/m3.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "img/movie/m4.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "img/movie/m5.jpg",
            name: "ok jaanu"

        }, {
            img: "img/movie/m1.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "img/movie/m2.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "img/movie/m3.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "img/movie/m4.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "img/movie/m5.jpg",
            name: "ok jaanu"

        }];
        $scope.allvideos = _.chunk($scope.allvideos, 5);



        NavigationService.getAllMovieName(function(data) {
            $scope.allMovieName = data.data;
            // movieNameArray = _.cloneDeep($scope.allMovieName);
            // $scope.allMovieName = _.chunk($scope.allMovieName,10);
            // $scope.allMovieName = _.slice($scope.allMovieName, [0], [10]);
            // $scope.seeMore = true;
            console.log('edrtghjfghjk', $scope.allMovieName);
            // TemplateService.removeLoader();
            // $scope.MovieGal10 = _.chunk($scope.MovieGal, 4);
            // console.log('chunk',$scope.MovieGal10);
        });
    })

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language CLicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
