var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Name the college where Rahul was studying in Kuch Kuch Hota Hai?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "St. Teresa College"
            }, {
                "id": "radio2",
                "name": "St. Stephen College"
            }, {
                "id": "radio3",
                "name": "St. Xavier's College",
                answer: true
            }, {
                "id": "radio4",
                "name": "St. Lawrence College. "
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "'Baimaani ka dhanda bhi main imaandari se karta hoon' was said by Shah Rukh Khan in which movie?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Kuch Kuch Hota Hai"
            }, {
                "id": "radio2",
                "name": "Kaal"
            }, {
                "id": "radio3",
                "name": "Kabhi Khushi Kabhie Gham"
            }, {
                "id": "radio4",
                "name": "Duplicate",
                answer: true
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "In Kabhi Khushi Kabhie Gham, what was Rahul's son's name?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Krish",
                answer: true
            }, {
                "id": "radio2",
                "name": "Aman"
            }, {
                "id": "radio3",
                "name": "Ladoo"
            }, {
                "id": "radio4",
                "name": "Yash"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "What does Aman call Naina in the movie, Kal Ho Naa Ho?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Naina o Naina"
            }, {
                "id": "radio2",
                "name": "Khadoos"
            }, {
                "id": "radio3",
                "name": "Chashmish",
                answer: true
            }, {
                "id": "radio4",
                "name": "Pretty Woman"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "What was SRK's profession in Ae Dil Hai Mushkil?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Poet"
            }, {
                "id": "radio2",
                "name": "Singer"
            }, {
                "id": "radio3",
                "name": "Sculpture artist"
            }, {
                "id": "radio4",
                "name": "Painter",
                answer: true
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "Where did Dev and Maya have their first conversation in Kabhi Alvida Naa Kehna?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "On a bench",
                answer: true
            }, {
                "id": "radio2",
                "name": "On a road"
            }, {
                "id": "radio3",
                "name": "At a restaurant"
            }, {
                "id": "radio4",
                "name": "Near his house"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "What does Shah Rukh Khan want to say to the president in My Name Is Khan?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "My Name Is Khan, that's my identity."
            }, {
                "id": "radio2",
                "name": "I am an Indian"
            }, {
                "id": "radio3",
                "name": "My Name Is Khan and I am not a terrorist.",
                answer: true
            }, {
                "id": "radio4",
                "name": "You don't deserve power. "
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: ".Which sport did Anjali and Rahul play in Kuch Kuch Hota Hai?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Cricket"
            }, {
                "id": "radio2",
                "name": "Basketball",
                answer: true
            }, {
                "id": "radio3",
                "name": "Football"
            }, {
                "id": "radio4",
                "name": "Table Tennis"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "What was the name of the restaurant that Aman helped Jenni to open in the movie, Kal Ho Naa Ho?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Cafe New York"
            }, {
                "id": "radio2",
                "name": "Punjabi Dhaba"
            }, {
                "id": "radio3",
                "name": "Cafe New Delhi",
                answer: true
            }, {
                "id": "radio4",
                "name": "Hindusthani Khana Khazana"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Where does Dr.Jehangir Khan stay in Dear Zindagi?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Goa",
                answer: true
            }, {
                "id": "radio2",
                "name": "Mumbai"
            }, {
                "id": "radio3",
                "name": "Gokarna"
            }, {
                "id": "radio4",
                "name": "Andaman"
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
