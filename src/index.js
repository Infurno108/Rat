var synaptic = require('synaptic');
var Network = synaptic.Network;

const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();

var ratImport = fs.readFileSync('rat.json', 'utf8', error)
var ratImported = Network.fromJSON(JSON.parse(ratImport));

var rat = ratImported.standalone();

var arrayAll = textToArray(talks);
var dictionary = [...new Set(arrayAll)];
var entry = [1, 2, 3, 4, 1];

//document.getElementById("output").textContent = temp;

function runNetwork(length, list) {
    document.getElementById("output").textContent = "Generating text...";
    //var outputRobo = outputCreate(list, length, rat);
    //var outputText = humanTranslate(outputRobo, dictionary);
    //return outputText;
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
function outputCreate(array, size, NN) { // takes input of array of 10 robotranslated words, returns text of size
    var outputArray = [...array];
    var nextRun;
    var nextWord = "";
    var lastWord;
    var dingi = 0;
    var bap = 0;
    for (var i = 0; i < size; ++i) {
        nextRun = NN.activate(array);
        lastWord = nextWord;
        bap = threeMaxRand(nextRun);
        console.log(bap);
        nextWord = nextRun.indexOf(bap);
        if (bap == 1) {
            ++dingi;
        }
        if (lastWord == nextWord) {
            nextWord = nextRun.indexOf(secondLargest(nextRun));
        }
        outputArray.push(nextWord);
        array.push(nextWord);
        array.shift();
    }
    console.log(dingi);
    return outputArray;
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
    var secondMax = 0.0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] > max && array[i] != 1) {
            secondMax = max;
            max = array[i];
        }
    }
    return secondMax;
}
function textToArray(text) { //takes a string and returns array without punc and translated
    text = text.replace(/[!?1234567890"'“,”\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+\n/g, " ");
    array = text.split(' ');
    return array;
}
