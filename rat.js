var synaptic = require('synaptic');
var fs = require('fs');
const { train } = require('@tensorflow/tfjs');
const { create } = require('domain');
const learningRate = 0.3;
const paul = fs.readFileSync('text/paulBorrego.txt', error).toString().toLowerCase();
//Rat time. 
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer
//RNN , Recurrent Neural Network 

function error(err, inputD) {
    if (err) throw err;
    return inputD;
}
function punc(text) { //splits up input text to have spaces between , and . also removes all excessive punctuation and returns an array of each 'word'
    var tail = 0;
    var head = 0;
    var returny = [];
    var j = 0;
    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case ';':
            case '?':
            case '(':
            case ')':
            case '"':
            case '“':
            case '”':
            case "'":
                text = text.substring(0, i) + text.substring(++i, text.length);
                break;
            case ' ':
                tail = head;
                head = i++;
                returny[j++] = text.substring(tail, head);
            case '.':
            case ',':
                tail = head;
                head = i;
                returny[j++] = text.substring(tail, head);

                break;
            default:
                break;
        }
    }
    return returny;
}
function dictionaryAdd(text) { //takes an array full of transfered words and returns list of each word present in list
    var dictionary = [];
    var u = 0;
    var exit = 0;
    for (var i = 0; i < text.length; ++i) {
        for (var j = 0; j < dictionary.length; ++j) {
            if (dictionary[j] == text[i]) {
                exit = 1;
            }
            if (exit == 1) break;
        }
        if (exit == 0) {
            dictionary[u++] = text[i];
        }
        exit = 0;
    }
    return dictionary;
}
function spaceDelete(text) { //takes an array and delets every space (just a brute force solution to a bug)
    var returnArray = [];
    var j = 0;
    for (var i = 0; i < text.length; ++i) {
        if (text[i] != ' ') {
            returnArray[j++] = text[i];
        }
    }
    return returnArray;
}
function roboTranslate(text, dictionary) { //takes an array full of words and returns an array full of dictionary number ==
    var roboText = []
    for (var i = 0; i < text.length; ++i) {
        for (var j = 0; j < dictionary.length; ++j) {
            if (dictionary[j] == text[i]) {
                roboText[i] = j;
                break;
            }
        }
    }
    return roboText;
}
function createData(text) { //takes input of robotranslated text array and returns 3d array containing [[5 words, next word],[...]]
    var trainingData = [{}];
    var j = 0;
    for (var i = 0; i < text.length; ++i) {
        if (i > 5) {
            trainingData[j++] =
            {
                input: [text[i - 5], text[i - 4], text[i - 3], text[i - 2], text[i - 1]],
                output: [text[i]]
            }
        }
    }
    return trainingData;
}


var dictionary = dictionaryAdd(punc(paul));

var beepBoopPaul = roboTranslate(spaceDelete(punc(paul)), dictionary);

console.log(createData(beepBoopPaul));

var inputLayer = new Layer(5);
var invisibleLayer0 = new Layer(20);
var invisibleLayer1 = new Layer(20);
var invisibleLayer2 = new Layer(20);
var outputLayer = new Layer(695);

inputLayer.project(invisibleLayer0, Layer.connectionType.ALL_TO_ALL);
invisibleLayer0.project(invisibleLayer1, Layer.connectionType.ALL_TO_ALL);
invisibleLayer1.project(invisibleLayer2, Layer.connectionType.ALL_TO_ALL);
invisibleLayer2.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

var paulOnlyRNN = new Network({
    input: inputLayer,
    hidden: [invisibleLayer0, invisibleLayer1, invisibleLayer2],
    output: outputLayer
})

var paulTraining = new Trainer(paulOnlyRNN)

var paulTrainingData = [];
