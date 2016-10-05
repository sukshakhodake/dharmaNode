var rapidAnswer = angular.module('rapidAnswer', [])

.factory('RapidAnswer', function($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "aman",
            answer: true
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "When was SRK born?",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": "November",
            answer: true
        }, {
            "id": "radio2",
            "name": "January"
        }, {
            "id": "radio3",
            "name": "May"
        }, {
            "id": "radio4",
            "name": "December"
        }]
    }, {
        id: 3,
        quesNo: "Q3",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest3",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman",
            answer: true
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 4,
        quesNo: "Q4",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest4",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman",
            answer: true
        }]
    }, {
        id: 5,
        quesNo: "Q5",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest5",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman",
            answer: true
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 6,
        quesNo: "Q6",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest6",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman",
            answer: true
        }]
    }, {
        id: 7,
        quesNo: "Q7",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest7",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman",
            answer: true
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 8,
        quesNo: "Q8",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest8",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman",
            answer: true
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 9,
        quesNo: "Q9",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest9",
        options: [{
            "id": "radio1",
            "name": "aman"
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman",
            answer: true
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }, {
        id: 10,
        quesNo: "Q10",
        question: "What was SRK’s name in Kal Ho Na Ho?",
        model: "quest10",
        options: [{
            "id": "radio1",
            "name": "aman",
            answer: true
        }, {
            "id": "radio2",
            "name": "jaman"
        }, {
            "id": "radio3",
            "name": "raman"
        }, {
            "id": "radio4",
            "name": "daman"
        }]
    }];
var answered;

    return {

        changeTimerRapid: function() {
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
        getTotalTime: function() {
          return countTimer;
        },
        getQuestion: function(questionNo) {
            return questions[questionNo - 1];
        },
        lastAnswer: function() {
            return questions.length - 1;
        },
        saveAnswer: function(answer) {
            var answered;
            if($.jStorage.get("Answered")) {
               answered = $.jStorage.get("Answered");
            } else {
              answered = questions;
            }
            console.log(answer);
            var index = _.findIndex(answered, function(question) {
              return (question.id == answer.id);
            });
            console.log(index);
            answered[index] = answer;
            console.log(answered);
            $.jStorage.set("Answered",answered);
        },
        getScore: function() {
          var score;
          var arr = [];
          if($.jStorage.get("Answered")) {
             answered = $.jStorage.get("Answered");
             arr = _.map(answered,function(n) {
               return n.options;
             });
             arr = _.flattenDeep(arr);
             var correctAnswer = _.filter(arr,function(n) {
               return  (n.selected && n.answer);
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
