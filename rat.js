var synaptic = require('synaptic');
var fs = require('fs');
var math = require('mathjs');
const learningRate = 0.3;
const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();
const allTalks = fs.readFileSync('text/allTalks.txt', error).toString().toLowerCase();
const d = new Date();
//Rat time. 
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect
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
    for (var i = 10; i < textArray.length; ++i) {
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
function outputCreate(array, size, NN, dictionaryLength) { // takes input of array of 10 robotranslated words, returns text of size
    var outputArray = [...array];
    var nextRun;
    var nextWord = "";
    var lastWord;
    var totalDingus = 0;
    for (var i = 0; i < size; ++i) {
        nextRun = NN.activate(array);
        lastWord = nextWord;
        dingus = 0;
        console.log(nextRun);
        for (var j = 0; j < nextRun.length; ++j) {
            if (nextRun[j] == 1) {
                ++totalDingus;
            }
        }
        nextWord = nextRun.indexOf(threeMaxRand(nextRun));
        if (lastWord == nextWord) {
            nextWord = nextRun[Math.floor(Math.random() * dictionaryLength)];
        }
        outputArray.push(nextWord);
        array.push(nextWord);
        array.shift();
    }
    console.log("You totally encountered:", totalDingus, "dinguses");
    return outputArray;
}
function trainNetwork(trainer, iHuman, beepBoop, dictionary, nn) {

    console.log('Estimated training time:', parseInt((((arrayText.length - 4816) / 136) * 10) + 315), "seconds,", parseInt(((((arrayText.length - 4816) / 136) * 10) + 315) / 60), "minutes.");
    var trainingData = createData(iHuman, beepBoop, dictionary);
    console.log(`Time: ${d.toLocaleTimeString()}`);
    console.log("Started training...");
    trainer.train(trainingData);
    var exported = nn.toJSON();
    fs.writeFile('rat.json', JSON.stringify(exported), 'utf8', error);
    console.log("...finished training.");
}
function runNetwork(list, length, dictionaryLength) {
    var ratImport = fs.readFileSync('rat.json', 'utf8', error)
    var ratImported = Network.fromJSON(JSON.parse(ratImport));
    console.log('Generating text...');
    var outputRobo = outputCreate(list, length, ratImported, dictionaryLength);
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
    var output = [one, one, one, two, two, three, array[Math.floor(Math.random() * array.length)]];
    return output[Math.floor(Math.random() * 7)];
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
var arrayAll = textToArray(allTalks);

var dictionary = [...new Set(arrayAll)];

var dictionary = [...new Set(array)];

var beepBoop = roboTranslate(arrayText, dictionary)

console.log('Dictionary length:', dictionary.length);
console.log('Array length:', arrayText.length);

//console.log(humaTranslate(['i', 'am', 'an', 'optimist.', 'i', 'like', 'to', 'look', 'on', 'the'], dictionary))
/*
console.log("Constructing NN...");
var input = 10;
var blocks = 50; //16 + (diclength - 677)/300
var output = (dictionary.length - 1);

//layer init 
var inputLayer = new Layer(input); //Input, for now will be first 5 words that extend each step
var cellState = new Layer(blocks);
var hiddenLayer0 = new Layer(blocks);
var hiddenLayer1 = new Layer(blocks);
var outputLayer = new Layer(output); //output should be dictionary length

//stores the information from the projection to cell state for future use
inputLayer.project(cellState);
inputLayer.project(hiddenLayer0);
inputLayer.project(hiddenLayer1);

//Storing data that is sent to output, also connection to output layer
cellState.project(outputLayer);
//cell  state self connects, RNNing it up
cellState.project(cellState);

hiddenLayer0.project(outputLayer);
hiddenLayer1.project(outputLayer);


var rat = new Network({
    input: inputLayer,
    hidden: [cellState, hiddenLayer0, hiddenLayer1],
    output: outputLayer
})
/*
var ratImport = fs.readFileSync('rat.json', 'utf8', error)
var ratImported = Network.fromJSON(JSON.parse(ratImport));
rat = ratImported;


var ratTraining = new Trainer(rat, {
    rate: .3
});
console.log("...NN constructed.");

var beepBoop = roboTranslate(arrayText, dictionary);
*/
//trainNetwork(ratTraining, arrayText, beepBoop, dictionary, rat);

var list = inputCreate('throughout my life i have been given many different names. ', dictionary);

console.log(runNetwork(list, 200, dictionary.length));

//per 136 on array add 10 seconds of training

//315 seconds 4816
//


//62255 dingi @.1 error .3 LR
//70625 dingi @.5 error .3 LR
