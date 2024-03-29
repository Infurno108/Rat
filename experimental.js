
var fs = require('fs');

const talks = fs.readFileSync('text/talks.txt', error).toString().toLowerCase();

function error(err, inputD) {
    if (err) throw err;
    return inputD;
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

console.log(textToArray(talks));



/*


var synaptic = require('synaptic')//here we go
var fs = require('fs');
var jsonFile = require('jsonfile');
const learningRate = 0.3

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var inputLayer = new Layer(2);
var invisibleLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(invisibleLayer, Layer.connectionType.ALL_TO_ALL); //This projects all neurons in layer A to layer B
invisibleLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

var XOR = new Network({ //even thought it is declared a net, you have to project everything yourself
    input: inputLayer,
    hidden: [invisibleLayer],
    output: outputLayer
});
7
var xorTrainer = new Trainer(XOR);

var trainingSet = [
    {
        input: [0, 0],
        output: [0]
    },
    {
        input: [0, 1],
        output: [1]
    },
    {
        input: [1, 0],
        output: [1]
    },
    {
        input: [1, 1],
        output: [0]
    },
]

function error(err, inputD) {
    if (err) throw err;
    return inputD;
}

//xorTrainer.train(trainingSet);

var exported = XOR.toJSON();

fs.writeFile('experimental.json', JSON.stringify(exported), 'utf8', error);

//var imported = Network.fromJSON(exported);
const aaaa = fs.readFileSync('experimental.json', 'utf8', error)

var imported = Network.fromJSON(JSON.parse(aaaa));

var inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
var outputs = [[0], [1], [1], [0]]; // 0 1 1 0 

for (var j = 0; j < 4; ++j) {
    console.log(imported.activate(inputs[j]));
}
//now that my xor is finished u store it as a json

//I dont really undesrtand this rn

/*
//var xorFunction = XOR.standalone(); //this doesnt require the synapse library

//console.log(xorFunction([0, 1]))



//bim bam bam, wippy bam bam

//working xor

//train(inputLayer, invisibleLayer, outputLayer, inputs, outputs);




//console.log(outputLayer.activate());




//ALL_TO_ALL is every neuron A to B
//ONE_TO_ONE  each neuron connects horizontally to its connection type
//ALL_TO_ELSE connects itself to all neurons other then itself.

//See neuron examples for gates

//inputLayer.activate([1, 0]);
//invisibleLayer.activate();
//outputLayer.activate();

//console.log(outputLayer.neurons()); array full of all neuron objects in layer

var learningRate = .3;

for (var i = 0; i < 20000; i++) {

    inputLayer.activate([1, 0]); // input: 1, 0 output: 1
    invisibleLayer.activate();
    outputLayer.activate();
    invisibleLayer.propagate(learningRate);
    outputLayer.propagate(learningRate, [0, 1]);
}

inputLayer.activate([1, 0]);
invisibleLayer.activate();
console.log(outputLayer.activate()); //looks good




//Everything below uses basic Neurons, I will not be using single neurons really, instead layers. 

//basic neuron init
var A = new Neuron();
var B = new Neuron();
var C = new Neuron();

A.project(B);
A.project('neuron')// is how you connect neurons together. If you want to they can connect to themselves as well.

//baisc gate init
var connection = A.project(B);
C.gate(connection);//this means that c is now a gate between A and B


console.log(A.activate())
console.log(B.activate())
console.log(A.activate(0.5)); //activate with input
console.log(B.activate()) //activate without any input, but A is feeding it info. Slight change between the two.

Propogation is how you train. To use the method you provide a learning rate, and a target value. 

A.project(B);

var learningRate = .3;

for (var i = 0; i < 20000; i++) { //This is a quick training runny a do
    //A activates with 1 as input
    A.activate(1);

    //B activates with A as input 
    B.activate();
    B.propagate(learningRate, .3478329);
}

A.activate(1);
console.log(B.activate());





Legacy code: 
function Perceptron(input, hidden, output) {
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;


var myPerceptron = new Network();
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR();
*/