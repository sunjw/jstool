/* jsparser.js
2017-12-4

Copyright (c) 2012- SUN Junwen

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

'use strict';

const VERSION = "26.7.21";

function StringReplaceAll(string, target, replace) {
    return string.replace(new RegExp(target, 'g'), replace);
}

function CopyObject(source) {
    return Object.assign({}, source);
}

function GetStackTop(stk) {
    if (stk.length == 0) {
        return undefined;
    }
    let ret = stk[stk.length - 1];
    return ret;
}

function StackTopEq(stk, eq) {
    if (stk.length == 0) {
        return false;
    }
    return (eq == stk[stk.length - 1]);
}

const NOT_TOKEN = -1;
const STRING_TYPE = 0;
const OPER_TYPE = 1;
const REGULAR_TYPE = 2;
const COMMENT_TYPE_1 = 9; // inline comment
const COMMENT_TYPE_2 = 10; // multi-line comment

/*
 * if-i, else-e, else if-i,
 * for-f, do-d, while-w,
 * switch-s, case-c, default-c
 * try-r, catch-h
 * {-BLOCK, (-BRACKET
 * 0-empty
 */
const JS_IF = 'i';
const JS_ELSE = 'e';
const JS_FOR = 'f';
const JS_DO = 'd';
const JS_WHILE = 'w';
const JS_SWITCH = 's';
const JS_CASE = 'c';
const JS_TRY = 'r';
const JS_CATCH = 'h';
const JS_FUNCTION = 'n';
const JS_IMPORT = 'm';
const JS_DECL = 'v';
const JS_BLOCK = '{';
const JS_BRACKET = '(';
const JS_SQUARE = '[';
const JS_ASSIGN = '=';
const JS_QUEST_MARK = '?';
const JS_TEMP_LITE = '$';
const JS_HELPER = '\\';
const JS_STUB = ' ';
const JS_EMPTY = '\0';

class Token {
    constructor() {
        this.code = "";
        this.type = 0;
        this.inlineComment = false;
        this.line = 0;
    }
}

class JSParser {

    constructor() {
        this.m_tokenABeforeComment = new Token();

        this.m_charA = '';
        this.m_charB = '';
        this.m_tokenPreA = new Token();
        this.m_tokenA = new Token();
        this.m_tokenB = new Token();

        this.m_tokenBQueue = [];

        this.m_blockStack = [];

        this.m_startClock = 0;
        this.m_endClock = 0;
        this.m_duration = 0;
        this.m_strDebugOutput = "";

        // Init()
        this.m_debug = false;
        this.m_lineCount = 1;
        this.m_tokenCount = 0;
        this.m_strBeforeReg = "(,=:[!&|?+*{};>\n";
        this.m_bRegular = false;
        this.m_iRegBracket = 0;
        this.m_bPosNeg = false;
        this.m_bTempLite = false;
        this.m_bGetTokenInit = false;
    }

    GetDebugOutput() {
        return this.m_strDebugOutput;
    }

