"use strict";

const FileSystem = require("fs");
const Path = require("path");

const JSParser = require("./jsparser.js");
const RealJSFormatter = require("./realjsformatter.js");

function log(logString) {
    console.log(logString);
}

class JSTokenDump extends JSParser.JSParser {

    constructor(inputJS) {
        super();
        this.inputJS = inputJS;
        this.inputIdx = 0;
        this.outputJS = "";
    }

    GetChar() {
        if (this.inputIdx <= this.inputJS.length) {
            return this.inputJS.charAt(this.inputIdx++);
        } else {
            return '\0';
        }
    }

    Go() {
        while (this.GetToken()) {
            this.outputJS += this.m_tokenA.code;
            this.outputJS += "\r\n";
        }
    }
}

class JSFormatStringIO extends RealJSFormatter.RealJSFormatter {

    constructor(inputJS, formatOption) {
        super(formatOption);
        this.inputJS = inputJS;
        this.inputIdx = 0;
        this.outputJS = "";
    }

    GetChar() {
        if (this.inputIdx <= this.inputJS.length) {
            return this.inputJS.charAt(this.inputIdx++);
        } else {
            return '\0';
        }
    }

    PutChar(ch) {
        this.outputJS += ch;
    }
}

function Main() {
    //prepareEnv();

    let printVersion = false;
    let inputJSFile = "";
    let outputJSFile = "";

    let argvLen = process.argv.length;
    if (argvLen == 3 && process.argv[2] == "--version") {
        printVersion = true;
    } else if (argvLen == 4) {
        inputJSFile = process.argv[argvLen - 2];
        outputJSFile = process.argv[argvLen - 1];
    }

    if (!printVersion && (inputJSFile == "" || outputJSFile == "")) {
        log("Usage: node jsfjsnode.js [input file] [output file]");
        log("");
        log("  --version: print version.");
        return;
    }

    if (printVersion) {
        log("JSFormatterJS version: " + RealJSFormatter.VERSION);
    } else {
        let inputJS = FileSystem.readFileSync(inputJSFile, "binary");
        inputJS = inputJS.toString();
        //log("inputJS:\n" + inputJS);

        let formatOption = new RealJSFormatter.FormatterOption();
        formatOption.chIndent = '\t';
        formatOption.nChPerInd = 1;
        formatOption.eCRPut = RealJSFormatter.CR_PUT.PUT_CR;
        formatOption.eBracNL = RealJSFormatter.BRAC_NEWLINE.NO_NEWLINE_BRAC;
        formatOption.eEmpytIndent = RealJSFormatter.EMPTYLINE_INDENT.NO_INDENT_IN_EMPTYLINE;

        let jsfStrIO = new JSFormatStringIO(inputJS, formatOption);
        jsfStrIO.m_debug = true;
        jsfStrIO.Go();
        let resultJS = jsfStrIO.outputJS;

        FileSystem.writeFileSync(outputJSFile, resultJS, "binary");
        log("Done");
    }

}

Main();
