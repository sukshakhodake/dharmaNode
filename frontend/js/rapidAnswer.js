var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What is the profession of Vijay's father in Agneepath?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Policeman"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"School teacher",
                  answer: true
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Doctor"
            }, {
                "id": "radio4",
                "name":"Businessman"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"Which Dharma father says the following dialogue - 'Keh diya na, bas keh diya'?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Harsh Kapoor"
            }, {
                "id": "radio2",
                "name": "Dinanath Chauhan"
            }, {
                "id": "radio3",
                "name": "Yashvardhan Raichand",
                 answer: true 
            }, {
                "id": "radio4",
                "name": "Bipin Arora"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"What is the real name of 'Sexy Sam' in Kabhi Alvida Naa Kehna?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Sameer Singh"
            }, {
                "id": "radio2",
                "name": "Samarjit Singh"
            }, {
                "id": "radio3",
                "name": "Sameer Talwar"
            }, {
                "id": "radio4",
                "name": "Samarjit Talwar", 
                answer: true
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"Which of the following actors has never played the role of a father in a Dharma movie?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Shah Rukh Khan"
            }, {
                "id": "radio2",
                "name": "Arjun Rampal"
            }, {
                "id": "radio3",
                "name": "Varun Dhawan",
                answer: true
            }, {
                "id": "radio4",
                "name": "Anupam Kher"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"In 'Shaandaar', Pankaj Kapur plays the father of?",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Alia Bhatt",
                 answer: true
            }, {
                "id": "radio2",
                "name": "Shahid Kapoor"
            }, {
                "id": "radio3",
                "name": "Shibani Dandekar"
            }, {
                "id": "radio4",
                "name": "Sanjay Kapoor"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"What does Ananya's father learn from Krish in 2 States?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Driving a car"
            }, {
                "id": "radio2",
                "name": "Making a Powerpoint presentation",
                answer: true 
            }, {
                "id": "radio3",
                "name": "Cooking food"
            }, {
                "id": "radio4",
                "name": "Playing tennis"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"In which of the following films does Shah Rukh Khan not play the role of a father?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Kuch Kuch Hota Hai"
            }, {
                "id": "radio2",
                "name": "Kabhi Alvida Naa Kehna"
            }, {
                "id": "radio3",
                "name": "Kabhi Khushi Kabhie Gham"
            }, {
                "id": "radio4",
                "name": "Kal Ho Naa Ho",
                 answer: true
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"In Humpty Sharma Ki Dulhania, what does Humpty dream of buying his father?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "A house"
            }, {
                "id": "radio2",
                "name": "A boat",
            }, {
                "id": "radio3",
                "name": "A car",
                 answer: true
            }, {
                "id": "radio4",
                "name": "A bike"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Who plays the role of Harsh Kapoor in Kapoor & Sons?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Rishi Kapoor"
            }, {
                "id": "radio2",
                "name": "Rajat Kapoor",
                answer: true
            }, {
                "id": "radio3",
                "name": "Sidharth Malhotra"
            }, {
                "id": "radio4",
                "name": "Fawad Khan"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "How many Dharma movies has Amitabh Bachchan played the role of a father?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "2",
                answer: true
            }, {
                "id": "radio2",
                "name": "3"
            }, {
                "id": "radio3",
                "name": "4"
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
