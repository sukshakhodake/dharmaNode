var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "What is Badri's full name ?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Badri Behl"

            }, {
                "id": "radio2",
                "name": "Badrivedh Kumar"

            }, {
                "id": "radio3",
                "name": "Badrinath Tiwari"
            }, {
                "id": "radio4",
                "name": " Badrinath Bansal ",
                answer: true
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "What pattern does Badri's tie have?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Polka dots"
            }, {
                "id": "radio2",
                "name": "Checks",
                answer: true
            }, {
                "id": "radio3",
                "name": "Horizontal stripes"
            }, {
                "id": "radio4",
                "name": "Vertical stripes"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "What is Badri's suit color?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Black"
            }, {
                "id": "radio2",
                "name": "Blue"
            }, {
                "id": "radio3",
                "name": "Brown",
                answer: true
            }, {
                "id": "radio4",
                "name": "White"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "The two actresses who are standing beside Badri?",
            model: "quest4",
            options: [{
                "id": "radio1",
                "name": "Kareena Kapoor & Sonam Kapoor"
            }, {
                "id": "radio2",
                "name": "Kareena Kapoor & Alia Bhatt"
            }, {
                "id": "radio3",
                "name": "Kareena Kapoor & Deepika Padukone",
                answer: true
            }, {
                "id": "radio4",
                "name": "Kareena Kapoor & Karishma Kapoor"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: " In the end, which shoe does Badri throw at the camera?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "He doesn't throw a shoe"
            }, {
                "id": "radio2",
                "name": "Right shoe"

            }, {
                "id": "radio3",
                "name": "Left shoe",
                answer: true
            }, {
                "id": "radio4",
                "name": "Shoe lying around him"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "Which superstar's name is mentioned in the teaser?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Aamir Khan"
            }, {
                "id": "radio2",
                "name": "Salman Khan"
            }, {
                "id": "radio3",
                "name": "Shah Rukh Khan",
                answer: true
            }, {
                "id": "radio4",
                "name": "Hrithik Roshan"

            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "When did #BadriKaTeaser release?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "28th Jan"
            }, {
                "id": "radio2",
                "name": "29th Jan"

            }, {
                "id": "radio3",
                "name": "30th Jan",
                answer: true
            }, {
                "id": "radio4",
                "name": "31th Jan"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Which festival is the movie slated to release on?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Diwali"
            }, {
                "id": "radio2",
                "name": "Eid"
            }, {
                "id": "radio3",
                "name": "Holi",
                answer: true
            }, {
                "id": "radio4",
                "name": "Christmas"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "On the day of the teaser launch, what was Badri watching at night?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "#BadriKaTeaser"
            }, {
                "id": "radio2",
                "name": "#RoyalWedding"
            }, {
                "id": "radio3",
                "name": "#RoyalRumble",
                answer: true

            }, {
                "id": "radio4",
                "name": "#HumptySharmaKiDulhania"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What is Badri's Dulhania's name?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Will get to know on 2nd February!",
                answer: true

            }, {
                "id": "radio2",
                "name": "Will get to know on 2nd February!",
                answer: true
            }, {
                "id": "radio3",
                "name": "Will get to know on 2nd February!",
                answer: true
            }, {
                "id": "radio4",
                "name": "Will get to know on 2nd February!",
                answer: true
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
