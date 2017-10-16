var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "If not for cheating, who was actually winning the first ever basketball match in the movie?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Rahul"
            }, {
                "id": "radio2",
                "name": "Tina"

            }, {
                "id": "radio3",
                "name": "Anjali",
                answer: true
            }, {
                "id": "radio4",
                "name": "Kamal"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "What was written on Rahul's chain that he wore around his neck?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Friendship"
            }, {
                "id": "radio2",
                "name": "Cool",
                answer: true
            }, {
                "id": "radio3",
                "name": "Pyaar"
            }, {
                "id": "radio4",
                "name": "Anjali"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: " What was Ms. Briganza teaching them when Rahul said the famous dialogue 'Pyaar dosti ha'?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": " Romeo & Juliet",
                answer: true
            }, {
                "id": "radio2",
                "name": "Amar Prem"
            }, {
                "id": "radio3",
                "name": "Prem Katha"
            }, {
                "id": "radio4",
                "name": "Laila aur Majnu"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "What was Shah Rukh Khan's full name in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Rahul Khanna",
                answer: true
            }, {
                "id": "radio2",
                "name": "Rahul Kapoor"
            }, {
                "id": "radio3",
                "name": "Rahul Mehra"
            }, {
                "id": "radio4",
                "name": "Rahul Malhotra"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Where did Rahul and Anjali finally meet after years?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "College reunion"
            }, {
                "id": "radio2",
                "name": "Summer camp",
                answer: true
            }, {
                "id": "radio3",
                "name": "Basketball court"
            }, {
                "id": "radio4",
                "name": "At a party"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: " What did Anjali give to Tina when she was leaving on the train?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "A red duppata",
                answer: true
            }, {
                "id": "radio2",
                "name": "Her friendship band"
            }, {
                "id": "radio3",
                "name": "Basketball"
            }, {
                "id": "radio4",
                "name": "Nothing"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "Rahul and Anjali believed in wishing on a ____?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Dandelion"
            }, {
                "id": "radio2",
                "name": "Shooting star",
                answer: true
            }, {
                "id": "radio3",
                "name": "Miracle"
            }, {
                "id": "radio4",
                "name": "Nothing"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Which song did Tina choose when Rahul challenged her to sing in Hindi?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Chodh do aanchal"
            }, {
                "id": "radio2",
                "name": "Kuch Kuch Hota Hai",
            }, {
                "id": "radio3",
                "name": "Om Jai Jagadish",
                answer: true
            }, {
                "id": "radio4",
                "name": "She didn't sing"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "What did Tina leave behind for her daughter's birthday every year?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Stuffed toys"
            }, {
                "id": "radio2",
                "name": "Chocolates"
            }, {
                "id": "radio3",
                "name": "Letters",
                answer: true
            }, {
                "id": "radio4",
                "name": "Clothes"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What was the name of the college where Rahul, Tina & Anjali were studying?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "St. Teresa College"
            }, {
                "id": "radio2",
                "name": "St. Stephen College"
            }, {
                "id": "radio3",
                "name": "St. Xavier's College",
                answer: true
            }, {
                "id": "radio4",
                "name": "St. Lawrence College"
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