    IsNormalChar(ch) {
        // normal char
        return ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') ||
            (ch >= 'A' && ch <= 'Z') || ch == '_' || ch == '$' ||
            ch.charCodeAt(0) > 126 || ch.charCodeAt(0) < 0);
    }

    IsNumChar(ch) {
        // number and .
        return ((ch >= '0' && ch <= '9') || ch == '.');
    }

    IsBlankChar(ch) {
        // blank char
        return (ch == ' ' || ch == '\t' || ch == '\r');
    }

    IsSingleOper(ch) {
        // single operator
        return (ch == '.' || ch == '(' || ch == ')' ||
            ch == '[' || ch == ']' || ch == '{' || ch == '}' ||
            ch == ',' || ch == ';' || ch == '~' || ch == '#' ||
            ch == '\n');
    }

    IsQuote(ch) {
        // quote
        return (ch == '\'' || ch == '\"');
    }

    IsTemplate(ch) {
        // template
        return (ch == '`');
    }

    IsInlineComment(token) {
        if (token.type != COMMENT_TYPE_2) {
            return false;
        }

        return token.inlineComment;
    }

    IsComment() {
        // Need read charA, charB to recognize comment
        return (this.m_charA == '/' &&
            (this.m_charB == '/' || this.m_charB == '*'));
    }

    IsShebang() {
        if (this.m_tokenCount == 0 && this.m_charA == '#' && this.m_charB == '!') {
            return true;
        }
        return false;
    }

    GetToken() {
        // Recognized negative number and regular
        if (!this.m_bGetTokenInit) {
            // Call GetTokenRaw first time
            this.GetTokenRaw();
            this.m_bGetTokenInit = true;
        }

        this.PrepareRegular(); // recognize regular
        this.PreparePosNeg(); // recognize +/-
        this.PrepareTempLite(); // recognize template literals

        ++this.m_tokenCount;
        this.m_tokenPreA = CopyObject(this.m_tokenA);
        this.m_tokenA = CopyObject(this.m_tokenB);

        if (this.m_tokenBQueue.length == 0) {
            this.GetTokenRaw();
            this.PrepareTokenB(); // If jump over newline
        } else {
            // Queued newline
            this.m_tokenB = this.m_tokenBQueue[0];
            this.m_tokenBQueue.shift();
        }

        return (this.m_charA != '\0' || this.m_tokenA.code != "");
    }

    StartParse() {
        this.m_startClock = new Date();
    }

    EndParse() {
        this.m_endClock = new Date();
        this.m_duration = (this.m_endClock - this.m_startClock) / 1000;
        this.PrintDebug();
    }

    // void Init(); implement in constructor

    // Should be implemented in derived class
    GetChar() {
        // virtual
        // JUST get next char from input
    }

    GetTokenRaw() {
        if (!this.m_bGetTokenInit) {
            this.m_charB = this.GetChar();
        }

        // normal procedure
        if (!this.m_bRegular && !this.m_bPosNeg) {
            this.m_tokenB.code = "";
            this.m_tokenB.type = STRING_TYPE;
            this.m_tokenB.line = this.m_lineCount;
        } else if (this.m_bRegular) {
            //m_tokenB.push_back('/');
            this.m_tokenB.type = REGULAR_TYPE; // regular
        } else {
            this.m_tokenB.type = STRING_TYPE; // +/-
        }

        let bQuote = false;
        let bComment = false;
        let bRegularFlags = false;
        let bShebang = false; // Unix Shebang
        let bFirst = true;
        let bNum = false; // is number or not
        let bLineBegin = false;
        let chQuote = ''; // quote is ' or "
        let chComment = ''; // comment is / or *

        if (this.m_bTempLite) {
            bQuote = true;
            chQuote = '`';
            this.m_tokenB.type = STRING_TYPE;
            this.m_tokenB.code += this.m_charA;
        }

        while (1) {
            this.m_charA = this.m_charB;
            if (this.m_charA == '\0') {
                this.m_bRegular = false; // js content error
                return;
            }

            this.m_charB = this.GetChar();
            // \r\n -> \n(next char)
            if (this.m_charA == '\r' && this.m_charB == '\n') {
                this.m_charA = '\n';
                this.m_charB = this.GetChar();
            }
            // \r -> \n
            if (this.m_charA == '\r' && this.m_charB != '\n') {
                this.m_charA = '\n';
            }

            if (this.m_charA == '\n') {
                ++this.m_lineCount;
            }

            /*
             * operate m_charA depend on m_charB
             * output m_charA or not
             * override m_charA by m_charB next loop
             */

            // Recognize regular on token level
            if (this.m_bRegular) {
                // output regular until /
                this.m_tokenB.code += this.m_charA;

                if (this.m_charA == '\\' &&
                    (this.m_charB == '/' || this.m_charB == '\\' ||
                        this.m_charB == '[' || this.m_charB == ']')) // escape char
                {
                    this.m_tokenB.code += this.m_charB;
                    this.m_charB = this.GetChar();
                }

                if (this.m_charA == '[' && this.m_iRegBracket == 0) {
                    ++this.m_iRegBracket;
                }

                if (this.m_charA == ']' && this.m_iRegBracket > 0) {
                    --this.m_iRegBracket;
                    if (bRegularFlags) {
                        bRegularFlags = false;
                    }
                }

                if (this.m_charA == '/' &&
                    (this.m_charB != '*' && this.m_charB != '|' && this.m_charB != '?')) // regular may end
                {
                    if (!bRegularFlags &&
                        (this.IsNormalChar(this.m_charB) || this.m_iRegBracket > 0)) {
                        if (this.m_iRegBracket == 0) {
                            // part of regular flags
                            // /g /i /ig...
                            // or no need escape '/' inside []
                            bRegularFlags = true;
                        }
                        continue;
                    } else {
                        // regular end
                        this.m_bRegular = false;
                        return;
                    }
                }

                if (bRegularFlags && !this.IsNormalChar(this.m_charB)) {
                    // regular end
                    bRegularFlags = false;
                    this.m_bRegular = false;
                    return;
                }

                continue;
            }

            if (bQuote) {
                // in quote, output all until quote end
                this.m_tokenB.code += this.m_charA;

                if (this.m_charA == '\\' && (this.m_charB == chQuote || this.m_charB == '\\')) {
                    // escape char
                    this.m_tokenB.code += this.m_charB;
                    this.m_charB = this.GetChar();
                }

                if (this.m_charA == chQuote) { // quote end
                    return;
                }

                if (chQuote == '`' && this.m_charA == '$' && this.m_charB == '{') { // template literals
                    this.m_tokenB.code += this.m_charB;
                    this.m_charB = this.GetChar();
                    return;
                }

                continue;
            }

            if (bComment) {
                // in comment, output all
                if (this.m_tokenB.type == COMMENT_TYPE_2) {
                    // remove all \t and ' ' in every /*...*/ line
                    if (bLineBegin && (this.m_charA == '\t' || this.m_charA == ' ')) {
                        continue;
                    } else if (bLineBegin && this.m_charA == '*') {
                        this.m_tokenB.code += ' ';
                    }

                    bLineBegin = false;

                    if (this.m_charA == '\n') {
                        bLineBegin = true;
                    }
                }
                this.m_tokenB.code += this.m_charA;

                if (chComment == '*') {
                    // until */
                    this.m_tokenB.type = COMMENT_TYPE_2;
                    this.m_tokenB.inlineComment = false;
                    if (this.m_charA == '*' && this.m_charB == '/') {
                        this.m_tokenB.code += this.m_charB;
                        this.m_charB = this.GetChar();

                        this.m_tokenABeforeComment = this.m_tokenA;

                        return;
                    }
                } else {
                    // until newline
                    this.m_tokenB.type = COMMENT_TYPE_1;
                    this.m_tokenB.inlineComment = false;
                    if (this.m_charA == '\n') {
                        return;
                    }
                }

                continue;
            }

            if (bShebang) {
                // is Shebang, until newline
                this.m_tokenB.code += this.m_charA;

                if (this.m_charA == '\n') {
                    return;
                }

                continue;
            }

            if (this.IsNormalChar(this.m_charA)) {
                this.m_tokenB.type = STRING_TYPE;
                this.m_tokenB.code += this.m_charA;

                // handle something like 82e-2, 442e+6, 555E-6
                // direct number
                let bNumOld = bNum;
                if (bFirst || bNumOld) {
                    // only number before
                    bNum = this.IsNumChar(this.m_charA);
                    bFirst = false;
                }
                if (bNumOld && !bNum && (this.m_charA == 'e' || this.m_charA == 'E') &&
                    (this.m_charB == '-' || this.m_charB == '+' || this.IsNumChar(this.m_charB))) {
                    bNum = true;
                    if (this.m_charB == '-' || this.m_charB == '+') {
                        this.m_tokenB.code += this.m_charB;
                        this.m_charB = this.GetChar();
                    }
                }

                if (!this.IsNormalChar(this.m_charB)) {
                    // loop until m_charB is not normal char
                    this.m_bPosNeg = false;
                    return;
                }
            } else {
                if (this.IsBlankChar(this.m_charA)) {
                    continue; // ignore blank char
                }

                if (this.IsQuote(this.m_charA) || this.IsTemplate(this.m_charA)) {
                    // quote
                    bQuote = true;
                    chQuote = this.m_charA;

                    this.m_tokenB.type = STRING_TYPE;
                    this.m_tokenB.code += this.m_charA;
                    continue;
                }

                if (this.IsComment()) {
                    // comment
                    bComment = true;
                    chComment = this.m_charB;

                    //m_tokenBType = COMMENT_TYPE;
                    this.m_tokenB.code += this.m_charA;
                    continue;
                }

                if (this.IsShebang()) {
                    bShebang = true;
                    this.m_tokenB.type = COMMENT_TYPE_1;
                    this.m_tokenB.code += this.m_charA;
                    continue;
                }

                if (this.IsSingleOper(this.m_charA) ||
                    this.IsNormalChar(this.m_charB) || this.IsBlankChar(this.m_charB) ||
                    this.IsQuote(this.m_charB) || this.IsTemplate(this.m_charB)) {
                    this.m_tokenB.type = OPER_TYPE;
                    this.m_tokenB.code = this.m_charA; // single char operator
                    return;
                }

                // multi char operator
                if ((this.m_charB == '=' || this.m_charB == this.m_charA) ||
                    ((this.m_charA == '-' || this.m_charA == '=') && this.m_charB == '>')) {
                    // multi char operator
                    this.m_tokenB.type = OPER_TYPE;
                    this.m_tokenB.code += this.m_charA;
                    this.m_tokenB.code += this.m_charB;
                    this.m_charB = this.GetChar();
                    if ((this.m_tokenB.code == "==" || this.m_tokenB.code == "!=" ||
                            this.m_tokenB.code == "<<" || this.m_tokenB.code == ">>") && this.m_charB == '=') {
                        // ===, !==, <<=, >>=
                        this.m_tokenB.code += this.m_charB;
                        this.m_charB = this.GetChar();
                    } else if (this.m_tokenB.code == ">>" && this.m_charB == '>') {
                        // >>>, >>>=
                        this.m_tokenB.code += this.m_charB;
                        this.m_charB = this.GetChar();
                        if (this.m_charB == '=') // >>>=
                        {
                            this.m_tokenB.code += this.m_charB;
                            this.m_charB = this.GetChar();
                        }
                    } else if ((this.m_tokenB.code == "&&" || this.m_tokenB.code == "||" ||
                            this.m_tokenB.code == "??") && this.m_charB == '=') {
                        // &&=, ||=, ??=
                        this.m_tokenB.code += this.m_charB;
                        this.m_charB = this.GetChar();
                    }
                    return;
                } else if (this.m_charA == '?' && this.m_charB == '.') {
                    this.m_tokenB.type = OPER_TYPE;
                    this.m_tokenB.code += this.m_charA;

                    let prevCharB = this.m_charB;
                    this.m_charB = this.GetChar();
                    if (!this.IsNumChar(this.m_charB)) {
                        // ?.xyz
                        this.m_tokenB.code += prevCharB;
                    } else {
                        // ? .123
                        this.m_tokenBQueue.push(this.m_tokenB);
                        this.m_tokenB = new Token();
                        this.m_tokenB.code = prevCharB;
                        this.m_tokenB.type = OPER_TYPE;
                        this.m_tokenB.line = this.m_lineCount;
                    }
                } else {
                    // still...single char operator
                    this.m_tokenB.type = OPER_TYPE;
                    this.m_tokenB.code = this.m_charA; // single char operator
                    return;
                }

                // What? How could we come here?
                this.m_charA = '\0';
                return;
            }
        }
    }

    // recognize regular in tokenB by lex
    PrepareRegular() {
        /*
         * regular first
         * m_tokenB[0] == / and m_tokenB is not comment
         * m_tokenA is not STRING (except m_tokenA is one of some keywords)
         * and last char in m_tokenA is following rules below
         */
        //size_t last = m_tokenA.size() > 0 ? m_tokenA.size() - 1 : 0;
        let tokenALast = this.m_tokenA.code.length > 0 ? this.m_tokenA.code.charAt(this.m_tokenA.code.length - 1) : 0;
        let tokenBFirst = this.m_tokenB.code.charAt(0);
        if (tokenBFirst == '/' && this.m_tokenB.type != COMMENT_TYPE_1 &&
            this.m_tokenB.type != COMMENT_TYPE_2 &&
            ((this.m_tokenA.type != STRING_TYPE && this.m_strBeforeReg.indexOf(tokenALast) != -1) ||
                (this.m_tokenA.code == "return" || this.m_tokenA.code == "throw" ||
                    this.m_tokenA.code == "in" || this.m_tokenA.code == "of"))) {
            this.m_bRegular = true;
            this.GetTokenRaw(); // put regular into m_tokenB
        }
    }

    // recognize +/- number in tokenB by lex
    PreparePosNeg() {
        /*
         * if m_tokenB is -/+
         * and m_tokenA is not string and regular
         * and m_tokenA is ++, --, ], )
         * and m_charB is NormalChar
         * then m_tokenB is a +/- number
         */
        let tokenRealPre = this.m_tokenA;
        if (this.m_tokenA.type == COMMENT_TYPE_2) {
            tokenRealPre = this.m_tokenABeforeComment;
        }

        if (this.m_tokenB.type == OPER_TYPE && (this.m_tokenB.code == "-" || this.m_tokenB.code == "+") &&
            (tokenRealPre.type != STRING_TYPE ||
                tokenRealPre.code == "return" || tokenRealPre.code == "case" ||
                tokenRealPre.code == "delete" || tokenRealPre.code == "throw") &&
            tokenRealPre.type != REGULAR_TYPE &&
            tokenRealPre.code != "++" && tokenRealPre.code != "--" &&
            tokenRealPre.code != "]" && tokenRealPre.code != ")" &&
            this.IsNormalChar(this.m_charB)) {
            // m_tokenB is a +/- number
            this.m_bPosNeg = true;
            this.GetTokenRaw();
        }
    }

    PrepareTempLite() {
        if (this.m_tokenB.code == "}" && StackTopEq(this.m_blockStack, JS_TEMP_LITE)) {
            this.m_bTempLite = true;
            this.GetTokenRaw();
            this.m_bTempLite = false;
        }
    }

    PrepareTokenB() {
        //char stackTop = m_blockStack.top();

        /*
         * jump over newline before else, while, catch, ',', ';', ')', {
         * if newline is not followed by strings descripted before, re-add newline
         */
        let c = 0;
        while (this.m_tokenB.code == "\n" || this.m_tokenB.code == "\r\n") {
            ++c;
            this.GetTokenRaw();
        }

        if (c == 0 &&
            this.m_tokenA.type != COMMENT_TYPE_1 &&
            this.m_tokenB.type == COMMENT_TYPE_2 &&
            this.m_tokenB.code.indexOf("\r") == -1 &&
            this.m_tokenB.code.indexOf("\n") == -1) {
            // no newline before and in COMMENT_TYPE_2
            this.m_tokenB.inlineComment = true;
        }

        if (this.m_tokenB.code != "else" && /*this.m_tokenB.code != "while" &&*/
            this.m_tokenB.code != "catch" && this.m_tokenB.code != "finally" &&
            this.m_tokenB.code != "," && this.m_tokenB.code != ";" && this.m_tokenB.code != ")") {
            // push newline into queue
            if (this.m_tokenA.code == "{" && this.m_tokenB.code == "}") {
                return; // empty {}
            }

            let eatNewLine = false;

            if (this.m_tokenA.code == "}" && this.m_tokenB.code == "while" &&
                StackTopEq(this.m_blockStack, JS_BLOCK)) {
                let topStack = GetStackTop(this.m_blockStack);
                this.m_blockStack.pop();
                if (StackTopEq(this.m_blockStack, JS_DO)) {
                    eatNewLine = true;
                }
                this.m_blockStack.push(topStack);
            }

            let needRepush = false;
            if (StackTopEq(this.m_blockStack, JS_BLOCK)) {
                let topStack = GetStackTop(this.m_blockStack);
                this.m_blockStack.pop();
                needRepush = true;
            }
            if ((this.m_tokenA.code != ";" && StackTopEq(this.m_blockStack, JS_IMPORT)) ||
                StackTopEq(this.m_blockStack, JS_DECL)) {
                eatNewLine = true;
            }
            if (needRepush) {
                this.m_blockStack.push(JS_BLOCK);
            }

            if (eatNewLine) {
                return;
            }

            let temp;
            c = c > 2 ? 2 : c;
            for (; c > 0; --c) {
                let temp = new Token();
                temp.code = "\n";
                temp.type = OPER_TYPE;
                this.m_tokenBQueue.push(temp);
            }
            temp = this.m_tokenB;
            this.m_tokenBQueue.push(temp);
            temp = this.m_tokenBQueue[0];
            this.m_tokenBQueue.shift();
            this.m_tokenB = temp;
        }
    }

    PrintDebug() {
        if (this.m_debug) {
            this.m_strDebugOutput = "";
            let buf = "";
            //SNPRINTF(buf, 1000, "Processed tokens: %ld\n", m_tokenCount);
            //m_strDebugOutput.append(buf);
            this.m_strDebugOutput = this.m_strDebugOutput + "Processed tokens: " + this.m_tokenCount + "\n";
            //SNPRINTF(buf, 1000, "Time used: %.3fs\n", m_duration);
            //m_strDebugOutput.append(buf);
            this.m_strDebugOutput = this.m_strDebugOutput + "Time used: " + this.m_duration + "s\n";
            //SNPRINTF(buf, 1000, "%.3f tokens/second\n", m_tokenCount / m_duration);
            //m_strDebugOutput.append(buf);
            this.m_strDebugOutput = this.m_strDebugOutput + (this.m_tokenCount / this.m_duration).toFixed(2) + " tokens/second\n";

            this.m_strDebugOutput = this.PrintAdditionalDebug(this.m_strDebugOutput);

            this.m_strDebugOutput = this.m_strDebugOutput.trim();

            console.log(this.m_strDebugOutput);
        }
    }

    PrintAdditionalDebug(strDebugOutput) {
        // virtual
        return strDebugOutput;
    }

}

