var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "The dream girl Shanaya in Student of the year was wearing a ____ colored dress at the dance competition!",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Blue"

            }, {
                "id": "radio2",
                "name": "Pink"

            }, {
                "id": "radio3",
                "name": "Red",
                answer: true
            }, {
                "id": "radio4",
                "name": "Black"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "Where does Ananya live in the movie, 2 States?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Chandigarh"
            }, {
                "id": "radio2",
                "name": "Chennai",
                answer: true
            }, {
                "id": "radio3",
                "name": "Bangalore"
            }, {
                "id": "radio4",
                "name": "Mumbai"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "Kaavya's ultimate dream in Humpty Sharma Ki Dulhania was?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "To get married"
            }, {
                "id": "radio2",
                "name": "To get her sister married again"
            }, {
                "id": "radio3",
                "name": "Kareena's designer lehenga",
                answer: true
            }, {
                "id": "radio4",
                "name": "She didn't have any ultimate dream"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: " What was Tia trying to sell to Rahul in Kapoor & Sons?",
            model: "quest4",
            options: [{
                "id": "radio1",
                "name": "Her house",
                answer: true

            }, {
                "id": "radio2",
                "name": "Her car"


            }, {
                "id": "radio3",
                "name": "A restaurant"

            }, {
                "id": "radio4",
                "name": "Nothing"

            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: " What was Alia Bhatt's name in Shaandaar?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Aloo"
            }, {
                "id": "radio2",

                "name": "Aila"

            }, {
                "id": "radio3",
                "name": "Alia",
                answer: true
            }, {
                "id": "radio4",
                "name": "Alie"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "What is Kaira's profession in Dear Zindagi?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Director"
            }, {
                "id": "radio2",
                "name": "Cinematographer",
                answer: true
            }, {
                "id": "radio3",
                "name": "Editor"
            }, {
                "id": "radio4",
                "name": "Actor"

            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "Which song has Alia recreated in her voice from Badrinath Ki Dulhania?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Samjhawan"

            }, {
                "id": "radio2",
                "name": "Roke na ruke naina"

            }, {
                "id": "radio3",
                "name": "Humsafar",
                answer: true
            }, {
                "id": "radio4",
                "name": "Tamma Tamma Again"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: 'How old was Alia when she did Student of the year?"',
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "17"
            }, {
                "id": "radio2",
                "name": "18",
                answer: true
            }, {
                "id": "radio3",
                "name": "19"
            }, {
                "id": "radio4",
                "name": "20"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "Which animal does she have as a pet?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Dog"
            }, {
                "id": "radio2",
                "name": "Fish"
            }, {
                "id": "radio3",
                "name": "Cat",
                answer: true
            }, {
                "id": "radio4",
                "name": "Rabbit"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "What is the name of her recent movie where she is playing a girl from Kota?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Dear Zindagi"
            }, {
                "id": "radio2",
                "name": "Badrinath Ki Dulhania",
                answer: true
            }, {
                "id": "radio3",
                "name": "Kapoor & Sons"
            }, {
                "id": "radio4",
                "name": "She has never played such a role"
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
