var synaptic = require('synaptic')//here we go

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;


//basic neuron init
var A = new Neuron();
var B = new Neuron();
//A.project('neuron') is how you connect neurons together. If you want to they can connect to themselves as well.
var connection = A.project(B);
//baisc gate init
var C = new Neuron();
C.gate(connection);//this means that c is now a gate between A and B

console.log()
console.log(A.activate(0.5)); //activate with input
console.log(B.activate()) //activate without any input, but A is feeding it info



/*

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