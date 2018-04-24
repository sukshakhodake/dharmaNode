var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "How is Varun Dhawan related to the film, My Name Is Khan?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "He had visited the set once"
            }, {
                "id": "radio2",
                "name": "He was the assistant director",
                answer: true
            }, {
                "id": "radio3",
                "name": "He has watched the film 42 times"
            }, {
                "id": "radio4",
                "name": "He's not related to the film"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "In the quiz round during Student Of The Year, which place does Rohan aka Varun Dhawan get?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "6th"
            }, {
                "id": "radio2",
                "name": "16th"
            }, {
                "id": "radio3",
                "name": "12th",
                answer: true
            }, {
                "id": "radio4",
                "name": "3rd"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "What is Varun Dhawan’s full name in Humpty Sharma Ki Dulhania?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Rahul Sharma"
            }, {
                "id": "radio2",
                "name": "Rakesh Sharma",
                answer: true
            }, {
                "id": "radio3",
                "name": "Dev Sharma"
            }, {
                "id": "radio4",
                "name": "Yash Sharma"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "What did Humpty promise to get Kavya in the movie Humpty Sharma Ki Dulhania? ",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Car"
            }, {
                "id": "radio2",
                "name": "Earrings"
            }, {
                "id": "radio3",
                "name": "Designer lehenga",
                answer: true
            }, {
                "id": "radio4",
                "name": "The perfect groom"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "For Badrinath Ki Dulhania, Varun Dhawan got a similar hair style as _____",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Shahrukh Khan"
            }, {
                "id": "radio2",
                "name": "M.S. Dhoni"
            }, {
                "id": "radio3",
                "name": "Virat Kohli",
                answer: true
            }, {
                "id": "radio4",
                "name": "Salman Khan"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "In order to marry Kayva, what is the one condition that Humpty has to fulfill, in Humpty Sharma Ki Dulhania?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "He has to get a job"
            }, {
                "id": "radio2",
                "name": "He has to find a fault in the man Kayva is suppose to marry",
                answer: true
            }, {
                "id": "radio3",
                "name": "He has to impress her father"
            }, {
                "id": "radio4",
                "name": "He has to move to Ambala."
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "In Student Of The Year, which sports-team captain was Varun Dhawan competing for?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Cricket"
            }, {
                "id": "radio2",
                "name": "Tennis"
            }, {
                "id": "radio3",
                "name": "Rugby"
            }, {
                "id": "radio4",
                "name": "Football",
                answer: true
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "'Tumhari mansik isthithi aaj thodi gadbad lag rahi hai, hum kal phir aayenge'Which movie is this dialogue from?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Humpty Sharma Ki Dulhania"
            }, {
                "id": "radio2",
                "name": "Badrinath Ki Dulhania",
                answer: true
            }, {
                "id": "radio3",
                "name": "Student Of The Year"
            }, {
                "id": "radio4",
                "name": "None of the above"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "In Badrinath Ki Dulhania, which formula does Badri remember & recite to Vaidehi?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Compound interest"
            }, {
                "id": "radio2",
                "name": "Force"
            }, {
                "id": "radio3",
                "name": "Simple interest",
                answer: true
            }, {
                "id": "radio4",
                "name": "None of the above "
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Which upcoming Dharma movie of 2019 is Varun Dhawan a part of?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Kesari"
            }, {
                "id": "radio2",
                "name": "Student Of The Year 2"
            }, {
                "id": "radio3",
                "name": "Kalank",
                answer: true
            }, {
                "id": "radio4",
                "name": "Rannbhoomi"
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
