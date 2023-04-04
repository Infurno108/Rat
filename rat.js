var synaptic = require('synaptic');
var fs = require('fs');
const { train } = require('@tensorflow/tfjs');
const learningRate = 0.3;
const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();
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
function dictionaryTotal(text) {
    var array = text.split(' ');
    var returnArray = [];
    var present = 0;
    for (var i = 2; i < array.length; ++i) {
        array[i] = array[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    }
    array.unshift('.');
    array.unshift(',');
    for (var i = 0; i < array.length; ++i) {
        for (var j = 0; j < returnArray.length; ++j) {
            if (array[i] == returnArray[j]) {
                present = 1;
            }
        }
        if (present == 0) {
            returnArray.push(array[i]);
        }
        present = 0;
    }
    return returnArray;
}
function textToArray(text) {
    array = text.split(' '); //This, is, an, example., Alright,, lets, do, this.,
    var temp;
    for (var i = 0; i < array.length; ++i) {
        temp = array[i].at(-1);
        if (temp == ',') {
            array[i] = array[i].substring(0, array[i].length - 1);
            array.splice(i + 1, 0, ',');
            ++i;
        }
        else if (temp == '.') {
            array[i] = array[i].substring(0, array[i].length - 1);
            array.splice(i + 1, 0, '.');
            ++i;
        }
    }
    for (var i = 0; i < array.length; ++i) {
        array[i] = array[i].replace(/["'“”\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    }
    return array;
}
function roboTranslate(text, dictionary) { //takes an array full of words and returns an array full of dictionary number ==
    var roboText = []
    for (var i = 0; i < array.length; ++i) {
        for (var j = 0; j < dictionary.length; ++j) {
            if (array[i] == dictionary[j]) {
                roboText.push(j);
            }
        }
    }
    return roboText;
}
function humaTranslate(text, dictionary) {
    var returnString = '';
    for (var i = 0; i < text.length; ++i) {
        returnString = returnString + ' ' + dictionary[text[i]];
    }
    return returnString;
}
function createData(text, dictionary) { //takes input of robotranslated text array and returns 3d array containing [[5 words, next word],[...]]
    var trainingData = [{}];
    var j = 0;
    var temp = [];
    var output = [];
    for (var i = 0; i < dictionary.length; ++i) {
        temp[i] = 0;
    }
    for (var i = 5; i < text.length; ++i) {
        temp[parseInt(text[i - 1])] = 0;
        temp[parseInt(text[i])] = 1;
        output = [...temp];
        trainingData[j++] =
        {
            input: [text[i - 5], text[i - 4], text[i - 3], text[i - 2], text[i - 1]],
            output: output
        }
    }
    return trainingData;
}

var dictionary = dictionaryTotal(talks);

var beepBoop = roboTranslate(textToArray(talks), dictionary);

//var beepBoop = roboTranslate(talks, dictionary);
var input = 5;
var blocks = 7;
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

var exported = rat.toJSON();

fs.writeFile('rat.json', JSON.stringify(exported), 'utf8', error);
/*
const ratImport = fs.readFileSync('rat.json', 'utf8', error)

var ratImported = Network.fromJSON(JSON.parse(ratImport));

var log = ratImported.activate([0, 45, 7, 46, 5]); //47

var max = 0;
var local = 0;
console.log(dictionary.length);
var list = [1100, 1430, 13, 32, 5];
var output;
var roboList = [1100, 1430, 13, 32, 5];

for (var i = 0; i < 20; ++i) {
    var max = 0;
    var local = 0;
    output = ratImported.activate(list);
    for (var j = 0; j < dictionary.length; ++j) {
        if (output[j] > max) {
            local = j;
            max = output[j];
        }
    }
    list[0] = list[1];
    list[1] = list[2];
    list[2] = list[3];
    list[3] = list[4];
    list[4] = local;
    roboList.push(local);
}
console.log(humaTranslate(roboList, dictionary));
*/