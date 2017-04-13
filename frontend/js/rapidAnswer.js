var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Cut out of Manadakini",
                answer: true
            }, {
                "id": "radio2",
                "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                "name": "Cut out of Sridevi"
            }, {
                "id": "radio4",
                "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Tuffy"
            }, {
                "id": "radio2",
                "name": "Gafar"
            }, {
                "id": "radio3",
                "name": "Geishu",
                answer: true
            }, {
                "id": "radio4",
                "name": "Tommy"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Musician"
            }, {
                "id": "radio2",
                "name": "Bar Tender"
            }, {
                "id": "radio3",
                "name": "Writer",
                answer: true
            }, {
                "id": "radio4",
                "name": "News Reporter"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",
            options: [{
                "id": "radio1",
                "name": "Brijesh"

            }, {
                "id": "radio2",
                "name": "Kishore",
                answer: true

            }, {
                "id": "radio3",
                "name": "Ganesh"

            }, {
                "id": "radio4",
                "name": "Sonu"

            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Restaurant"
            }, {
                "id": "radio2",

                "name": "Cemetery",
                answer: true

            }, {
                "id": "radio3",
                "name": "Temple"
            }, {
                "id": "radio4",
                "name": "Food Festival"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Electrician"
            }, {
                "id": "radio2",
                "name": "Gardener"
            }, {
                "id": "radio3",
                "name": "Cobbler"
            }, {
                "id": "radio4",
                "name": "Plumber",
                answer: true
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Ajay"

            }, {
                "id": "radio2",
                "name": "Harsh",
                answer: true
            }, {
                "id": "radio3",
                "name": "Aman"
            }, {
                "id": "radio4",
                "name": "Not mentioned in the movie"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: 'What was the wildest thing Rahul had done in his life?"',
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Quit a well paying job"
            }, {
                "id": "radio2",
                "name": "Got a tattoo",
                answer: true
            }, {
                "id": "radio3",
                "name": "Drove across the country"
            }, {
                "id": "radio4",
                "name": "Kiss at the top of a Ferris wheel"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Let’s Nacho"
            }, {
                "id": "radio2",
                "name": "Buddhu Sa Mann"
            }, {
                "id": "radio3",
                "name": "Bolna"
            }, {
                "id": "radio4",
                "name": "Kar Gayi Chull",
                answer: true
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Kapoor & Sons since ___?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "1928"
            }, {
                "id": "radio2",
                "name": "1924"
            }, {
                "id": "radio3",
                "name": "1921",
                answer: true
            }, {
                "id": "radio4",
                "name": "1920"
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
