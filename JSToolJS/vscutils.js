const vscode = require('vscode');

const LineSeperator = /\r\n|\n|\r/;

function log(logString) {
    console.log(logString);
}

function setContext(prop, value) {
    vscode.commands.executeCommand('setContext', prop, value);
}

function copyToClipboard(value) {
    vscode.env.clipboard.writeText(value);
}

function newDocument(workspace, window, language, text) {
    workspace.openTextDocument({
        language: language,
        content: text
    }).then(function (document) {
        window.showTextDocument(document);
    });
}

function getAllRangeFromTextDocument(textDocument) {
    let allText = textDocument.getText();
    let start = new vscode.Position(0, 0);
    let lines = allText.split(LineSeperator);
    let end = new vscode.Position(lines.length - 1, lines[lines.length - 1].length);
    let allRange = new vscode.Range(start, end);
    return allRange;
}

function getAllRangeFromTextEditor(textEditor) {
    let textDocument = textEditor.document;
    return getAllRangeFromTextDocument(textDocument);
}

function replaceWithRange(textEditorEdit, range, text) {
    textEditorEdit.delete(range);
    textEditorEdit.insert(range.start, text);
}
function moveToLine(textEditor, line) {
    let linePosition = new vscode.Position(line, 0);
    textEditor.selection = new vscode.Selection(linePosition, linePosition);
    textEditor.revealRange(new vscode.Range(linePosition, linePosition), vscode.TextEditorRevealType.InCenter);
}

// exports
exports.log = log;
exports.setContext = setContext;
exports.copyToClipboard = copyToClipboard;
exports.newDocument = newDocument;
exports.getAllRangeFromTextDocument = getAllRangeFromTextDocument;
exports.getAllRangeFromTextEditor = getAllRangeFromTextEditor;
exports.replaceWithRange = replaceWithRange;
exports.moveToLine = moveToLine;
