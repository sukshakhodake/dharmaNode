var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"How many years was Devasena imprisoned for?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"10 years"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"20 years"
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"25 years",
                  answer: true
            }, {
                "id": "radio4",
                "name":"30 years"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Who is Sivagami's son?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": " Mahendra Baahubali"
            }, {
                "id": "radio2",
                "name": "Bhallala Deva",
                 answer: true
            }, {
                "id": "radio3",
                "name": "Amarendra Baahubali",  
            }, {
                "id": "radio4",
                "name": "Bhadra"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"What drives Sivudu to climb up the waterfall?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "A Sword"
            }, {
                "id": "radio2",
                "name": "An Arrow"
            }, {
                "id": "radio3",
                "name": "A Shield" 
            }, {
                "id": "radio4",
                "name": "A Mask",
                 answer: true
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"What is the name of Tamannaah Bhatia's character in the movie?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Sivagami"
            }, {
                "id": "radio2",
                "name": "Devasena"
            }, {
                "id": "radio3",
                "name": "Avantika",
                answer: true
            }, {
                "id": "radio4",
                "name": "Sanga"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"Which animal does Bhallala Deva defeat in training?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "A bull",
                answer: true
            }, {
                "id": "radio2",
                "name": "An elephant",
            }, {
                "id": "radio3",
                "name": "A Horse"
            }, {
                "id": "radio4",
                "name": "A Rhinoceros"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"Which tribe wages a war against Mahishmati Kingdom?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Kaaldanava"
            }, {
                "id": "radio2",
                "name": "Kalakeya",
                answer: true
            }, {
                "id": "radio3",
                "name": "Agniputras"
            }, {
                "id": "radio4",
                "name": "Gauravputras" 
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:" What is Bhallala Deva's statue made of?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Silver"
            }, {
                "id": "radio2",
                "name": "Wood"
            }, {
                "id": "radio3",
                "name": "Stone"
            }, {
                "id": "radio4",
                "name": "Gold",
                 answer: true
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"Who does Sivagami appoint as the new king of Mahishmati?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Amarendra Baahubali",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Bhallala Deva",
            }, {
                "id": "radio3",
                "name": "Kattappa"
            }, {
                "id": "radio4",
                "name": "Mahendra Baahubali"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Who killed Amarendra Baahubali?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Bhallala Deva"
            }, {
                "id": "radio2",
                "name": "Devasena"
            }, {
                "id": "radio3",
                "name": "Sivagami"
            }, {
                "id": "radio4",
                "name": "Kattappa",
                answer: true
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "When will you find out why Kattappa killed Baahubali?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "April 25"
            }, {
                "id": "radio2",
                "name": "April 26"
            }, {
                "id": "radio3",
                "name": "April 27"
                
            }, {
                "id": "radio4",
                "name": "April 28 ",
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
