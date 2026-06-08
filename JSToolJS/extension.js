// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const VSCUtils = require("./vscutils.js");
const JSMin = require("./jsmin.js");
const RealJSFormatter = require("./realjsformatter.js");
const JsonPP = require("./jsonpp.js");
const JsonTreeView = require("./jsonpptreeview.js");

let jsonTreeProvider = 0;

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

function guessJSON(jsCode) {
    let maybeJSON = false;
    let charJSON = 0;
    let jsCodeLen = jsCode.length;
    for (let i = 0; i < jsCodeLen; ++i) {
        let ch = jsCode.charAt(i);
        if (ch == ' ' || ch == '\t' ||
            ch == '\r' || ch == '\n') {
            continue; // Skip over whitespaces at beginning
        }
        if (ch == '{' || ch == '[') {
            maybeJSON = true;
            charJSON = ch;
        }
        break;
    }

    if (!maybeJSON) {
        return false;
    }

    for (let i = (jsCodeLen - 1); i >= 0; --i) {
        let ch = jsCode.charAt(i);
        if (ch == ' ' || ch == '\t' ||
            ch == '\r' || ch == '\n') {
            continue; // Skip over whitespaces at the end
        }
        if ((charJSON == '{' && ch == '}') ||
            (charJSON == '[' && ch == ']')) {
            return true;
        }
        break;
    }

    return false;
}

function makeFormatOptionFromTextEditor(textEditor) {
    let editorIndentSpace = textEditor.options.insertSpaces;
    let editorTabSize = textEditor.options.tabSize;

    let document = textEditor.document;
    let docEol = document.eol;

    let formatOption = new RealJSFormatter.FormatterOption();
    formatOption.chIndent = editorIndentSpace ? ' ' : '\t';
    formatOption.nChPerInd = editorIndentSpace ? editorTabSize : 1;
    formatOption.eCRPut = (docEol == vscode.EndOfLine.CRLF) ? RealJSFormatter.CR_PUT.PUT_CR : RealJSFormatter.CR_PUT.NOT_PUT_CR;
    formatOption.eBracNL = RealJSFormatter.BRAC_NEWLINE.NO_NEWLINE_BRAC;
    formatOption.eEmpytIndent = RealJSFormatter.EMPTYLINE_INDENT.NO_INDENT_IN_EMPTYLINE;

    return formatOption;
}

function makeFormatOptionFromFormattingOptions(formatOptions, textDocument) {
    let editorIndentSpace = formatOptions.insertSpaces;
    let editorTabSize = formatOptions.tabSize;

    let docEol = textDocument.eol;

    let formatOption = new RealJSFormatter.FormatterOption();
    formatOption.chIndent = editorIndentSpace ? ' ' : '\t';
    formatOption.nChPerInd = editorIndentSpace ? editorTabSize : 1;
    formatOption.eCRPut = (docEol == vscode.EndOfLine.CRLF) ? RealJSFormatter.CR_PUT.PUT_CR : RealJSFormatter.CR_PUT.NOT_PUT_CR;
    formatOption.eBracNL = RealJSFormatter.BRAC_NEWLINE.NO_NEWLINE_BRAC;
    formatOption.eEmpytIndent = RealJSFormatter.EMPTYLINE_INDENT.NO_INDENT_IN_EMPTYLINE;

    return formatOption;
}

function minJS(inNewDoc) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor opened.');
        return; // No open text editor
    }

    let document = editor.document;
    let docLangId = document.languageId;

    let inputJS = document.getText();
    let resultJS = JSMin.jsmin(inputJS).trim();

    if (!inNewDoc) {
        editor.edit(function (editBuilder) {
            let allRange = VSCUtils.getAllRangeFromTextEditor(editor);
            VSCUtils.replaceWithRange(editBuilder, allRange, resultJS);

            if (docLangId != "javascript" && docLangId != "json") {
                let newDocLangId = "javascript";
                if (guessJSON(resultJS)) {
                    newDocLangId = "json";
                }
                vscode.languages.setTextDocumentLanguage(document, newDocLangId);
            }
        });
    } else {
        let newDocLangId = "javascript";
        if (guessJSON(resultJS)) {
            newDocLangId = "json";
        }
        VSCUtils.newDocument(vscode.workspace, vscode.window, newDocLangId, resultJS);
    }
}

