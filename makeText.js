/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const { readFile } = require("fs");
const { get } = require("axios");
const { argv, exit } = require("process");

let method, path;

if (argv.length > 4) {
  console.log("ERROR!! TOO MANY ARGUMENTS!!");
} else if (argv.length < 4) {
  console.log(
    "ERROR!!! ONLY PUT TWO ARGS AFTER THE SCRIPT NAME...EITHER 'file' or 'url'"
  );
} else {
  [method, path] = process.argv.slice(2);
}

function makeMarkov(text) {
  let markov = new MarkovMachine(text);
  console.log(markov.makeText());
}

async function getText(path, type) {
  if (method === "url") {
    let response = await get(path);
    makeMarkov(response.data);
  } else if (type === "file") {
    readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log("ERROR!!!", err);
        exit(1);
      }
      makeMarkov(data);
    });
  } else {
    console.log("ERROR: Please only use 'file' or 'url' as flags");
    exit(1);
  }
}

getText(path, method);
