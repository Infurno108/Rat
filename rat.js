var synaptic = require('synaptic');
var fs = require('fs');
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
function createData(text, dictionary) { //takes input of robotranslated text array and returns 3d array containing [[5 words, next word],[...]]
    var trainingData = [{}];
    var j = 0;
    var output = [];
    for (var i = 0; i < text.length; ++i) {
        var output = [];
        if (i > 4) {
            for (var u = 0; u < dictionary.length; ++u) {
                if (u == i) {
                    output[u] = 1;
                }
                else {
                    output[u] = 0;
                }
            }
            trainingData[j++] =
            {
                input: [text[i - 5], text[i - 4], text[i - 3], text[i - 2], text[i - 1]],
                output: output
            }
        }
    }
    return trainingData;
}

var dictionary = dictionaryAdd(punc(paul));

var beepBoop = roboTranslate(spaceDelete(punc(paul)), dictionary);

var input = 5;
var blocks = 20;
var output = dictionary.length;
//layer init
var inputLayer = new Layer(input); //Input, for now will be first 5 words that extend each step
var inputGate = new Layer(blocks);
var forgetGate = new Layer(blocks); //Blocks TBD
var outputGate = new Layer(blocks);
var cellState = new Layer(blocks);
var outputLayer = new Layer(output); //output should be dictionary length

//stores the information from the projection to cell state for future use
var input = inputLayer.project(cellState);
//Input needs to be connected to input(self), forget, and output
inputLayer.project(inputGate);
inputLayer.project(forgetGate);
inputLayer.project(outputGate);
//Storing data that is sent to output, also connection to output layer
var output = cellState.project(outputLayer);
//cell  state self connects, RNNing it up
var self = cellState.project(cellState);

//"peep holes", just inputing data from cell state into each NN
cellState.project(inputGate);
cellState.project(forgetGate);
cellState.project(outputGate);

inputGate.gate(input, Layer.gateType.INPUT);
forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
outputGate.gate(output, Layer.gateType.OUTPUT);

inputLayer.project(outputLayer);

var rat = new Network({
    input: inputLayer,
    hidden: [inputGate, forgetGate, cellState, outputGate],
    output: outputLayer
})

var ratTraining = new Trainer(rat);

var trainingData = createData(beepBoop, dictionary);

ratTraining.train(trainingData);

//console.log(paulOnlyRNN.activate([0, 45, 7, 46, 5])); //47


var exported = rat.toJSON();

fs.writeFile('rat.json', JSON.stringify(exported), 'utf8', error);

var log = rat.activate([0, 45, 7, 46, 5]); //47
var max = 0;
var local = 0;
for (var i = 0; i < log.length; ++i) {
    if (log[i] > max) {
        max = log[i];
        local = i;
    }
    console.log(log[i]);
    console.log(i);
    console.log('////////');
    console.log(local);
}



