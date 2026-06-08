"use strict";

const FileSystem = require("fs");
const Path = require("path");

const JsonPP = require("./jsonpp.js");

function log(logString) {
    console.log(logString);
}

function replaceAll(string, target, replace) {
    return string.replace(new RegExp(target, 'g'), replace);
}

class JsonPPStringIO extends JsonPP.JsonParser {

    constructor(inputJS) {
        super();
        this.inputJS = inputJS;
        this.inputIdx = 0;
    }

    GetChar() {
        if (this.inputIdx <= this.inputJS.length) {
            return this.inputJS.charAt(this.inputIdx++);
        } else {
            return '\0';
        }
    }
}

function Main() {
    //prepareEnv();

    let printVersion = false;
    let inputJSFile = "";
    let outputJSFile = "";
    let sortJS = false;

    let argvLen = process.argv.length;
    if (argvLen == 3 && process.argv[2] == "--version") {
        printVersion = true;
    } else if (argvLen == 4) {
        inputJSFile = process.argv[argvLen - 2];
        outputJSFile = process.argv[argvLen - 1];
    } else if (argvLen == 5 && process.argv[2] == "--sort") {
        inputJSFile = process.argv[argvLen - 2];
        outputJSFile = process.argv[argvLen - 1];
        sortJS = true;
    }

    if (!printVersion && (inputJSFile == "" || outputJSFile == "")) {
        log("Usage: node jsonppjsnode.js [input file] [output file]");
        log("");
        log("  --sort: test JSON sort.");
        log("  --version: print version.");
        return;
    }

    if (printVersion) {
        log("JSFormatterJS version: " + JsonPP.VERSION);
    } else {
        let inputJS = FileSystem.readFileSync(inputJSFile, "binary");
        inputJS = inputJS.toString();
        //log("inputJS:\n" + inputJS);

        let jsonppStrIO = new JsonPPStringIO(inputJS);
        jsonppStrIO.m_debug = true;
        let jsonValue = new JsonPP.JsonValue();
        jsonppStrIO.Go(jsonValue);

        let resultJS = "";
        if (!sortJS) {
            resultJS = jsonValue.ToString();
        } else {
            resultJS = jsonValue.ToStringSorted();
        }

        resultJS = replaceAll(resultJS, "\n", "\r\n");
        FileSystem.writeFileSync(outputJSFile, resultJS, "binary");
        log("Done");
    }
}

Main();
