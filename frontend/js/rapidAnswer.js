var rapidAnswer = angular.module('rapidAnswer', [])

    .factory('RapidAnswer', function ($http) {


        var countTimer = 90;
        var questions = [{
            id: 1,
            quesNo: "Q1",
            question:"What was Amitabh Bachchan's name in Kabhi Khushi Kabhie Gham?",
            // question: "What was the surprise gift given by Rahul & Arjun to Dadu on his birthday?",
            model: "quest1",
            options: [{
                "id": "radio1",
                "name":"Yoginder Raichand"
                // "name": "Cut out of Manadakini",
            }, {
                "id": "radio2",
                "name":"Raghu Raichand"
                // "name": "Cut out of Zeenat Aman"

            }, {
                "id": "radio3",
                // "name": "Cut out of Sridevi"
                 "name":"Yashvardhan Raichand",
                 answer: true
            }, {
                "id": "radio4",
                "name":"Vardhan Raichand"
                // "name": "Cut out of Nargis"
            }]
        }, {
            id: 2,
            quesNo: "Q2",
            question:"In Kabhi Alvida Naa Kehna, Sam asks his son, Rishi to organise a party for which ocassion?",
            // question: "What was the Kapoor family's pet dog's name?",
            model: "quest2",
            options: [{
                "id": "radio1",
                "name": "His anniversary"
            }, {
                "id": "radio2",
                "name": "His birthday",
                answer: true 
            }, {
                "id": "radio3",
                "name": "His company's success"
            }, {
                "id": "radio4",
                "name": "His wife's birthday"
            }]
        }, {
            id: 3,
            quesNo: "Q3",
            question:"In Agneepath, Amitabh Bachchan as Vijay is out to kill who to avenge his father's death?",
            // question: "What was Rahul’s profession in the movie?",
            model: "quest3",
            options: [{
                "id": "radio1",
                "name": "Ganju"
            }, {
                "id": "radio2",
                "name": "Kancha", 
                answer: true
            }, {
                "id": "radio3",
                "name": "Kala"
            }, {
                "id": "radio4",
                "name": "Mandwa"
            }]
        }, {
            id: 4,
            quesNo: "Q4",
            question:"Who plays Amitabh Bachchan (Sam)'s real child in Kabhi Alvida Naa Kehna?",
            // question: "What was the name of Tia’s house helper in the movie?",
            model: "quest4",

            options: [{
                "id": "radio1",
                "name": "Shah Rukh Khan"
            }, {
                "id": "radio2",
                "name": "Abhishek Bachchan",
                answer: true
            }, {
                "id": "radio3",
                "name": "Rani Mukerji"
            }, {
                "id": "radio4",
                "name": "Preity Zinta"
            }]
        }, {
            id: 5,
            quesNo: "Q5",
            question:"Complete this famous dialogue - 'Keh diya na...'",
            // question: "Where did Arjun and Tia go for a date?",
            model: "quest5",
            options: [{
                "id": "radio1",
                "name": "Toh keh diya"
            }, {
                "id": "radio2",
                "name": "Vaapis nahi boloonga"
            }, {
                "id": "radio3",
                "name": "Bas, keh diya",
                answer: true
            }, {
                "id": "radio4",
                "name": "None of the above"
            }]
        }, {
            id: 6,
            quesNo: "Q6",
            // question: "Who was the person who witnessed the Kapoor showdown in their house while working?",
            question:"The original Agneepath was released in which year?",
            model: "quest6",
            options: [{
                "id": "radio1",
                "name": "1988"
            }, {
                "id": "radio2",
                "name": "1989"
            }, {
                "id": "radio3",
                "name": "1990",
                answer: true 
            }, {
                "id": "radio4",
                "name": "1991"
            }]
        }, {
            id: 7,
            quesNo: "Q7",
            question:"In Kabhi Khushi Kabhie Gham, what does Yashvardhan Raichand disapprove of?",
            // question: "What is Rajat Kapoor's name in the movie?",
            model: "quest7",
            options: [{
                "id": "radio1",
                "name": "The misbehaviour in his family"
            }, {
                "id": "radio2",
                "name": "Rahul and Anjali getting married",
                answer: true
            }, {
                "id": "radio3",
                "name": "Rahul and Naina getting married"
            }, {
                "id": "radio4",
                "name": "Rahul being adopted"
            }]
        }, {
            id: 8,
             quesNo: "Q8",
             question:"Amitabh Bachchan received a National Award for best actor for which of the following films?",
            // question: " What was the wildest thing Rahul had done in his life?",
            model: "quest8",
            options: [{
                "id": "radio1",
                "name": "Agneepath",
                answer: true
            }, {
                "id": "radio2",
                "name": "Kabhi Khushi Kabhie Gham",
            }, {
                "id": "radio3",
                "name": "Kabhi Alvida Naa Kehna"
            }, {
                "id": "radio4",
                "name": "None of the above"
            }]
        }, {
            id: 9,
            quesNo: "Q9",
               question:"Was Amitabh Bachchan in the new Agneepath (2012)?",
            // question: "Which song was played in the house party hosted by Tia?",
            model: "quest9",
            options: [{
                "id": "radio1",
                "name": "Yes"
            }, {
                "id": "radio2",
                "name": "No",
                answer: true
            }, {
                "id": "radio3",
                "name": "Yes, as a special appearance"
            }, {
                "id": "radio4",
                "name": "Maybe"
            }]
        }, {
            id: 10,
            quesNo: "Q10",
            question: "How many movies has Amitabh Bachchan done with the Dharma family?",
            model: "quest10",
            options: [{
                "id": "radio1",
                "name": "1"
            }, {
                "id": "radio2",
                "name": "2"
            }, {
                "id": "radio3",
                "name": "3"
            }, {
                "id": "radio4",
                "name": "4",
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
