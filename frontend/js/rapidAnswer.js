var rapidAnswer = angular.module('rapidAnswer', [])

.factory('RapidAnswer', function ($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "What was the catch phrase that Adi & Tara believed in, in OK Jaanu?",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "Kal kar lenge"
        }, {
            "id": "radio2",
            "name": "Kyun karna hai?"
        }, {
            "id": "radio3",
            "name": "Figure out kar lenge",
            answer: true
        }, {
            "id": "radio4",
            "name": "Figure kyun karna hai?"
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "Who told Kattapa to kill Baahubali?",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": "Avantika"
        }, {
            "id": "radio2",
            "name": "Raj Mata Sivagami",
            answer: true
        }, {
            "id": "radio3",
            "name": "Devasena"
        }, {
            "id": "radio4",
            "name": "Bijjaladeva"
        }]
    }, {
        id: 3,
        quesNo: "Q3",
        question: "Which shop did Anjali have in Delhi?",
        model: "quest3",
        options: [{
            "id": "radio1",
            "name": "Humpty"
        }, {
            "id": "radio2",
            "name": "Badri",
            answer: true
        }, {
            "id": "radio3",
            "name": "Rohan"
        }, {
            "id": "radio4",
            "name": "None of the above"
        }]
    }, {
        id: 4,
        quesNo: "Q4",
        question: "Which A.R. Rahman song was recreated in OK Jaanu that bagged the song of the year on iTunes?",
        model: "quest4",

        options: [{
            "id": "radio1",
            "name": "The Humma Song",
            answer: true
        }, {
            "id": "radio2",
            "name": "Tamma Tamma Again"
        }, {
            "id": "radio3",
            "name": "Samjhawan"
        }, {
            "id": "radio4",
            "name": "None of the above"
        }]
    }, {
        id: 5,
        quesNo: "Q5",
        question: "What was Alia's profession in the movie, Badrinath Ki Dulhania?",
        model: "quest5",
        options: [{
            "id": "radio1",
            "name": "Air Hostess",
            answer: true
        }, {
            "id": "radio2",
            "name": "Bartender"
        }, {
            "id": "radio3",
            "name": "Photographer"
        }, {
            "id": "radio4",
            "name": "Doctor"
        }]
    }, {
        id: 6,
        quesNo: "Q6",
        question: "Which city was OK Jaanu shot in?",
        model: "quest6",
        options: [{
            "id": "radio1",
            "name": "Mumbai",
            answer: true
        }, {
            "id": "radio2",
            "name": "Delhi"
        }, {
            "id": "radio3",
            "name": "Ahmedabad"
        }, {
            "id": "radio4",
            "name": "None"
        }]
    }, {
        id: 7,
        quesNo: "Q7",
        question: "Complete the dialogue: Tumhari mansik sthithi aaj thodi gadbad lag rahi hai ...",
        model: "quest7",
        options: [{
            "id": "radio1",
            "name": "Hum kabhi nahi aayenge"
        }, {
            "id": "radio2",
            "name": "Dimag ka ilaj karao"
        }, {
            "id": "radio3",
            "name": "Hum kal phir aayenge",
            answer: true
        }, {
            "id": "radio4",
            "name": "Tumhe pagal khaane mein jaana chahiye"
        }]
    }, {
        id: 8,
        quesNo: "Q8",
        question: "Which war was The Ghazi Attack based on?",
        model: "quest8",
        options: [{
            "id": "radio1",
            "name": "1857 war"
        }, {
            "id": "radio2",
            "name": "1905 war"
        }, {
            "id": "radio3",
            "name": "1971 war",
            answer: true
        }, {
            "id": "radio4",
            "name": "1947 war"
        }]
    }, {
        id: 9,
        quesNo: "Q9",
        question: "Which song amongst these was reprised in the movie, Ittefaq?",
        model: "quest9",
        options: [{
            "id": "radio1",
            "name": "Tamma Tamma"
        }, {
            "id": "radio2",
            "name": "Raat Baaki",
            answer: true
        }, {
            "id": "radio3",
            "name": "Humma Humma"
        }, {
            "id": "radio4",
            "name": "Disco Dancer"
        }]
    }, {
        id: 10,
        quesNo: "Q10",
        question: "The character played by Prabhas in Baahubali 2 was ____?",
        model: "quest10",
        options: [{
            "id": "radio1",
            "name": "Amarendra Baahubali"
        }, {
            "id": "radio2",
            "name": "Mahendra Baahubali"
        }, {
            "id": "radio3",
            "name": "Both",
            answer: true
        }, {
            "id": "radio4",
            "name": "None"
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
