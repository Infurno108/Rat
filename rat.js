var synaptic = require('synaptic');
var fs = require('fs');
var math = require('mathjs');
const learningRate = 0.3;
const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();
const d = new Date();
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
function textToArray(text) { //takes a string and returns array without punc and translated
    text = text.replace(/[!?"'“.,”\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    array = text.split(' ');
    return array;
}
function roboTranslate(array, dictionary) { //takes an array full of words and returns an array full of dictionary number ==
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
function humanTranslate(array, dictionary) { //takes an array full of locals in dictionary, returns string with ' ' between each element.
    var returnArray = [];
    for (var i = 0; i < array.length; ++i) {
        returnArray.push(dictionary[parseInt(array[i])]);
    }
    return returnArray.join(' ')
}
function createData(array, dictionary) { //takes input of robotranslated array and returns 3d array containing [[5 words, next word],[...]]
    var trainingData = [{}];
    var j = 0;
    var temp = Array(dictionary.length).fill(0);
    var output = [];
    for (var i = 0; i < dictionary.length; ++i) {
        temp[i] = 0;
    }
    for (var i = 10; i < array.length; ++i) {
        temp[parseInt(array[i - 1])] = 0;
        temp[parseInt(array[i])] = 1;
        output = [...temp];
        trainingData[j++] =
        {
            input: [array[i - 10], array[i - 9], array[i - 8], array[i - 7], array[i - 6], array[i - 5], array[i - 4], array[i - 3], array[i - 2], array[i - 1]],
            output: output

        }
    }
    return trainingData;
}
function outputCreate(array, size, NN) { // takes input of array of 10 robotranslated words, returns text of size
    var outputArray = [...array];
    var nextRun;
    var nextWord;
    for (var i = 0; i < size; ++i) {
        nextRun = NN.activate(array);
        nextWord = nextRun.indexOf(math.max(nextRun))
        outputArray.push(nextWord);
        array.push(nextWord);
        array.shift();
    }
    return outputArray;
}
function trainNetwork(trainer, data, dictionary, nn) {
    var trainingData = createData(beepBoop, dictionary);
    console.log(`Started at: ${d.toLocaleTimeString()}`);
    console.log("Started training...");
    trainer.train(trainingData);
    console.log("...finished training.");
    var exported = nn.toJSON();
    fs.writeFile('rat.json', JSON.stringify(exported), 'utf8', error);
}
function runNetwork(list, length) {
    var ratImport = fs.readFileSync('rat.json', 'utf8', error)
    var ratImported = Network.fromJSON(JSON.parse(ratImport));
    console.log('Generating text...');
    var outputRobo = outputCreate(list0, 200, ratImported);
    var outputText = humanTranslate(outputRobo, dictionary);
    return outputText;
}

var arrayText = textToArray(talks);

var dictionary = [...new Set(arrayText)];

//console.log(humaTranslate(['i', 'am', 'an', 'optimist.', 'i', 'like', 'to', 'look', 'on', 'the'], dictionary))
console.log("Constructing NN...");
var input = 10;
var blocks = 10;
var output = (dictionary.length - 1);
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

var ratTraining = new Trainer(rat, {
    learningRate: .1,
    iterations: 20000,
    log: 1000,
    schedule: {
        every: 10,
        do: function (data) {
            console.log('Hi Flint, here is the iteration we are at: ', data.iterations, 'Oh yeah here is the rate as well: ', data.rate);
        }
    }
});

console.log("...NN constructed.");

var beepBoop = roboTranslate(arrayText, dictionary);

trainNetwork(ratTraining, beepBoop, dictionary, rat);

var list0 = [0, 1, 2, 3, 0, 4, 5, 6, 7, 8];
var list1 = [875, 36, 876, 30, 11, 70, 533, 877,];

console.log(runNetwork(list0, 200));


