var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What was Varun Dhawan's name in Student of the Year?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Rahul Nanda"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Rohan Nanda",
                  answer: true
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Rohit Nanda"
            }, {
                "id": "radio4",
                "name":"Raj Nanda"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"The educational qualification of the charming Badrinath is -",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "B.A"
            }, {
                "id": "radio2",
                "name": "12th pass"
            }, {
                "id": "radio3",
                "name": "10th pass",
                 answer: true  
            }, {
                "id": "radio4",
                "name": "M.A"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"Varun Dhawan has earned a degree in-",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Business Management", 
                answer: true
            }, {
                "id": "radio2",
                "name": "Culinary Arts"
            }, {
                "id": "radio3",
                "name": "Hotel Management" 
            }, {
                "id": "radio4",
                "name": "Computer Science",
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"What is Humpty Sharma's real name?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Raj Sharma"
            }, {
                "id": "radio2",
                "name": "Varun Sharma"
            }, {
                "id": "radio3",
                "name": "Vijay Sharma"
            }, {
                "id": "radio4",
                "name": "Rakesh Sharma",
                answer: true
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"How old was Varun when he did 'Student of the Year'?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "20 years",
            }, {
                "id": "radio2",
                "name": "25 years",
                 answer: true
            }, {
                "id": "radio3",
                "name": "27 years"
            }, {
                "id": "radio4",
                "name": "18 years"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"Varun has worked as an assistant director for which Dharma movie?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Dostana"
            }, {
                "id": "radio2",
                "name": "Wake Up Sid"
            }, {
                "id": "radio3",
                "name": "Kabhi Alvida Naa Kehna"
            }, {
                "id": "radio4",
                "name": "My Name Is Khan",
                answer: true 
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"Who does Varun pick as his partner for the dance competition in SOTY?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Tanya",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Shruti"
            }, {
                "id": "radio3",
                "name": "Shanaya"
            }, {
                "id": "radio4",
                "name": "Kavya"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"In Student of the Year, Varun Dhawan becomes a popular-",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Rockstar",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Businessman",
            }, {
                "id": "radio3",
                "name": "Actor"
            }, {
                "id": "radio4",
                "name": "Footballer"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Which formula did Badri learn and come back to tell Vaidehi?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Pythagoras theorem"
            }, {
                "id": "radio2",
                "name": "Simple interest",
                answer: true
            }, {
                "id": "radio3",
                "name": "Compound interest"
            }, {
                "id": "radio4",
                "name": "Laws of motion"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Varun Dhawan is a big fan of the WWE superstar-",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "The Undertaker"
            }, {
                "id": "radio2",
                "name": "Big Show"
            }, {
                "id": "radio3",
                "name": "The Rock",
                answer: true
            }, {
                "id": "radio4",
                "name": "Kane"
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
