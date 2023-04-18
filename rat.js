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
    text = text.replace(/[!?1234567890"'“,”\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+\n/g, " ");
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
    var capital = 0;
    for (var i = 0; i < array.length; ++i) {
        word = dictionary[parseInt(array[i])]
        if (capital = 1) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
            capital = 0;
        }
        returnArray.push(word);
        if (array[i].at(-1) == '.') {
            capital = 1;
        }
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
    var ratImport = fs.readFileSync('rat.json', 'utf8', error)
    var ratImported = Network.fromJSON(JSON.parse(ratImport));
    console.log('Generating text...');
    var outputRobo = outputCreate(list, length, ratImported);
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

var beepBoop = roboTranslate(array, dictionary)

//console.log(humaTranslate(['i', 'am', 'an', 'optimist.', 'i', 'like', 'to', 'look', 'on', 'the'], dictionary))
console.log("Constructing NN...");
var input = 5;
var blocks = 18; //16 + (diclength - 677)/300
var output = (dictionary.length - 1);
//layer init
var inputLayer = new Layer(input); //Input, for now will be first 5 words that extend each step
var inputGate = new Layer(blocks);
var forgetGate = new Layer(blocks); //Blocks TBD
forgetGate.squash = Neuron.squash.TANH;
var outputGate = new Layer(blocks);
outputGate.squash = Neuron.squash.TANH;
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
/*
cellState.project(inputGate);
cellState.project(forgetGate);
cellState.project(outputGate);
*/

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
    learningRate: .3,
    iterations: 20000,
    log: 1000,
    shuffle: true,
    error: 0.9999,
    schedule: {
        every: 10,
        do: function (data) {
            console.log('Hi Flint, here is the iteration we are at: ', data.iterations, 'Oh yeah here is the rate as well: ', data.rate);
        }
    }
});
console.log("...NN constructed.");

var beepBoop = roboTranslate(arrayText, dictionary);

trainNetwork(ratTraining, arrayText, beepBoop, dictionary, rat);

var list0 = [1, 2, 3, 4, 1];
var list = inputCreate('i am an optimist. i ', dictionary);

//console.log(runNetwork(list, 200));

//per 136 on array add 10 seconds of training

//315 seconds 4816
//