function formatJS() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor opened.');
        return; // No open text editor
    }

    let editorSelection = editor.selection;
    let document = editor.document;
    let docLangId = document.languageId;

    let formatAllText = true;
    let inputJS;
    let currentLine;
    let newSelRange;
    let initIndent;
    if (editorSelection.isEmpty) {
        inputJS = document.getText();
        currentLine = editorSelection.active.line;
    } else {
        formatAllText = false;

        // Re-select full line.
        let selStart = editorSelection.start;
        let selEnd = editorSelection.end;
        let selLine = document.lineAt(selEnd.line);
        let newSelStart = new vscode.Position(selStart.line, 0);
        let newSelEnd = selLine.range.end;
        newSelRange = new vscode.Range(newSelStart, newSelEnd);
        inputJS = document.getText(newSelRange);
        currentLine = selStart.line;

        initIndent = "";
        let inputJSLen = inputJS.length;
        for (let i = 0; i < inputJSLen; ++i) {
            let ch = inputJS.charAt(i);
            if (ch != ' ' && ch != '\t') {
                break;
            }
            initIndent += ch;
        }
    }

    //VSCUtils.log("inputJS:\n" + inputJS);

    // Make format option
    let formatOption = makeFormatOptionFromTextEditor(editor);

    // Format
    let jsfStrIO = new JSFormatStringIO(inputJS, formatOption);
    if (!formatAllText) {
        jsfStrIO.SetInitIndent(initIndent);
    }
    //jsfStrIO.m_debug = true;
    jsfStrIO.Go();
    let resultJS = jsfStrIO.outputJS;
    let currentLineJSF = currentLine + 1;
    let formattedLineJSF = jsfStrIO.GetFormattedLine(currentLineJSF);
    if (formattedLineJSF < 1) {
        formattedLineJSF = 1;
    }

    //VSCUtils.log(resultJS);

    // Change content
    editor.edit(function (editBuilder) {
        if (formatAllText) {
            let allRange = VSCUtils.getAllRangeFromTextEditor(editor);
            VSCUtils.replaceWithRange(editBuilder, allRange, resultJS);
        } else {
            // Clean one more new line.
            if (resultJS.length >= 2 && resultJS.charAt(resultJS.length - 2) == '\r') {
                resultJS = resultJS.substring(0, resultJS.length - 2);
            } else {
                resultJS = resultJS.substring(0, resultJS.length - 1);
            }

            VSCUtils.replaceWithRange(editBuilder, newSelRange, resultJS);
        }

        if (formatAllText && docLangId != "javascript" && docLangId != "json") {
            let newDocLangId = "javascript";
            if (guessJSON(resultJS)) {
                newDocLangId = "json";
            }
            vscode.languages.setTextDocumentLanguage(document, newDocLangId);
        }
    }).then(function (applied) {
        if (!applied) {
            return;
        }

        if (formatAllText) {
            // Move selection and viewport.
            VSCUtils.moveToLine(editor, formattedLineJSF - 1);
        }
    });
}

function formatJSAsRegisterFormatter(document, options) {
    let inputJS = document.getText();
    //VSCUtils.log("inputJS:\n" + inputJS);

    // Make format option
    let formatOption = makeFormatOptionFromFormattingOptions(options, document);

    // Format
    let jsfStrIO = new JSFormatStringIO(inputJS, formatOption);
    //jsfStrIO.m_debug = true;
    jsfStrIO.Go();
    let resultJS = jsfStrIO.outputJS;
    //VSCUtils.log(resultJS);

    let allRange = VSCUtils.getAllRangeFromTextDocument(document);

    let resultEdit = [];
    resultEdit.push(vscode.TextEdit.replace(allRange, resultJS));

    return resultEdit;
}

