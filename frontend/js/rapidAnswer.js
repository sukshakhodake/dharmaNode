var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Rohan aspired to become a ____ when he grew up.",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Business tycoon"
            }, {
                "id": "radio2",
                "name": "Football player"

            }, {
                "id": "radio3",
                "name": "Rockstar",
                answer: true
            }, {
                "id": "radio4",
                "name": "Choreographer"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "Who was Abhimanyu's partner in the dancing competition?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Shanaya"
            }, {
                "id": "radio2",
                "name": "Shruti",
                answer: true
            }, {
                "id": "radio3",
                "name": "Tanya"
            }, {
                "id": "radio4",
                "name": "Sudo"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "Which child artist from a former Karan Johar film was a part of this film too?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Sana Saeed",
                answer: true
            }, {
                "id": "radio2",
                "name": "Alia Bhatt"
            }, {
                "id": "radio3",
                "name": "Sarah Ali Khan"
            }, {
                "id": "radio4",
                "name": "Athiya Shetty"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "Whose team was Shanaya in during the treasure hunt competition?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Rohan"
            }, {
                "id": "radio2",
                "name": "Abhimanyu",
                answer: true
            }, {
                "id": "radio3",
                "name": "Jeet"
            }, {
                "id": "radio4",
                "name": "Shruti"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Who all get eliminated after the dance competition?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Shanaya, Dimpy, Jeet & Shruti."
            }, {
                "id": "radio2",
                "name": "Sudo, Shanaya, Ritu & Tanya.",
                answer: true
            }, {
                "id": "radio3",
                "name": "Shruti, Reetu, Dimpy & Sudo."
            }, {
                "id": "radio4",
                "name": "Rohan, Jeet, Shanya & Abhimanyu."
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: " Complete the dialogue - 'Akad ki bhi ____ hoti hai'",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Khayaal"
            }, {
                "id": "radio2",
                "name": "Sapne"
            }, {
                "id": "radio3",
                "name": "Aukaat",
                answer: true
            }, {
                "id": "radio4",
                "name": "Aukaat"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "Which iconic remake song was used in the movie to introduce Shanaya?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Gulaabi Aankhein",
                answer: true
            }, {
                "id": "radio2",
                "name": "Roop Tere Mastana"
            }, {
                "id": "radio3",
                "name": "Ek Ajnabee Haseena Se"
            }, {
                "id": "radio4",
                "name": "Yeh Chand sa Roshan Chehra"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Who won the Student of The Year trophy?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Shanaya"
            }, {
                "id": "radio2",
                "name": "Rohan",
                answer: true
            }, {
                "id": "radio3",
                "name": "Abhimanyu"
            }, {
                "id": "radio4",
                "name": "Jeet"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "Abhimanyu kept Shanaya's ______ with him from the wedding.",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Ring"
            }, {
                "id": "radio2",
                "name": "Necklace"
            }, {
                "id": "radio3",
                "name": "Earring",
                answer: true
            }, {
                "id": "radio4",
                "name": "Hair Clip"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "How many years later did the entire gang meet at the hospital?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "14 Years"
            }, {
                "id": "radio2",
                "name": "5 Years"
            }, {
                "id": "radio3",
                "name": "7 Years"
            }, {
                "id": "radio4",
                "name": "10 Years",
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
