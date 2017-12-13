var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question: "What does P.H.A.T stand for in the movie?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name": "Pampered, honest and tempered"
            }, {
                "id": "radio2",
                "name": "Pretty, hot and tempting",
                answer: true
            }, {
                "id": "radio3",
                "name": "Popular, honest and tempting"
            }, {
                "id": "radio4",
                "name": "Poise, humble and tempting"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question: "Which name did Rohan take to stay in Rahul's house?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "Yash",
                answer: true
            }, {
                "id": "radio2",
                "name": "Karan"
            }, {
                "id": "radio3",
                "name": "Ayan"
            }, {
                "id": "radio4",
                "name": "Raj"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question: "Which shop did Anjali have in Delhi?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Halwai ki dukaan",
                answer: true
            }, {
                "id": "radio2",
                "name": "Kapde ki dukaan"
            }, {
                "id": "radio3",
                "name": "Shoe showroom"
            }, {
                "id": "radio4",
                "name": "Kachori ki dukaan"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question: "Who did Kajol think Shah Rukh was when she met him the first time?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Ashram Miyan"
            }, {
                "id": "radio2",
                "name": "Ashraf Miyan"
            }, {
                "id": "radio3",
                "name":"Ashfaq Miyan",
                answer: true
            }, {
                "id": "radio4",
                "name": "Asif Khan"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question: "Which famous SRK-Kajol dialogue did they recreate in this movie?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "I don't like jokes. I don't like you.",
                answer: true
            }, {
                "id": "radio2",
                "name": "Kuch kuch hota Hai Anjali, tum nahi samjhogi."
            }, {
                "id": "radio3",
                "name": "Bade bade deshon mein aisi choti choti baatein hoti rehti hain."
            }, {
                "id": "radio4",
                "name": "Rahul is a cheater!"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            question: "What song does Yashvardhan Raichand sing to his wife on his birthday?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "Tu cheez badi hai mast"
            }, {
                "id": "radio2",
                "name": "Teri Bindiya Re"
            }, {
                "id": "radio3",
                "name": "Ae Kya Bolti Tu",
                answer: true
            }, {
                "id": "radio4",
                "name": "Aye meri Zohra Jabeen"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question: "What fashion disaster did Rohan point out when he saw Poo in her prom outfit?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "Messy hair"
            }, {
                "id": "radio2",
                "name": "Wearing mismatched shoes",
                answer: true
            }, {
                "id": "radio3",
                "name": "Make up"
            }, {
                "id": "radio4",
                "name": "Wearing bell bottoms"
            }]
        }, {
            id: 8,
            quesNo: "Q8",
            question: "Which actress played the role of the girl Rahul is initially supposed to get married to?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Juhi Chawla"
            }, {
                "id": "radio2",
                "name": "Rani Mukerji",
                answer: true
            }, {
                "id": "radio3",
                "name": "Preity Zinta"
            }, {
                "id": "radio4",
                "name": "Kajol"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
            question: "Which city did Rohan go to, to hunt for Rahul and Anjali and bring them back?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "New York"
            }, {
                "id": "radio2",
                "name": "Toronto"
            }, {
                "id": "radio3",
                "name": "London",
                answer: true
            }, {
                "id": "radio4",
                "name": "Paris"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "Complete the dialogue: Paisa toh har koi kama leta hai, ______________",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "Lekin woh samhal ke rakhna sabke bas ki baat nahi"
            }, {
                "id": "radio2",
                "name": "Har kisi ko paise ki value samjh mein nahi ati"
            }, {
                "id": "radio3",
                "name": "Lekin log apne aap ko kho dete hai"
            }, {
                "id": "radio4",
                "name": "Lekin izzat kamaana sabke bas ki baat nahi",
                answer: true
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