function JSONSort(inNewDoc) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor opened.');
        return; // No open text editor
    }

    let document = editor.document;
    let docLangId = document.languageId;

    let inputJSON = document.getText();
    let jsonppStrIO = new JsonPPStringIO(inputJSON);
    //jsonppStrIO.m_debug = true;
    let jsonValue = new JsonPP.JsonValue();
    jsonppStrIO.Go(jsonValue);
    let sortedJSON = jsonValue.ToStringSorted();

    // format
    let formatOption = makeFormatOptionFromTextEditor(editor);
    let jsfStrIO = new JSFormatStringIO(sortedJSON, formatOption);
    //jsfStrIO.m_debug = true;
    jsfStrIO.Go();
    sortedJSON = jsfStrIO.outputJS;

    if (!inNewDoc) {
        editor.edit(function (editBuilder) {
            let allRange = VSCUtils.getAllRangeFromTextEditor(editor);
            VSCUtils.replaceWithRange(editBuilder, allRange, sortedJSON);

            if (docLangId != "javascript" && docLangId != "json") {
                vscode.languages.setTextDocumentLanguage(document, "json");
            }
        });
    } else {
        VSCUtils.newDocument(vscode.workspace, vscode.window, "json", sortedJSON);
    }
}

function refreshJSONTreeView() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor opened.');
        return; // No open text editor
    }

    let document = editor.document;
    let inputJSON = document.getText();
    let jsonppStrIO = new JsonPPStringIO(inputJSON);
    //jsonppStrIO.m_debug = true;
    let jsonValue = new JsonPP.JsonValue();
    jsonppStrIO.Go(jsonValue);

    jsonTreeProvider = new JsonTreeView.JsonTreeProvider(jsonValue);
    vscode.window.registerTreeDataProvider("JSONTreeView", jsonTreeProvider);

    VSCUtils.setContext("showJsonTreeView", true);
    vscode.commands.executeCommand("JSONTreeView.focus");
}

function clickJSONTreeViewItem(element) {
    if (jsonTreeProvider != 0) {
        let editor = vscode.window.activeTextEditor;
        jsonTreeProvider.clickElem(editor, element);
    }
}

function copyJSONTreeViewItem(element) {
    if (jsonTreeProvider != 0) {
        jsonTreeProvider.copyElem(element);
    }
}

function copyJSONTreeViewItemName(element) {
    if (jsonTreeProvider != 0) {
        jsonTreeProvider.copyElemName(element);
    }
}

function copyJSONTreeViewItemValue(element, raw) {
    if (jsonTreeProvider != 0) {
        jsonTreeProvider.copyElemValue(element, raw);
    }
}

function copyJSONTreeViewItemPath(element) {
    if (jsonTreeProvider != 0) {
        jsonTreeProvider.copyElemPath(element);
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    VSCUtils.log('Congratulations, your extension "jstool ' + RealJSFormatter.VERSION + '" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    // Function
    context.subscriptions.push(vscode.commands.registerCommand('extension.minJS', function () {
        minJS(false);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.minJSNewFile', function () {
        minJS(true);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.formatJS', function () {
        formatJS();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONSort', function () {
        JSONSort(false);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONSortNewFile', function () {
        JSONSort(true);
    }));
    // Function

    // JSON tree view
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeView', function () {
        refreshJSONTreeView();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewClickItem', function (element) {
        clickJSONTreeViewItem(element);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewItemRefresh', function (element) {
        refreshJSONTreeView();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewCopyItem', function (element) {
        copyJSONTreeViewItem(element);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewCopyItemName', function (element) {
        copyJSONTreeViewItemName(element);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewCopyItemValue', function (element) {
        copyJSONTreeViewItemValue(element, false);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewCopyItemRawValue', function (element) {
        copyJSONTreeViewItemValue(element, true);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.JSONTreeViewCopyItemPath', function (element) {
        copyJSONTreeViewItemPath(element);
    }));
    // JSON tree view

    // Document formatter
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('javascript', {
        provideDocumentFormattingEdits(document, options) {
            return formatJSAsRegisterFormatter(document, options);
        }
    }));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('json', {
        provideDocumentFormattingEdits(document, options) {
            return formatJSAsRegisterFormatter(document, options);
        }
    }));
    // Document formatter
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
