var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "Alia Bhatt sang the unplugged version of which of the following songs?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Tamma Tamma"
            }, {
                "id": "radio2",
                "name": "Roke Na Roke Naina"
            }, {
                "id": "radio3",
                "name": "Kar Gayi Chull"
            }, {
                "id": "radio4",
                "name": "Samjhawan",
                answer: true
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "How many Dharma Production movies has Alia been a part of?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Chef"
            }, {
                "id": "radio2",
                "name": "Fashion Stylist"
            }, {
                "id": "radio3",
                "name": "Cinematographer",
                answer: true
            }, {
                "id": "radio4",
                "name": "Photographer"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "How many Dharma Production movies has Alia been a part of?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "7",
                answer: true
            }, {
                "id": "radio2",
                "name": "5"
            }, {
                "id": "radio3",
                "name": "11"
            }, {
                "id": "radio4",
                "name": "9"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "She has more than one  ___ as a pet.",
            model: "quest4",

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
            id: 5,
            quesNo: "Q5",
            question: "In Humpty Sharma ki Dulhania, Kavya wishes to purchase a wedding dress similar to which actress’s outfit?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Deepika Padukone"
            }, {
                "id": "radio2",
                "name": "Sridevi"
            }, {
                "id": "radio3",
                "name": "Madhuri Dixit"
            }, {
                "id": "radio4",
                "name": "Kareena Kapoor",
                answer: true
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "In which 90s movie did Alia make her debut as a child artist?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Masoom"
            }, {
                "id": "radio2",
                "name": "Hathi Mere Sathi"
            }, {
                "id": "radio3",
                "name": "Kuch Kuch Hota Hai"
            }, {
                "id": "radio4",
                "name": "Sangharsh",
                answer: true
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "‘What subject does Ananya Swaminathan top the class in, before pursuing her MBA in ‘2 States’?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "History"
            }, {
                "id": "radio2",
                "name": "Economics",
                answer: true
            }, {
                "id": "radio3",
                "name": "Literature"
            }, {
                "id": "radio4",
                "name": "Psychology"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "What nickname is Alia’s character referred to by her family and friends in ‘Dear Zindagi’?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Cola"
            }, {
                "id": "radio2",
                "name": "Kaira"
            }, {
                "id": "radio3",
                "name": "Coco",
                answer: true
            }, {
                "id": "radio4",
                "name": "Chiku"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "At what age did Alia star in Student of The Year?",
            model: "quest9",
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
            id: 10,
            quesNo: "Q10",
            question: "Which movie will mark Alia's 8th venture with Dharma Productions?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Brahmastra"
            }, {
                "id": "radio2",
                "name": "Dhadak"
            }, {
                "id": "radio3",
                "name": "Raazi",
                answer: true
            }, {
                "id": "radio4",
                "name": "Drive"
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
