var rapidAnswer = angular.module('rapidAnswer', [])

.factory('RapidAnswer', function ($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "Where did Arjun meet Tia for the first time in Kapoor & Sons?",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "In a pub"
        }, {
            "id": "radio2",
            "name": "At a house party",
            answer: true
        }, {
            "id": "radio3",
            "name": "In a parking lot"
        }, {
            "id": "radio4",
            "name": "In office"
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "Which year did Sidharth Malhotra start his acting career?",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": "2010"
        }, {
            "id": "radio2",
            "name": "2011"
        }, {
            "id": "radio3",
            "name": "2012",
            answer: true
        }, {
            "id": "radio4",
            "name": "2013"
        }]
    }, {
        id: 3,
        quesNo: "Q3",
        question: "What was Sidharth Malhotra's character's name in Ittefaq?",
        model: "quest3",
        options: [{
            "id": "radio1",
            "name": "Vikram",
            answer: true
        }, {
            "id": "radio2",
            "name": "Dev"
        }, {
            "id": "radio3",
            "name": "Vishal"
        }, {
            "id": "radio4",
            "name": "Sid"
        }]
    }, {
        id: 4,
        quesNo: "Q4",
        question: "Who was Monty aka Sidharth’s opponent in the final match in Brothers?",
        model: "quest4",

        options: [{
            "id": "radio1",
            "name": "His brother",
            answer: true
        }, {
            "id": "radio2",
            "name": "His best friend"
        }, {
            "id": "radio3",
            "name": "His father"
        }, {
            "id": "radio4",
            "name": "None of the above"
        }]
    }, {
        id: 5,
        quesNo: "Q5",
        question: "How many Dharma movies has Sidharth featured in?",
        model: "quest5",
        options: [{
            "id": "radio1",
            "name": "6",
            answer: true
        }, {
            "id": "radio2",
            "name": "5"
        }, {
            "id": "radio3",
            "name": "4"
        }, {
            "id": "radio4",
            "name": "7"
        }]
    }, {
        id: 6,
        quesNo: "Q6",
        question: "Which Dharma movie did Sidharth work as an Assistant Director?",
        model: "quest6",
        options: [{
            "id": "radio1",
            "name": "Wake Up Sid"
        }, {
            "id": "radio2",
            "name": "My Name Is Khan",
            answer: true
        }, {
            "id": "radio3",
            "name": "Dostana"
        }, {
            "id": "radio4",
            "name": "I Hate Luv Storys"
        }]
    }, {
        id: 7,
        quesNo: "Q7",
        question: "‘Raat Baaki, Baat Baaki’ was reprised in which Sidharth Malhotra film?",
        model: "quest7",
        options: [{
            "id": "radio1",
            "name": " Hasee Toh Phasee"
        }, {
            "id": "radio2",
            "name": "Ittefaq",
            answer: true
        }, {
            "id": "radio3",
            "name": "Kapoor & Sons"
        }, {
            "id": "radio4",
            "name": "Brothers"
        }]
    }, {
        id: 8,
        quesNo: "Q8",
        question: "What was the name of the pet Sidharth and his family had in Kapoor & Sons?",
        model: "quest8",
        options: [{
            "id": "radio1",
            "name": "Dodo"
        }, {
            "id": "radio2",
            "name": "Billo"
        }, {
            "id": "radio3",
            "name": "Geishu",
            answer: true
        }, {
            "id": "radio4",
            "name": "Bruno"
        }]
    }, {
        id: 9,
        quesNo: "Q9",
        question: "In Brothers, what was the relationship between Sidharth and Jacqueline Fernandez?",
        model: "quest9",
        options: [{
            "id": "radio1",
            "name": "Sister"
        }, {
            "id": "radio2",
            "name": "Fiancé"
        }, {
            "id": "radio3",
            "name": "Fitness trainer"
        }, {
            "id": "radio4",
            "name": "Sister-in-law",
            answer: true
        }]
    }, {
        id: 10,
        quesNo: "Q10",
        question: "Which actress’s cut out did Arjun gift to Daadu on his birthday in the movie Kapoor & Sons?",
        model: "quest10",
        options: [{
            "id": "radio1",
            "name": "Tina Munim"
        }, {
            "id": "radio2",
            "name": "Zeenat Aman"
        }, {
            "id": "radio3",
            "name": "Helen"
        }, {
            "id": "radio4",
            "name": "Mandakini",
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
