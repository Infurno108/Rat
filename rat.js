var synaptic = require('synaptic');
var fs = require('fs');
const learningRate = 0.3;
const paul = fs.readFileSync('text/message.txt', error).toString().toLowerCase();
//Rat time. 
//RNN , Recurrent Neural Network 

function error(err, inputD) {
    if (err) throw err;
    return inputD;
}


var testText = 'This. Is a decent test, of course I dont think its great? But like (butt) I think I need to kill the president. "Again?"';

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

//console.log(dictionaryAdd(punc(paul)));
var dictionary = dictionaryAdd(punc(paul));

/*
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
                text = text.substring(0, i).concat(text.substring(i + 1, text.length));
                console.log(text);
                break;
            default:
                break;
        }
    }
    return dictionary;
}
*/
//const localDictionary = trim(paul);

//console.log(localDictionary);


var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
var inputLayer = new Layer()