// exports
exports.VERSION = VERSION;

exports.StringReplaceAll = StringReplaceAll;
exports.CopyObject = CopyObject;
exports.GetStackTop = GetStackTop;
exports.StackTopEq = StackTopEq;

exports.NOT_TOKEN = NOT_TOKEN;
exports.STRING_TYPE = STRING_TYPE;
exports.OPER_TYPE = OPER_TYPE;
exports.REGULAR_TYPE = REGULAR_TYPE;
exports.COMMENT_TYPE_1 = COMMENT_TYPE_1;
exports.COMMENT_TYPE_2 = COMMENT_TYPE_2;

exports.JS_IF = JS_IF;
exports.JS_ELSE = JS_ELSE;
exports.JS_FOR = JS_FOR;
exports.JS_DO = JS_DO;
exports.JS_WHILE = JS_WHILE;
exports.JS_SWITCH = JS_SWITCH;
exports.JS_CASE = JS_CASE;
exports.JS_TRY = JS_TRY;
exports.JS_CATCH = JS_CATCH;
exports.JS_FUNCTION = JS_FUNCTION;
exports.JS_IMPORT = JS_IMPORT;
exports.JS_DECL = JS_DECL;
exports.JS_BLOCK = JS_BLOCK;
exports.JS_BRACKET = JS_BRACKET;
exports.JS_SQUARE = JS_SQUARE;
exports.JS_ASSIGN = JS_ASSIGN;
exports.JS_QUEST_MARK = JS_QUEST_MARK;
exports.JS_TEMP_LITE = JS_TEMP_LITE;
exports.JS_HELPER = JS_HELPER;
exports.JS_STUB = JS_STUB;
exports.JS_EMPTY = JS_EMPTY;

exports.Token = Token;
exports.JSParser = JSParser;

//console.log(exports);
