var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"How many films has Karan Johar directed for Dharma productions?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"5"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"6",
                  answer: true
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"7"
            }, {
                "id": "radio4",
                "name":"9"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Which among the following songs is from a Karan Johar film?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Bholi Si Soorat"
            }, {
                "id": "radio2",
                "name": "Bole Chudiyan",
                 answer: true
            }, {
                "id": "radio3",
                "name": "Ik Pal Ka Jeena"  
            }, {
                "id": "radio4",
                "name": "Tu Jaane Na"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"Which Karan Johar film has won a national award?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Kabhi Alvida Naa Kehna"
            }, {
                "id": "radio2",
                "name": "My Name Is Khan"
            }, {
                "id": "radio3",
                "name": "Kuch Kuch Hota Hai", 
                answer: true 
            }, {
                "id": "radio4",
                "name": "Kabhi Khushi Kabhie Gham",
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"How many seasons of 'Koffee with Karan' have been broadcasted till date?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "7"
            }, {
                "id": "radio2",
                "name": "4"
            }, {
                "id": "radio3",
                "name": "8"
            }, {
                "id": "radio4",
                "name": "5",
                answer: true
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"How many films that Karan Johar has directed have titles starting with the letter 'K'?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "5",
            }, {
                "id": "radio2",
                "name": "4"
            }, {
                "id": "radio3",
                "name": "3",
                 answer: true
            }, {
                "id": "radio4",
                "name": "5"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"The title of the short film directed by Karan Johar for 'Bombay Talkies' is?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Ajeeb Dastaan Hai Yeh",
                answer: true 
            }, {
                "id": "radio2",
                "name": "Star"
            }, {
                "id": "radio3",
                "name": "Sheila Ki Jawaani"
            }, {
                "id": "radio4",
                "name": "Murabba"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"Which is Karan Johar's debut film as an actor?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Dil Toh Pagal Hai"
            }, {
                "id": "radio2",
                "name": "Duplicate"
            }, {
                "id": "radio3",
                "name": "Dilwale Dulhania Le Jayenge",
                 answer: true
            }, {
                "id": "radio4",
                "name": "Bombay Velvet"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"On how many reality shows has Karan Johar appeared as a judge?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": " 3",
                 answer: true
            }, {
                "id": "radio2",
                "name": "1",
            }, {
                "id": "radio3",
                "name": "2"
            }, {
                "id": "radio4",
                "name": "4"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Which was the latest film directed by Karan Johar?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Ae Dil Hai Mushkil",
                answer: true
            }, {
                "id": "radio2",
                "name": "Student of the Year"
            }, {
                "id": "radio3",
                "name": "My Name Is Khan"
            }, {
                "id": "radio4",
                "name": "Kapoor & Sons"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What is the title of Karan Johar's recently released autobiography?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Surprised by joy"
            }, {
                "id": "radio2",
                "name": "The Story of My Life"
            }, {
                "id": "radio3",
                "name": "An Unsuitable Boy",
                answer: true
            }, {
                "id": "radio4",
                "name": "Life as I see it"
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
