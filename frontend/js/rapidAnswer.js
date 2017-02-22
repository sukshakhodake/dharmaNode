var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Which superstar's name is taken in the teaser?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Aamir Khan"

            }, {
                "id": "radio2",
                "name": "Salman Khan"

            }, {
                "id": "radio3",
                "name": "Shahrukh Khan",
                answer: true
            }, {
                "id": "radio4",
                "name": "Sanjay Dutt"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "Which city is Badri from?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Lucknow"
            }, {
                "id": "radio2",
                "name": "Jaipur"
            }, {
                "id": "radio3",
                "name": "Kota"
            }, {
                "id": "radio4",
                "name": "Jhansi",
                answer: true
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: " What is more important than love for Vaidehi?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Career"
            }, {
                "id": "radio2",
                "name": "Respect",
                answer: true
            }, {
                "id": "radio3",
                "name": "Family"
            }, {
                "id": "radio4",
                "name": "Freedom"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "On the day of the teaser launch, what was Badri watching at night?",
            model: "quest4",
            options: [{
                "id": "radio1",
                "name": "#BadriKaTeaser"

            }, {
                "id": "radio2",
                "name": "#RoyalWedding"


            }, {
                "id": "radio3",
                "name": " #RoyalRumble",
                answer: true

            }, {
                "id": "radio4",
                "name": "#HumptySharmaKiDulhania"

            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Who has sung Humsafar?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Amaal Malik"
            }, {
                "id": "radio2",

                "name": "Arijit Singh"

            }, {
                "id": "radio3",
                "name": "Akhil Sachdeva",
                answer: true
            }, {
                "id": "radio4",
                "name": "Tanishk Bagchi "
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "Complete the lyrics - ___ bajaati hui Naagin?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Jean"
            }, {
                "id": "radio2",
                "name": "Been",
                answer: true
            }, {
                "id": "radio3",
                "name": "Trumpet"
            }, {
                "id": "radio4",
                "name": "Basuri"

            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "Complete the lyrics - ___ bana kar le jaayenge, Badri ki Dulhania!",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Dulhania"

            }, {
                "id": "radio2",
                "name": "Rani",
                answer: true

            }, {
                "id": "radio3",
                "name": "Vaidehi "
            }, {
                "id": "radio4",
                "name": "Dulha"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: 'Complete the dialogue - "____ se tumhaara door ka lena dena nahi hai!"',
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Izzat"
            }, {
                "id": "radio2",
                "name": "Pyaar"
            }, {
                "id": "radio3",
                "name": "Maryaada",
                answer: true
            }, {
                "id": "radio4",
                "name": "Faayda"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: " Which foreign destination have they shot in?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Malaysia"
            }, {
                "id": "radio2",
                "name": "Singapore",
                answer: true
            }, {
                "id": "radio3",
                "name": "New York"

            }, {
                "id": "radio4",
                "name": "L.A"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Which festival is Badrinath Ki Dulhania slated to release on?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Diwali"
            }, {
                "id": "radio2",
                "name": "Holi",
                answer: true
            }, {
                "id": "radio3",
                "name": "Eid"
            }, {
                "id": "radio4",
                "name": "Christmas"
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
