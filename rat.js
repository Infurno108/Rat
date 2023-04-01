var synaptic = require('synaptic');
var fs = require('fs');
const learningRate = 0.3;
//Rat time. 
//RNN , Recurrent Neural Network 



function error(err, inputD) {
    if (err) throw err;
    return inputD;
}

//var paul = fs.readFileSync('text/message.txt', error);

paul = paul.toString()

console.log(paul);

function trim(text) {
    for (var i = 0; i < text.length; ++i) {
        switch (text[i]) {
            case 'a':
                break;
        }
    }
}

function libraryCreate(text) {
    for (var i = 0; i < text.length; i++) {
        if (text[i] == ' ') {

        }
    }
}

//libraryCreate(paul);


var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
var inputLayer = new Layer()
