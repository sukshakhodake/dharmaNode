var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "'Jiyo! Khush Raho! Muskurao! Kya Pata..Kal Ho Naa Ho' - Who said this to whom in the movie?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Aman to Rohit"
            }, {
                "id": "radio2",
                "name": "Rohit to Naina"
            }, {
                "id": "radio3",
                "name": "Aman to Naina",
                answer: true
            }, {
                "id": "radio4",
                "name": "Uncle Chaddha to Lajjo"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "What was the new name of the restaurant that Aman helped Jenni to reopen?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Cafe New York"
            }, {
                "id": "radio2",
                "name": "Cafe New Delhi",
                answer: true
            }, {
                "id": "radio3",
                "name": "Punjabi Dhaba"
            }, {
                "id": "radio4",
                "name": "Hindusthani Khana Khazana"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "______ was Aman's doctor in the movie, who he claimed to be his wife in front of Naina.",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Sonali Bendre",
                answer: true
            }, {
                "id": "radio2",
                "name": " Mandira Bedi"
            }, {
                "id": "radio3",
                "name": "Tabu"
            }, {
                "id": "radio4",
                "name": "Simone Singh"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "__ din ladki in!",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "7"
            }, {
                "id": "radio2",
                "name": "6",
                answer: true
            }, {
                "id": "radio3",
                "name": "5"
            }, {
                "id": "radio4",
                "name": "4"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Complete the dialogue: Pyar toh bahut log karte hai, lekin mere jaisa pyar koi nahi kar sakta...",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Kyun ki sabko pyar ka matlab pata nahi hai "
            }, {
                "id": "radio2",
                "name": "Kyun Ki sab dil dukhate hai"
            }, {
                "id": "radio3",
                "name": "Kyun ki dil hona chahiye pyar karne ke liye"
            }, {
                "id": "radio4",
                "name": "Kyun ki kisi ke paas tum joh nahi ho",
                answer: true
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "What classes were Rohit and Naina taking together?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Fashion Designing."
            }, {
                "id": "radio2",
                "name": "MBA",
                answer: true
            }, {
                "id": "radio3",
                "name": "Charted Accountancy. "
            }, {
                "id": "radio4",
                "name": "Fitness Instructor "
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "Where does Shah Rukh see Preity for the first time in the film?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "His house"
            }, {
                "id": "radio2",
                "name": "Road-side"
            }, {
                "id": "radio3",
                "name": "Through a window"
            }, {
                "id": "radio4",
                "name": "Train station",
                answer: true
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Where was the entire film shot?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "New York",
                answer: true
            }, {
                "id": "radio2",
                "name": "Chicago"
            }, {
                "id": "radio3",
                "name": "Toronto"
            }, {
                "id": "radio4",
                "name": "San Francisco"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "Rohit’s father owned a food chain in America. What is it called?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Thepla Corner"
            }, {
                "id": "radio2",
                "name": "Gujju Khana Khazaana"
            }, {
                "id": "radio3",
                "name": "Dial - a- Dhokla",
                answer: true
            }, {
                "id": "radio4",
                "name": "Dial - a - Khakra"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What does Aman call Naina in the movie, Kal Ho Naa Ho?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Khadoos"
            }, {
                "id": "radio2",
                "name": "Sweetu"
            }, {
                "id": "radio3",
                "name": "Chashmish",
                answer: true
            }, {
                "id": "radio4",
                "name": "Pretty Woman"
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
