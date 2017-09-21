var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"Kareena was popularly called as ___ in Kabhi Khushi Kabhie Gham?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Nickey"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Poo",
                answer: true
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Soniya",
            }, {
                "id": "radio4",
                "name":"Mona"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Who does Avantika fall in love with, in Kurbaan?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Rahul"
            }, {
                "id": "radio2",
                "name": "Ehsaan",
                answer: true 
            }, {
                "id": "radio3",
                "name": "Rohit"
            }, {
                "id": "radio4",
                "name": "Siddharth"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"In Gori Tere Pyaar Main, Kareena was on hunger strike against which social evil?'",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Anti Corruption", 
                answer: true
            }, {
                "id": "radio2",
                "name": "Farmer's movement"
            }, {
                "id": "radio3",
                "name": "Drug abuse"
            }, {
                "id": "radio4",
                "name": "Prisoner's movement"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"What was Kareena's profession in We Are Family?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Photographer"
            }, {
                "id": "radio2",
                "name": "Fashion Designer",
                answer: true
            }, {
                "id": "radio3",
                "name": "Teacher"
            }, {
                "id": "radio4",
                "name": "Musician"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"What was Poo's law of fashion?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Green makes you look thin"
            }, {
                "id": "radio2",
                "name": "White makes you look thin"
            }, {
                "id": "radio3",
                "name": "Black makes you look thin",
                answer: true
            }, {
                "id": "radio4",
                "name": "Red makes you look thin"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"What was Riana trying to sell to Rahul in Ek Main Aur Ekk Tu?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Car"
            }, {
                "id": "radio2",
                "name": "Scooter",
                answer: true 
            }, {
                "id": "radio3",
                "name": "House"
            }, {
                "id": "radio4",
                "name": "Furniture"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"Which pet did Kareena make Imran to adopt in Gori Tere Pyaar Main?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Dog"
            }, {
                "id": "radio2",
                "name": "Cat"
            }, {
                "id": "radio3",
                "name": "Bird"
            }, {
                "id": "radio4",
                "name": "Crab",
                answer: true
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"What is Kareena's pet name in real life?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Lolo"
            }, {
                "id": "radio2",
                "name": "Coco",
            }, {
                "id": "radio3",
                "name": "Babe"
            }, {
                "id": "radio4",
                "name": "Bebo",
                answer: true
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"What was Poo's morning song to get ready?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Mama Mia"
            }, {
                "id": "radio2",
                "name": "It's raining men, hallelujah",
                answer: true
            }, {
                "id": "radio3",
                "name": "Dancing queen"
            }, {
                "id": "radio4",
                "name": "Singing in the rain"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What number did Hrithik Roshan's character give Poo on a scale of 1 to 10?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "1"
            }, {
                "id": "radio2",
                "name": "2"
            }, {
                "id": "radio3",
                "name": "3",
                answer: true
            }, {
                "id": "radio4",
                "name": "5"
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
