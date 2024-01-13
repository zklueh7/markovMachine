/** Command-line tool to generate Markov text. */

const axios = require('axios');
const fs = require('fs');
const process = require('process');
const markov = require('./markov');

function makeText(data) {
    let markov = new markov.MarkovMachine(data);
    console.log(markov);
}

function textFromFile(path) {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.log("ERROR", err);
            process.kill(1);
        }
        generateText(data);
    })
}

async function textFromURL(url) {
    try {
        let response = await axios.get(url);
        generateText(response.data);
    }
    catch {
        console.log("ERROR", err);
        process.exit(1);
    }
}

if (process.argv[2] == "file") {
    textFromFile(process.argv[3]);
}
else if(process.argv[2] == "url") {
    textFromURL(process.argv[3]);
}
else {
    console.log("Invalid input");
    process.exit(1);
}