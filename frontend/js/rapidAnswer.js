var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What was Ranbir Kapoor’s name in Ae Dil Hai Mushkil?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Ayan",
                answer: true
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Rahul"
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Kabir",
            }, {
                "id": "radio4",
                "name":"Sidharth"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Which city was Bunny ideally off to after Aditi's wedding in Yeh Jawaani Hai Deewani?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "New York"
            }, {
                "id": "radio2",
                "name": "Melbourne"
            }, {
                "id": "radio3",
                "name": "Paris",
                answer: true 
            }, {
                "id": "radio4",
                "name": "Berlin"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"How many friends did Sid have in his group in Wake Up Sid?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "4"
            }, {
                "id": "radio2",
                "name": "6"
            }, {
                "id": "radio3",
                "name": "3", 
                answer: true
            }, {
                "id": "radio4",
                "name": "5"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"Where did Ayan meet Saba in Ae Dil Hai Mushkil?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Parking lot"
            }, {
                "id": "radio2",
                "name": "Airport",
                answer: true
            }, {
                "id": "radio3",
                "name": "Hotel"
            }, {
                "id": "radio4",
                "name": "Wedding"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"Where was Bunny trekking to when he met Naina on the way?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Bhoota Parvat",
                answer: true
            }, {
                "id": "radio2",
                "name": "Khipshi Pass"
            }, {
                "id": "radio3",
                "name": "Nathu La Pass"
            }, {
                "id": "radio4",
                "name": "Mandar Parvat"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"Who did Sid meet at his college farewell?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Rekha"
            }, {
                "id": "radio2",
                "name": "Aisha",
                answer: true 
            }, {
                "id": "radio3",
                "name": "Lakshmi"
            }, {
                "id": "radio4",
                "name": "Naina"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"What was Ayan's music playlist called?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Jollygood Bollywood",
                answer: true
            }, {
                "id": "radio2",
                "name": "Ae Dil Hai Mushkil"
            }, {
                "id": "radio3",
                "name": "Retro party"
            }, {
                "id": "radio4",
                "name": "Breakup songs"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"What did Bunny call Naina?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Naina"
            }, {
                "id": "radio2",
                "name": "Babe",
            }, {
                "id": "radio3",
                "name": "Chashmish",
                answer: true
            }, {
                "id": "radio4",
                "name": "Nainu"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Name the magazine where Sid was interning in Wake Up Sid?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Mumbai Times"
            }, {
                "id": "radio2",
                "name": "Mumbai Beat",
                answer: true
            }, {
                "id": "radio3",
                "name": "Mumbai Cacophony"
            }, {
                "id": "radio4",
                "name": "None of the Above"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "How many Dharma movies has Ranbir Kapoor been in?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "2"
            }, {
                "id": "radio2",
                "name": "3",
                answer: true
            }, {
                "id": "radio3",
                "name": "1"
            }, {
                "id": "radio4",
                "name": "4"
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
