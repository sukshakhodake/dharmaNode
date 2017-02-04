var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Which legendary retro voice do you hear at the beginning of the trailer?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Dilip Kumar"

            }, {
                "id": "radio2",
                "name": "Ameen Sayani",
                answer: true

            }, {
                "id": "radio3",
                "name": "Amitabh Bachchan"
            }, {
                "id": "radio4",
                "name": "Rajesh Khanna "
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: '"Bahut _____ harkat kiye ho", says Alia',
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Badiya"
            }, {
                "id": "radio2",
                "name": "Bekar"
            }, {
                "id": "radio3",
                "name": "Ghatiya",
                answer: true
            }, {
                "id": "radio4",
                "name": "Acha"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "Which retro super-hit song do you hear in the trailer?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Tamma Tamma",
                answer: true
            }, {
                "id": "radio2",
                "name": "Laila"
            }, {
                "id": "radio3",
                "name": "Humma Humma"
            }, {
                "id": "radio4",
                "name": "Jumma Chumma"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "Sapno mein toh already _______ chad gaya",
            model: "quest4",
            options: [{
                "id": "radio1",
                "name": "Aeroplane - Sheroplane"

            }, {
                "id": "radio2",
                "name": "Seedi - Weedi"


            }, {
                "id": "radio3",
                "name": "Gaadi - Shaadi"

            }, {
                "id": "radio4",
                "name": "Ghodi - Wodi",

                answer: true

            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "What was the first film of the franchise called?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Shaunty Ki Dulhania"
            }, {
                "id": "radio2",

                "name": "Humpty Sharma Ki Dulhania ",
                answer: true

            }, {
                "id": "radio3",
                "name": "Poplu Ki Dulhania"
            }, {
                "id": "radio4",
                "name": "Bunty Sharma Ki Dulhania"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "What is more important for Vaidehi than love?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Money"

            }, {
                "id": "radio2",
                "name": " Family"
            }, {
                "id": "radio3",
                "name": "Career"
            }, {
                "id": "radio4",
                "name": "Respect",
                answer: true

            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "What compliment does Vaidehi give to Badri?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Hot"

            }, {
                "id": "radio2",
                "name": "Smart",
                answer: true

            }, {
                "id": "radio3",
                "name": "Handsome "
            }, {
                "id": "radio4",
                "name": "Cute"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: " Complete the sentence: Tujhko bana kar ke le jayenge ........ ki dulhania. Complete the lyrics",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Badri",
                answer: true
            }, {
                "id": "radio2",
                "name": "Dilwale"
            }, {
                "id": "radio3",
                "name": "Humpty"
            }, {
                "id": "radio4",
                "name": "Humari"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "What is the formula of simple interest ?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "P*R*T /100",
                answer: true
            }, {
                "id": "radio2",
                "name": "P+1+100"
            }, {
                "id": "radio3",
                "name": "PTM*100"

            }, {
                "id": "radio4",
                "name": "P*R*T*100"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "When is Badrinath Ki Dulhania releasing?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "10th March, 2015"

            }, {
                "id": "radio2",
                "name": "10th March, 2017",
                answer: true
            }, {
                "id": "radio3",
                "name": "10th March, 2018"
            }, {
                "id": "radio4",
                "name": "10th March, 2030"
            }]
        }];
        var answered;

        return {

            changeTimerRapid: function () {
                var rapidTimer = $.jStorage.get("rapidTimer");
                var returnVal;
                if (rapidTimer && rapidTimer != 1) {
                    returnVal = rapidTimer - 1;
                    $.jStorage.set("rapidTimer", returnVal);
                } else if (rapidTimer != 1) {
                    returnVal = countTimer;
                    $.jStorage.set("rapidTimer", returnVal);
                } else {
                    $.jStorage.set("rapidTimer", null);
                    returnVal = 0;
                }
                return returnVal;
            },
            getTotalTime: function () {
                return countTimer;
            },
            getQuestion: function (questionNo) {
                return questions[questionNo - 1];
            },
            lastAnswer: function () {
                return questions.length;
            },
            saveAnswer: function (answer) {
                var answered;
                if ($.jStorage.get("Answered")) {
                    answered = $.jStorage.get("Answered");
                } else {
                    answered = questions;
                }
                console.log(answer);
                var index = _.findIndex(answered, function (question) {
                    return (question.id == answer.id);
                });
                console.log(index);
                answered[index] = answer;
                console.log(answered);
                $.jStorage.set("Answered", answered);
            },
            getScore: function () {
                var score;
                var arr = [];
                if ($.jStorage.get("Answered")) {
                    answered = $.jStorage.get("Answered");
                    arr = _.map(answered, function (n) {
                        return n.options;
                    });
                    arr = _.flattenDeep(arr);
                    var correctAnswer = _.filter(arr, function (n) {
                        return (n.selected && n.answer);
                    });
                    score = correctAnswer.length;
                } else {
                    score = 0;
                }
                $.jStorage.flush();
                return score;
            }

        };
    });
