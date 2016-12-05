var rapidAnswer = angular.module('rapidAnswer', [])

.factory('RapidAnswer', function($http) {


    var countTimer = 90;
    var questions = [{
        id: 1,
        quesNo: "Q1",
        question: "Which was Ranbir Kapoor's first movie with Dharma Productions?",
        model: "quest1",
        options: [{
            "id": "radio1",
            "name": "Ae Dil Hai Mushkil"

        }, {
            "id": "radio2",
            "name": "Wake Up Sid",
              answer: true
        }, {
            "id": "radio3",
            "name": "Yeh Jawaani Hai Deewani"
        }, {
            "id": "radio4",
            "name": "I Hate Luv Story's "
        }]
    }, {
        id: 2,
        quesNo: "Q2",
        question: "What was Ranbir's screen name in the movie Wake Up Sid?",
        model: "quest2",
        options: [{
            "id": "radio1",
            "name": "Siddharth Mehra",
            answer: true
        }, {
            "id": "radio2",
            "name": "Siddharth Malhotra"
        }, {
            "id": "radio3",
            "name": "Siddharth Dewan"
        }, {
            "id": "radio4",
            "name": "Siddharth Sinha"
        }]
    }, {
        id: 3,
        quesNo: "Q3",
        question: "Who played Ranbir's father in the movie Yeh Jawaani Hai Deewani?",
        model: "quest3",
        options: [{
            "id": "radio1",
            "name": "Rishi Kapoor"
        }, {
            "id": "radio2",
            "name": "Anupam Kher"
        }, {
            "id": "radio3",
            "name": "Farooq Sheikh",
            answer: true
        }, {
            "id": "radio4",
            "name": "Javed Sheikh"
        }]
    }, {
        id: 4,
        quesNo: "Q4",
        question: "Complete the line...'Balam Pichkari Jo Tune Mujhe Maari........'",
        model: "quest4",
        options: [{
            "id": "radio1",
            "name": "To Seedhi Saadhi Larki Deewani Ho Gayi"
        }, {
            "id": "radio2",
            "name": "To Bholi Bhaali Ladki Sharaabi Ho Gayi"
        }, {
            "id": "radio3",
            "name": "To Bhabhi Meri Bilkul Deewani Ho Gayi"
        }, {
            "id": "radio4",
            "name": "To Seedhi Saadhi Chhori Sharaabi Ho Gayi",
            answer: true
        }]
    }, {
        id: 5,
        quesNo: "Q5",
        question: " Which destination does Alizeh take Avan to after his heart-break with Lisa?",
        model: "quest5",
        options: [{
            "id": "radio1",
            "name": "Vienna"
        }, {
            "id": "radio2",
            "name": "London"

        }, {
            "id": "radio3",
            "name": "New York"
        }, {
            "id": "radio4",
            "name": "Paris",
              answer: true
        }]
    }, {
        id: 6,
        quesNo: "Q6",
        question: "Complete this famous dialogue from the movie Yeh Jawaani Hai Deewani ; Tum samajhte kyun nahi Bunny..agar mein tumhare saath do minute aur rahi..........'",
        model: "quest6",
        options: [{
            "id": "radio1",
            "name": "To meri train miss ho jaayegi"
        }, {
            "id": "radio2",
            "name": "To mein fir se ro padungi"
        }, {
            "id": "radio3",
            "name": "To mujhe tumse pyaar ho jaayega...phir se",
              answer: true
        }, {
            "id": "radio4",
            "name": "To mein tumse fir kabhi nahi mil paungi"

        }]
    }, {
        id: 7,
        quesNo: "Q7",
        question: "Who plays Ranbir's mother in the movie Wake Up Sid?",
        model: "quest7",
        options: [{
            "id": "radio1",
            "name": "Ratna Pathak"
        }, {
            "id": "radio2",
            "name": "Dolly Ahluwalia"

        }, {
            "id": "radio3",
            "name": "Supriya Pathak",
              answer: true
        }, {
            "id": "radio4",
            "name": "Tanvi Azmi"
        }]
    }, {
        id: 8,
        quesNo: "Q8",
        question: "Where does Sid work as an intern in Wake Up Sid?",
        model: "quest8",
        options: [{
            "id": "radio1",
            "name": "Mumbai Magic"
        }, {
            "id": "radio2",
            "name": "Mumbai Beat",
            answer: true
        }, {
            "id": "radio3",
            "name": "Bombay Beat"
        }, {
            "id": "radio4",
            "name": "Mumbai Treat"
        }]
    }, {
        id: 9,
        quesNo: "Q9",
        question: "Who was Ranbir’s neighbour in Wake Up Sid?",
        model: "quest9",
        options: [{
            "id": "radio1",
            "name": "Rakhi Sawant"
        }, {
            "id": "radio2",
            "name": "Kashmira Shah",
            answer: true
        }, {
            "id": "radio3",
            "name": "Shefali Zariwala"

        }, {
            "id": "Shefali Shah",
            "name": "daman"
        }]
    }, {
        id: 10,
        quesNo: "Q10",
        question: "Who is the lyric writer of Ae Dil Hai Mushkil?",
        model: "quest10",
        options: [{
            "id": "radio1",
            "name": "Javed Akhtar"

        }, {
            "id": "radio2",
            "name": "Niranjan Iyengar"
        }, {
            "id": "radio3",
            "name": "Amitabh Bhattacharya",
              answer: true
        }, {
            "id": "radio4",
            "name": "Gulzar"
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
