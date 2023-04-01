var synaptic = require('synaptic');
var fs = require('fs');
const learningRate = 0.3;
const paul = fs.readFileSync('text/message.txt', error).toString();
//Rat time. 
//RNN , Recurrent Neural Network 

function error(err, inputD) {
    if (err) throw err;
    return inputD;
}
function trim(text) { //fully functionaly (as far as I can tell. Returns array full of all unique words contained in fed string.)
    var dictionary = [];
    var j = 0;
    var lead = 0;
    var trail = 0;
    var found = 0;
    for (var i = 0; i < text.length; ++i) {
        switch (text[i]) {
            case ' ':
                trail = lead;
                lead = i + 1;//ok this looks dumb. I know it looks dumb. 
                temp = text.substring(trail, lead - 1);//But this only works if I define lead as + 1 and then -1 the only time I use it. Dont judge Rat.js he is trying hard.
                for (var u = 0; u < dictionary.length; ++u) {
                    if (dictionary[u] == temp) {
                        found = 1;
                        break;
                    }
                }
                if (found == 0) {
                    dictionary[j++] = temp;
                }
                found = 0;
                break;
            case '.':
            case '(':
            case ')':
            case ',':
            case ':':
            case ';':
            case "'":
            case '"':
                console.log(text[i]);
                text = text.substring(0, i).concat(text.substring(i + 1, text.length));
                break;
            default:
                break;
        }
    }
    return dictionary;
}
const localDictionary = trim(paul);

console.log(paul);


var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
var inputLayer = new Layer()
