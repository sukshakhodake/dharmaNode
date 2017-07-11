var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What are Humpty's bestfriend's names?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Gabru and Bablu"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Shonta and Lallu"
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Shonty and Paplu",
                  answer: true
            }, {
                "id": "radio4",
                "name":"Paplu and Lallu"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"What is Kavya's one ultimate dream?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "To work in Singapore"
            }, {
                "id": "radio2",
                "name": "To get married in Delhi"
            }, {
                "id": "radio3",
                "name": "To wear a designer lehenga for her wedding",
                 answer: true 
            }, {
                "id": "radio4",
                "name": "To get married to a rich man"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"Complete the dialogue - 'Bandhe perfect nahi hote, ____ perfect hote hain'",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Shaadi"
            }, {
                "id": "radio2",
                "name": "Rishte", 
                answer: true
            }, {
                "id": "radio3",
                "name": "Kapde"
            }, {
                "id": "radio4",
                "name": "Haalat"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"Which song did Alia recreate for this movie?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Daingad Daingad"
            }, {
                "id": "radio2",
                "name": "Saturday Saturday"
            }, {
                "id": "radio3",
                "name": "Humsafar"
            }, {
                "id": "radio4",
                "name": "Samjhawan",
                answer: true
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"Who is the director of Humpty Sharma Ki Dulhania?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Punit Malhotra"
            }, {
                "id": "radio2",
                "name": "Karan Johar"
            }, {
                "id": "radio3",
                "name": "Shakun Batra"
            }, {
                "id": "radio4",
                "name": "Shashank Khaitan",
                 answer: true
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"What role does Kavya play in the hotel sting operation scene for her friend?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Journalist"
            }, {
                "id": "radio2",
                "name": "Doctor"
            }, {
                "id": "radio3",
                "name": "Hotel receptionist",
                answer: true 
            }, {
                "id": "radio4",
                "name": "Teacher"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"In which of the following films does Shah Rukh Khan not play the role of a father?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Beer drinking",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Arm wrestling"
            }, {
                "id": "radio3",
                "name": "Thumb fight"
            }, {
                "id": "radio4",
                "name": "Running"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"Complete the lines of Humpty's poem: My daddy cry if I fail, then I hit you and _____________?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "dance again"
            }, {
                "id": "radio2",
                "name": "stand straight",
            }, {
                "id": "radio3",
                "name": "go to jail",
                 answer: true
            }, {
                "id": "radio4",
                "name": "hit you again"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Who is Kavya arranged to get married to?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Humpty"
            }, {
                "id": "radio2",
                "name": "Kabir"
            }, {
                "id": "radio3",
                "name": "Angad",
                answer: true
            }, {
                "id": "radio4",
                "name": "Raj"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "When did Humpty Sharma Ki Dulhania release?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "11th July 2016"
            }, {
                "id": "radio2",
                "name": "11th July 2015"
            }, {
                "id": "radio3",
                "name": "11th July 2014",
                answer: true
            }, {
                "id": "radio4",
                "name": "11th July 2013"
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
