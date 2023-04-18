const { input } = require("@tensorflow/tfjs");

var ratJSON = fs.readFileSync('rat.json', 'utf8', error)
var rat = Network.fromJSON(JSON.parse(ratJSON));
const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();
input = [1, 2, 3, 4, 1, 5, 6, 7, 8, 9];
ratFunction = rat.standalone();


function error(err, inputD) {
    if (err) throw err;
    return inputD;
}
function textToArray(text) { //takes a string and returns array without punc and translated
    text = text.replace(/[!?1234567890"'“.,”\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+\n/g, " ");
    array = text.split(' ');
    return array;
}
function roboTranslate(array, dictionary) { //takes an array full of words and returns an array full of dictionary number ==
    var roboText = []
    for (var i = 0; i < array.length; ++i) {
        for (var j = 0; j < dictionary.length; ++j) {
            if (array[i] == dictionary[j]) {
                roboText.push(j + 1);
            }
        }
    }

    for (var i = 0; i < roboText.length; ++i) {
        roboText[i] = (roboText[i] / 10000)
    }
    return roboText;
}
function humanTranslate(array, dictionary) { //takes an array full of locals in dictionary, returns string with ' ' between each element.
    var returnArray = [];
    var word;
    for (var i = 0; i < array.length; ++i) {
        word = dictionary[parseInt(array[i])]
        returnArray.push(word);
    }
    return returnArray.join(' ')
}
function createData(textArray, roboArray, dictionary) { //takes input of roboArray(local/library) and textArray (word,word,) returns 3d array containing [[0.x, 0.y],[0...1...0]]
    var trainingData = [{}];
    var j = 0;
    var temp = Array(dictionary.length).fill(0);
    var output = [];
    var nextWord;
    for (var i = 0; i < dictionary.length; ++i) {
        temp[i] = 0;
    }
    for (var i = 10; i < array.length; ++i) {
        temp = Array(dictionary.length).fill(0);
        temp[parseInt(dictionary.indexOf(textArray[i]))] = 1;
        output = [...temp];
        trainingData[j++] =
        { //
            input: [roboArray[i - 10], roboArray[i - 9], roboArray[i - 8], roboArray[i - 7], roboArray[i - 6], roboArray[i - 5], roboArray[i - 4], roboArray[i - 3], roboArray[i - 2], roboArray[i - 1]],
            output: output
        }
    }
    return trainingData;
}
function outputCreate(array, size, NN) { // takes input of array of 10 robotranslated words, returns text of size
    var outputArray = [...array];
    var nextRun;
    var nextWord = "";
    var lastWord;
    for (var i = 0; i < size; ++i) {
        nextRun = NN.activate(array);
        lastWord = nextWord;
        //console.log(nextRun);
        nextWord = nextRun.indexOf(threeMaxRand(nextRun));
        if (lastWord == nextWord) {
            nextWord = nextRun.indexOf(secondLargest(nextRun));
        }
        outputArray.push(nextWord);
        array.push(nextWord);
        array.shift();
    }
    return outputArray;
}
function trainNetwork(trainer, iHuman, beepBoop, dictionary, nn) {
    console.log('Dictionary length:', dictionary.length); //1300: 209, 1335: 232, 1511: 332, 1600: 451
    console.log('Array length:', arrayText.length);
    console.log('Estimated training time:', parseInt((((dictionary.length - 1300) / 100) * 80) + 209), "seconds,", parseInt((((dictionary.length - 1300) / 100) * 80) + 209) / 60, "minutes.");
    var trainingData = createData(iHuman, beepBoop, dictionary); //per 100 dictionary lengths add 80 seconds
    console.log(`Time: ${d.toLocaleTimeString()}`);
    console.log("Started training...");
    trainer.train(trainingData);
    console.log("...finished training.");
    var exported = nn.toJSON();
    fs.writeFile('rat.json', JSON.stringify(exported), 'utf8', error);
}
function runNetwork(list, length) {
    var outputRobo = outputCreate(list, length, rat);
    var outputText = humanTranslate(outputRobo, dictionary);
    return outputText;
}
function threeMaxRand(array) {
    var one, two, three;
    one = 0;
    two = 0;
    three = 0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] != 1) {
            if (array[i] > one) {
                three = two;
                two = one;
                one = array[i];
            }
            else if (array[i] > two) {
                three = two;
                two = array[i];
            }
            else if (array[i] > three) {
                three = array[i];
            }
        }
    }
    var output = [one, one, one, two, two, three];
    return output[Math.floor(Math.random() * 6)];
}
function secondLargest(array) {
    var max = 0.0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return ax;
}
function secondLargest(array) {
    var max = 0.0;
    var secondMax = 0.0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] > max && array[i] != 1) {
            secondMax = max;
            max = array[i];
        }
    }
    return secondMax;
}
function inputCreate(text, dictionary) {
    var array = text.split(' ');
    var returnArray = [];
    for (var i = 0; i < array.length; ++i) {
        returnArray.push(dictionary.indexOf(array[i]) + 1);
    }
    return returnArray;
}

var arrayText = textToArray(talks);

var dictionary = [...new Set(arrayText)];

function htmlRat() {
    document.getElementById("output").innerHTML = "bingus";
}