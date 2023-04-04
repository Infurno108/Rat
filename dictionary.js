var synaptic = require('synaptic')//here we go
const learningRate = 0.3

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer

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

xorTrainer.train(trainingSet);

var inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];

for (var j = 0; j < 5; ++j) {
    console.log(XOR.activate(inputs[j]));
}
//now that my xor is finished u store it as a json
//var exported = XOR.toJSON('experiment.json')