var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Where did Saba meet Ayan the second time?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Nightclub",
                answer: true
            }, {
                "id": "radio2",
                "name": "Airport"

            }, {
                "id": "radio3",
                "name": "Her home"
            }, {
                "id": "radio4",
                "name": "An exhibition"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "What was the name of Alizeh's bollywood playlist?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Jollygood Bollywood"
            }, {
                "id": "radio2",
                "name": "Cheap Thrills",
                answer: true
            }, {
                "id": "radio3",
                "name": "80's Romance"
            }, {
                "id": "radio4",
                "name": "Pyaarelal"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "In the movie, which hindi word was described as 'vibe' by Lisa and Ayan?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Vistaar"
            }, {
                "id": "radio2",
                "name": "Vaataavaran",
                answer: true
            }, {
                "id": "radio3",
                "name": "Vyaakhya"
            }, {
                "id": "radio4",
                "name": "Taakat "
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "Whose voice was it, that was interviewing Ayan in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Richa Chadha"
            }, {
                "id": "radio2",
                "name": "Neha Dhupia",
                answer: true
            }, {
                "id": "radio3",
                "name": "Parineeti Chopra"
            }, {
                "id": "radio4",
                "name": "Madhuri Dixit"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Who directed Ae Dil Hai Mushkil?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Ayan Mukerji"
            }, {
                "id": "radio2",
                "name": "Karan Malhotra"
            }, {
                "id": "radio3",
                "name": "Karan Johar",
                answer: true
            }, {
                "id": "radio4",
                "name": "Tarun Mansukhani"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "Complete the lyrics of the song - 'Ik baar ko _____ toh dikha de,jhoothi sahi magar _____ toh dila de'",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Tasalli, Tajalli"
            }, {
                "id": "radio2",
                "name": "Tajjali, Tasalli",
                answer: true
            }, {
                "id": "radio3",
                "name": "Tafalli, Tajalli"
            }, {
                "id": "radio4",
                "name": "Tajalii, Tajalii "
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "What did Alizeh throw at Lisa when they went for a double date?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Water"
            }, {
                "id": "radio2",
                "name": "Used napkins"
            }, {
                "id": "radio3",
                "name": "Plate"
            }, {
                "id": "radio4",
                "name": "Red Wine",
                answer: true
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Where was Alizeh and Ali's wedding held?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Lucknow, India",
                answer: true
            }, {
                "id": "radio2",
                "name": "Lahore, Pakistan"
            }, {
                "id": "radio3",
                "name": "San Francisco, California"
            }, {
                "id": "radio4",
                "name": "Udaipur, India"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "The dialogue 'Ek tarfaa pyaar ki taakat hi kuch aur hoti hai' was actually said by____?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Ranbir Kapoor"
            }, {
                "id": "radio2",
                "name": " Aishwarya Rai Bachchan"
            }, {
                "id": "radio3",
                "name": "Fawad Khan"
            }, {
                "id": "radio4",
                "name": "Shah Rukh Khan",
                answer: true
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Where did Alizeh and Ayan go for their 'dil tutti chutti'?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Paris",
                answer: true
            }, {
                "id": "radio2",
                "name": "New York"
            }, {
                "id": "radio3",
                "name": "Los Angeles"
            }, {
                "id": "radio4",
                "name": "Dubai"
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
