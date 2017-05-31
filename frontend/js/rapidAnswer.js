var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What is the name of Kalki Koechlin's character in the movie?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Naina"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Aditi",
                  answer: true
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Anjali"
            }, {
                "id": "radio4",
                "name":"Neha"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Which song do Bunny and Avi sing to wake up Aditi?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": " Badtameez Dil"
            }, {
                "id": "radio2",
                "name": "Dilli wali Girlfriend"
            }, {
                "id": "radio3",
                "name": "Jumma Chumma De De",
                 answer: true 
            }, {
                "id": "radio4",
                "name": "Saara Zamaana"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"What is the name of the haunted hill that Bunny and Naina climb together?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Bhutha Parbat", 
                answer: true
            }, {
                "id": "radio2",
                "name": "Bhairav Parbat"
            }, {
                "id": "radio3",
                "name": "Kaalmani Pahad"
            }, {
                "id": "radio4",
                "name": "Raghav Pahad",
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"What is Bunny's real name in the movie?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Karan Sharma"
            }, {
                "id": "radio2",
                "name": "Kabir Sharma"
            }, {
                "id": "radio3",
                "name": "Kabir Thapar",
                answer: true
            }, {
                "id": "radio4",
                "name": "Karan Thapar"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:" Which of the following actors makes a cameo appearance in the movie?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Sharman Joshi",
            }, {
                "id": "radio2",
                "name": "Varun Dhawan"
            }, {
                "id": "radio3",
                "name": "Rana Daggubati",
                 answer: true
            }, {
                "id": "radio4",
                "name": "Sidharth Malhotra"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"Where does Avi spend his New Year's eve?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "In Udaipur"
            }, {
                "id": "radio2",
                "name": " In his bar",
                answer: true 
            }, {
                "id": "radio3",
                "name": "In Manali"
            }, {
                "id": "radio4",
                "name": "In Paris"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"To which place do Avi, Aditi, Bunny and Naina travel for a brief holiday in the first half of the film?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Manali",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Ladakh"
            }, {
                "id": "radio3",
                "name": "Switzerland"
            }, {
                "id": "radio4",
                "name": "Alaska"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"Which song in the movie is sung by Benny Dayal?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Ilahi"
            }, {
                "id": "radio2",
                "name": "Dilli Wali Girlfriend",
            }, {
                "id": "radio3",
                "name": "Ghagra"
            }, {
                "id": "radio4",
                "name": "Badtameez Dil",
                 answer: true
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"The song Ilahi has been shot in which city?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Munich"
            }, {
                "id": "radio2",
                "name": "Paris",
                answer: true
            }, {
                "id": "radio3",
                "name": "Barcelona"
            }, {
                "id": "radio4",
                "name": "London"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Who is the director of the movie?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Karan Malhotra"
            }, {
                "id": "radio2",
                "name": "Abhishek Varman"
            }, {
                "id": "radio3",
                "name": "Ayan Mukerji",
                answer: true
            }, {
                "id": "radio4",
                "name": "Punit Malhotra"
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
