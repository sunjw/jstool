/* realjsformatter.js
2017-12-21

Copyright (c) 2010- SUN Junwen

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

const JSParser = require('./jsparser.js');

const VERSION = JSParser.VERSION;

function Trim(str) {
    return str.trim();
}

function TrimRightSpace(str) {
    let endIdx = -1;
    for (let i = str.length - 1; i >= 0; --i) {
        let ch = str.charAt(i);
        if (ch != ' ' && ch != '\t') {
            endIdx = i + 1;
            break;
        }
    }
    if (endIdx == -1) {
        // all spaces
        return "";
    } else {
        return str.substring(0, endIdx);
    }
}

function TrimSpace(str) {
    let startIdx = -1;
    for (let i = 0; i < str.length; ++i) {
        let ch = str.charAt(i);
        if (ch != ' ' && ch != '\t') {
            if (startIdx == -1) {
                startIdx = i; // found first not space
                break;
            }
        }
    }
    if (startIdx == -1) {
        // all spaces
        return "";
    } else {
        return TrimRightSpace(str.substring(startIdx));
    }
}

/*
 * CR_READ
 *   READ_CR, Read \r.
 *   SKIP_READ_CR, Skip \r when read.
 */
const CR_READ = {
    SKIP_READ_CR: 0,
    READ_CR: 1
}
/*
 * CR_PUT
 *   PUT_CR, Use \r\n as new line.
 *   NOT_PUT_CR, Use \n as new line.
 */
const CR_PUT = {
    NOT_PUT_CR: 0,
    PUT_CR: 1
}
/*
 * BRAC_NEWLINE
 *   NEWLINE_BRAC, New line before bracket.
 *   NO_NEWLINE_BRAC, No bracket before new line.
 */
const BRAC_NEWLINE = {
    NO_NEWLINE_BRAC: 0,
    NEWLINE_BRAC: 1
};
/*
 * INDENT_IN_EMPTYLINE
 *   INDENT_IN_EMPTYLINE, Output indent chars in empty line.
 *   NO_INDENT_IN_EMPTYLINE, No indent chars in empty line.
 */
const EMPTYLINE_INDENT = {
    NO_INDENT_IN_EMPTYLINE: 0,
    INDENT_IN_EMPTYLINE: 1
}

class FormatterOption {
    constructor() {
        this.chIndent = '\t';
        this.nChPerInd = 1;
        this.eCRRead = CR_READ.SKIP_READ_CR;
        this.eCRPut = CR_PUT.NOT_PUT_CR;
        this.eBracNL = BRAC_NEWLINE.NO_NEWLINE_BRAC;
        this.eEmpytIndent = EMPTYLINE_INDENT.NO_INDENT_IN_EMPTYLINE;
    }
}

class RealJSFormatter extends JSParser.JSParser {
    constructor(formatOption) {
        super();

        this.m_lineWaitVec = [];

        // stack used for solving loop in if
        this.m_brcNeedStack = []; // () after if

        this.m_QuestOperStackCount = [];
        this.m_QuestOperIndentStack = [];

        // Init();
        // format option
        this.m_struOption = formatOption;

        this.m_tokenCount = 0;

        this.m_initIndent = ""; // initial indent
        this.m_nIndents = 0; // indent count
        this.m_indentFixSet = new Set();

        this.m_nLineIndents = 0;
        this.m_bLineTemplate = false;
        this.m_lineBuffer = "";

        this.m_nFormattedLineCount = 1;
        this.m_lineFormattedVec = [];

        this.m_bNewLine = false; // prepare to give newline

        this.m_bBlockStmt = true; // block is started
        this.m_bAssign = false;
        this.m_bEmptyBracket = false; // empty {}
        this.m_bCommentPut = false; // output comment
        this.m_bTemplatePut = false; // Template String

        this.m_nQuestOperCount = 0;

        this.m_blockMap = {};
        this.m_blockMap["if"] = JSParser.JS_IF;
        this.m_blockMap["else"] = JSParser.JS_ELSE;
        this.m_blockMap["for"] = JSParser.JS_FOR;
        this.m_blockMap["do"] = JSParser.JS_DO;
        this.m_blockMap["while"] = JSParser.JS_WHILE;
        this.m_blockMap["switch"] = JSParser.JS_SWITCH;
        this.m_blockMap["case"] = JSParser.JS_CASE;
        this.m_blockMap["default"] = JSParser.JS_CASE;
        this.m_blockMap["try"] = JSParser.JS_TRY;
        this.m_blockMap["finally"] = JSParser.JS_TRY; // equal to try
        this.m_blockMap["catch"] = JSParser.JS_CATCH;
        this.m_blockMap["import"] = JSParser.JS_IMPORT;
        this.m_blockMap["function"] = JSParser.JS_FUNCTION;
        this.m_blockMap["{"] = JSParser.JS_BLOCK;
        this.m_blockMap["("] = JSParser.JS_BRACKET;
        this.m_blockMap["["] = JSParser.JS_SQUARE;
        this.m_blockMap["="] = JSParser.JS_ASSIGN;

        this.m_bracketKeywordSet = []; // keywords need followed by ()
        this.m_bracketKeywordSet.push("if");
        this.m_bracketKeywordSet.push("for");
        this.m_bracketKeywordSet.push("while");
        this.m_bracketKeywordSet.push("switch");
        this.m_bracketKeywordSet.push("catch");
        this.m_bracketKeywordSet.push("function");
        this.m_bracketKeywordSet.push("with");
        this.m_bracketKeywordSet.push("return");
        this.m_bracketKeywordSet.push("throw");
        this.m_bracketKeywordSet.push("delete");

        this.m_declareKeywordSet = [];
        this.m_declareKeywordSet.push("var");
        this.m_declareKeywordSet.push("let");
        this.m_declareKeywordSet.push("const");
        for (let i = 0; i < this.m_declareKeywordSet.length; ++i) {
            this.m_blockMap[this.m_declareKeywordSet[i]] = JSParser.JS_DECL;
        }

    }

    SetInitIndent(initIndent) {
        this.m_initIndent = initIndent;
    }

    Go() {
        this.m_blockStack.push(JSParser.JS_STUB);
        this.m_brcNeedStack.push(true);

        let bHaveNewLine = false;
        let tokenAFirst = '';
        let tokenBFirst = '';

        this.StartParse();

        while (this.GetToken()) {
            bHaveNewLine = false; // bHaveNewLine means there will be newline, m_bNewLine means already has newline
            tokenAFirst = this.m_tokenA.code.charAt(0);
            tokenBFirst = this.m_tokenB.code.length ? this.m_tokenB.code.charAt(0) : 0;
            if (tokenBFirst == '\r') {
                tokenBFirst = '\n';
            }
            if (tokenBFirst == '\n' || this.m_tokenB.type == JSParser.COMMENT_TYPE_1) {
                bHaveNewLine = true;
            }

            if (!this.m_bBlockStmt && this.m_tokenA.code != "{" && this.m_tokenA.code != "\n"
                 && this.m_tokenA.type != JSParser.COMMENT_TYPE_1 && this.m_tokenA.type != JSParser.COMMENT_TYPE_2) {
                this.m_bBlockStmt = true;
            }

            let bCommentInline = false;

            /*
             * process m_tokenA reference by m_tokenB
             * output m_tokenA or not
             * m_tokenB will override m_tokenA in next loop
             */
            //PutToken(m_tokenA);
            switch (this.m_tokenA.type) {
            case JSParser.REGULAR_TYPE:
                if (this.m_tokenPreA.type == JSParser.STRING_TYPE &&
                    !this.m_bracketKeywordSet.includes(this.m_tokenPreA.code)) {
                    this.PutToken(this.m_tokenA, " ");
                } else {
                    this.PutToken(this.m_tokenA); // directly output regular without any format
                }
                break;
            case JSParser.COMMENT_TYPE_1:
            case JSParser.COMMENT_TYPE_2:
                if (this.m_tokenA.code.charAt(1) == '*') {
                    // multiline comment
                    if (!bHaveNewLine) {
                        if (this.IsInlineComment(this.m_tokenA)) {
                            bCommentInline = true;
                        }

                        if (!bCommentInline) {
                            this.PutToken(this.m_tokenA, "", "\n"); // need newline
                        } else if (this.m_tokenB.type != JSParser.OPER_TYPE || this.m_tokenB.code == "{") {
                            // { get space by previous token
                            this.PutToken(this.m_tokenA, "", " "); // no need newline
                        } else {
                            this.PutToken(this.m_tokenA); // no format
                        }
                    } else {
                        this.PutToken(this.m_tokenA);
                    }
                } else {
                    // single line comment
                    this.PutToken(this.m_tokenA); // newline will be there
                }

                // inline comment will be transparent
                if (!bCommentInline) {
                    this.m_bCommentPut = true;
                }

                break;
            case JSParser.OPER_TYPE:
                this.ProcessOper(bHaveNewLine, tokenAFirst, tokenBFirst);
                break;
            case JSParser.STRING_TYPE:
                this.ProcessString(bHaveNewLine, tokenAFirst, tokenBFirst);
                break;
            }
        }

        if (!this.m_bLineTemplate) {
            this.m_lineBuffer = Trim(this.m_lineBuffer);
        }
        if (this.m_lineBuffer.length > 0) {
            this.PutLineBuffer();
        }

        this.EndParse();
    }

    GetFormattedLine(originalLine) {
        if (originalLine <= 0 || this.m_lineFormattedVec.length <= originalLine) {
            return -1;
        }

        for (let l = originalLine; l > 0; --l) {
            let formattedLine = this.m_lineFormattedVec[l];
            if (formattedLine != -1) {
                return formattedLine;
            }
        }

        return -1;
    }

    // void Init(); implement in constructor

    PutChar(ch) {
        // virtual
    }

    PrintAdditionalDebug(strDebugOutput) {
        //char buf[1024] = {0};
        //SNPRINTF(buf, 1000, "Formatted line count: %d\n", m_nFormattedLineCount);
        let buf = "Formatted line count: " + this.m_nFormattedLineCount + "\n";
        //strDebugOutput.append(buf);
        return strDebugOutput + buf;
    }

    PopMultiBlock(previousStackTop) {
        if (this.m_tokenB.code == ";") { // if m_tokenB is ";", then don't do pop here.
            return;
        }

        if (!((previousStackTop == JSParser.JS_IF && this.m_tokenB.code == "else") ||
                (previousStackTop == JSParser.JS_DO && this.m_tokenB.code == "while") ||
                (previousStackTop == JSParser.JS_TRY && this.m_tokenB.code == "catch"))) {
            let topStack = JSParser.GetStackTop(this.m_blockStack);
            if (topStack == undefined) {
                return;
            }
            // ; may end multiple if, do, while, for, try, catch
            while (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR || topStack == JSParser.JS_WHILE ||
                topStack == JSParser.JS_DO || topStack == JSParser.JS_ELSE || topStack == JSParser.JS_TRY || topStack == JSParser.JS_CATCH) {
                if (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR ||
                    topStack == JSParser.JS_WHILE || topStack == JSParser.JS_CATCH ||
                    topStack == JSParser.JS_ELSE || topStack == JSParser.JS_TRY) {
                    this.m_blockStack.pop();
                    --this.m_nIndents;
                } else if (topStack == JSParser.JS_DO) {
                    --this.m_nIndents;
                }

                if ((topStack == JSParser.JS_IF && this.m_tokenB.code == "else") ||
                    (topStack == JSParser.JS_DO /*&& m_tokenB.code == "while"*/) ||
                    (topStack == JSParser.JS_TRY && this.m_tokenB.code == "catch")) {
                    break; // until end with if...else, do..., try...catch
                }
                topStack = JSParser.GetStackTop(this.m_blockStack);
                if (topStack == undefined) {
                    break;
                }
            }
        }
    }

    ProcessOper(bHaveNewLine, tokenAFirst, tokenBFirst) {
        let topStack;
        topStack = JSParser.GetStackTop(this.m_blockStack);
        let strRight = " ";

        if (this.m_tokenA.code == "(" || this.m_tokenA.code == ")" ||
            this.m_tokenA.code == "[" || this.m_tokenA.code == "]" ||
            this.m_tokenA.code == "!" || this.m_tokenA.code == "!!" ||
            this.m_tokenA.code == "~" || this.m_tokenA.code == "." ||
            this.m_tokenA.code == "#") {
            // ()[]!. with no format
            if ((this.m_tokenA.code == ")" || this.m_tokenA.code == "]") &&
                (topStack == JSParser.JS_ASSIGN || topStack == JSParser.JS_HELPER)) {
                if (topStack == JSParser.JS_ASSIGN) {
                    --this.m_nIndents;
                }
                this.m_blockStack.pop();
            }
            topStack = JSParser.GetStackTop(this.m_blockStack);
            if ((this.m_tokenA.code == ")" && topStack == JSParser.JS_BRACKET) ||
                (this.m_tokenA.code == "]" && topStack == JSParser.JS_SQUARE)) {
                // )] need pop stack and reduce indent
                this.m_blockStack.pop();
                --this.m_nIndents;
                topStack = JSParser.GetStackTop(this.m_blockStack);
                if (topStack == JSParser.JS_ASSIGN || topStack == JSParser.JS_HELPER) {
                    this.m_blockStack.pop();
                }
            }

            topStack = JSParser.GetStackTop(this.m_blockStack);
            if (this.m_tokenA.code == ")" && !JSParser.GetStackTop(this.m_brcNeedStack) &&
                (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR || topStack == JSParser.JS_WHILE ||
                    topStack == JSParser.JS_SWITCH || topStack == JSParser.JS_CATCH)) {
                // On top of stack, if, for, while, switch, catch is waiting ), then there will be newline and indent
                // Spaces is for { later, if m_bNLBracket is true, then no space needed
                let rightDeco = this.m_tokenB.code != ";" ? strRight : "";
                if (!bHaveNewLine) {
                    rightDeco += "\n";
                }
                this.PutToken(this.m_tokenA, "", rightDeco);
                //bBracket = true;
                this.m_brcNeedStack.pop();
                this.m_bBlockStmt = false; // wait for statment
                if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_WHILE)) {
                    this.m_blockStack.pop();
                    if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_DO)) {
                        // finish do...while
                        this.m_blockStack.pop();

                        this.PopMultiBlock(JSParser.JS_WHILE);
                    } else {
                        this.m_blockStack.push(JSParser.JS_WHILE);
                        ++this.m_nIndents;
                    }
                } else {
                    ++this.m_nIndents;
                }
            } else if (this.m_tokenA.code == ")" &&
                (this.m_tokenB.code == "{" || this.IsInlineComment(this.m_tokenB) || bHaveNewLine)) {
                this.PutToken(this.m_tokenA, "", strRight); // a space for {, /**/ or newline
            } else if (this.m_tokenA.code == "]" && this.m_tokenB.code == "of") {
                this.PutToken(this.m_tokenA, "", " ");
            } else {
                this.PutToken(this.m_tokenA); // output directly
            }

            if (this.m_tokenA.code == "(" || this.m_tokenA.code == "[") {
                // push ([ into stack and indent
                topStack = JSParser.GetStackTop(this.m_blockStack);
                if (topStack == JSParser.JS_ASSIGN) {
                    if (!this.m_bAssign) {
                        --this.m_nIndents;
                    } else {
                        this.m_blockStack.push(JSParser.JS_HELPER);
                    }
                }
                this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
                ++this.m_nIndents;
            }

            return;
        }

        if (this.m_tokenA.code == ";") {
            topStack = JSParser.GetStackTop(this.m_blockStack);
            if (topStack == JSParser.JS_ASSIGN) {
                --this.m_nIndents;
                this.m_blockStack.pop();
            }

            topStack = JSParser.GetStackTop(this.m_blockStack);

            // ; will end if, else, while, for, try, catch
            if (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR ||
                topStack == JSParser.JS_WHILE || topStack == JSParser.JS_CATCH) {
                this.m_blockStack.pop();
                --this.m_nIndents;
                // for } below, the save operation
                this.PopMultiBlock(topStack);
            }
            if (topStack == JSParser.JS_ELSE || topStack == JSParser.JS_TRY) {
                this.m_blockStack.pop();
                --this.m_nIndents;
                this.PopMultiBlock(topStack);
            }
            if (topStack == JSParser.JS_DO) {
                --this.m_nIndents;
                this.PopMultiBlock(topStack);
            }
            // change count when read "while" after "do"
            // the same to do{}
            if (topStack == JSParser.JS_IMPORT) {
                this.m_blockStack.pop();
            }

            topStack = JSParser.GetStackTop(this.m_blockStack);
            if (topStack != JSParser.JS_BRACKET && !bHaveNewLine && !this.IsInlineComment(this.m_tokenB)) {
                this.PutToken(this.m_tokenA, "", strRight + "\n"); // if not ; in (), then newline
            } else if (topStack == JSParser.JS_BRACKET || this.m_tokenB.type == JSParser.COMMENT_TYPE_1 ||
                this.IsInlineComment(this.m_tokenB)) {
                this.PutToken(this.m_tokenA, "", strRight); // (; )
            } else {
                this.PutToken(this.m_tokenA);
            }

            return; // ;
        }

        if (this.m_tokenA.code == ",") {
            if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN)) {
                --this.m_nIndents;
                this.m_blockStack.pop();
            }
            if (this.m_tokenB.code == "*") {
                strRight = ""; // followed by *
            }
            if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_BLOCK) && !bHaveNewLine) {
                this.m_blockStack.pop();
                if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_IMPORT) ||
                    JSParser.StackTopEq(this.m_blockStack, JSParser.JS_DECL)) {
                    this.PutToken(this.m_tokenA, "", strRight); // inside import/const {}
                } else {
                    this.PutToken(this.m_tokenA, "", strRight + "\n"); // inside {}
                }
                this.m_blockStack.push(JSParser.JS_BLOCK);

            } else {
                this.PutToken(this.m_tokenA, "", strRight);
            }

            return; // ,
        }

        if (this.m_tokenA.code == "{") {
            topStack = JSParser.GetStackTop(this.m_blockStack);
            if (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR ||
                topStack == JSParser.JS_WHILE || topStack == JSParser.JS_DO ||
                topStack == JSParser.JS_ELSE || topStack == JSParser.JS_SWITCH ||
                topStack == JSParser.JS_TRY || topStack == JSParser.JS_CATCH ||
                topStack == JSParser.JS_ASSIGN) {
                if (!this.m_bBlockStmt || topStack == JSParser.JS_ASSIGN) //(topStack == JS_ASSIGN && !m_bAssign))
                {
                    //m_blockStack.pop(); // don't pop now, pop with } later
                    --this.m_nIndents;
                    this.m_bBlockStmt = true;
                } else {
                    this.m_blockStack.push(JSParser.JS_HELPER); // push a JS_HELPER to simplify
                }
            }

            // fix more indents in ({...})
            let bPrevFunc = (topStack == JSParser.JS_FUNCTION);
            let fixTopStack = topStack;
            if (bPrevFunc) {
                this.m_blockStack.pop(); // pop JS_FUNCTION
                fixTopStack = JSParser.GetStackTop(this.m_blockStack);
            }

            if (fixTopStack == JSParser.JS_BRACKET) {
                --this.m_nIndents; // reduce indent for ({
                this.m_blockStack.pop();
                fixTopStack = JSParser.GetStackTop(this.m_blockStack);
                if (this.m_nIndents > 0 && this.m_nIndents > this.m_nLineIndents && this.m_bAssign &&
                    (fixTopStack == JSParser.JS_ASSIGN || fixTopStack == JSParser.JS_HELPER)) {
                    --this.m_nIndents; // reduce indent for =({
                    this.m_indentFixSet.add(this.m_nIndents);
                }
                if (this.m_nIndents == 0 &&
                    (fixTopStack == JSParser.JS_ASSIGN || fixTopStack == JSParser.JS_HELPER)) {
                    this.m_blockStack.pop();
                    if (fixTopStack == JSParser.JS_HELPER) {
                        this.m_blockStack.pop();
                    }
                }
                this.m_blockStack.push(JSParser.JS_BRACKET);
                fixTopStack = JSParser.GetStackTop(this.m_blockStack);
            }

            if (bPrevFunc) {
                this.m_blockStack.push(JSParser.JS_FUNCTION); // push JS_FUNCTION back
            }
            // fix more indents in ({...}), end

            if (topStack != JSParser.JS_IMPORT &&
                topStack != JSParser.JS_DECL) {
                ++this.m_nIndents; // no newline with import/const
            }

            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]); // push and indent

            /*
             * spaces between { are prepared by operator before
             * fix for more space { in newline
             * we can only look forward, no backward
             */
            if (this.m_tokenB.code == "}") {
                // empty {}
                this.m_bEmptyBracket = true;
                if (this.m_bNewLine == false && this.m_struOption.eBracNL == BRAC_NEWLINE.NEWLINE_BRAC &&
                    (topStack == JSParser.JS_IF || topStack == JSParser.JS_FOR ||
                        topStack == JSParser.JS_WHILE || topStack == JSParser.JS_SWITCH ||
                        topStack == JSParser.JS_CATCH || topStack == JSParser.JS_FUNCTION)) {
                    this.PutToken(this.m_tokenA, " "); // a space in these situations
                } else {
                    this.PutToken(this.m_tokenA);
                }
            } else {
                let strLeft = (this.m_struOption.eBracNL == BRAC_NEWLINE.NEWLINE_BRAC &&
                    topStack != JSParser.JS_IMPORT &&
                    topStack != JSParser.JS_DECL &&
                    !this.m_bNewLine) ? "\n" : "";
                if (!bHaveNewLine &&
                    !this.IsInlineComment(this.m_tokenB) &&
                    topStack != JSParser.JS_IMPORT &&
                    topStack != JSParser.JS_DECL) { // need newline
                    this.PutToken(this.m_tokenA, strLeft, strRight + "\n");
                } else {
                    this.PutToken(this.m_tokenA, strLeft, strRight);
                }
            }

            return; // {
        }

        if (this.m_tokenA.code == "}") {
            // agrressive policy, pop } until {
            // make sure all right after {}
            while ((topStack = JSParser.GetStackTop(this.m_blockStack)) != undefined) {
                if (topStack == JSParser.JS_BLOCK) {
                    break;
                }

                this.m_blockStack.pop();

                switch (topStack) {
                case JSParser.JS_IF:
                case JSParser.JS_FOR:
                case JSParser.JS_WHILE:
                case JSParser.JS_CATCH:
                case JSParser.JS_DO:
                case JSParser.JS_ELSE:
                case JSParser.JS_TRY:
                case JSParser.JS_SWITCH:
                case JSParser.JS_ASSIGN:
                case JSParser.JS_FUNCTION:
                case JSParser.JS_HELPER:
                    --this.m_nIndents;
                    break;
                }

                /*if (!GetStackTop(m_blockStack, topStack)) {
                break;
                }*/
            }

            if (topStack == JSParser.JS_BLOCK) {
                // pop and reduce indent
                this.m_blockStack.pop();
                topStack = JSParser.GetStackTop(this.m_blockStack);
                if (topStack != JSParser.JS_IMPORT &&
                    topStack != JSParser.JS_DECL) {
                    --this.m_nIndents;
                }

                if (topStack != undefined) {
                    switch (topStack) {
                    case JSParser.JS_IF:
                    case JSParser.JS_FOR:
                    case JSParser.JS_WHILE:
                    case JSParser.JS_CATCH:
                    case JSParser.JS_ELSE:
                    case JSParser.JS_TRY:
                    case JSParser.JS_SWITCH:
                    case JSParser.JS_ASSIGN:
                    case JSParser.JS_FUNCTION:
                    case JSParser.JS_IMPORT:
                    case JSParser.JS_DECL:
                    case JSParser.JS_HELPER:
                        this.m_blockStack.pop();
                        break;
                    case JSParser.JS_DO:
                        // do left for while
                        break;
                    }
                }
            }

            let leftStyle = "";
            if (!this.m_bNewLine) {
                leftStyle = "\n";
            }
            if (this.m_bEmptyBracket) {
                leftStyle = "";
                strRight += "\n";
                this.m_bEmptyBracket = false;
            }
            if (topStack == JSParser.JS_IMPORT ||
                topStack == JSParser.JS_DECL) {
                leftStyle = " ";
            }

            if ((!bHaveNewLine &&
                    this.m_tokenB.code != ";" && this.m_tokenB.code != "," && this.m_tokenB.code != "=" &&
                    !this.IsInlineComment(this.m_tokenB)) &&
                (this.m_struOption.eBracNL == BRAC_NEWLINE.NEWLINE_BRAC ||
                    !((topStack == JSParser.JS_DO && this.m_tokenB.code == "while") ||
                        (topStack == JSParser.JS_IF && this.m_tokenB.code == "else") ||
                        (topStack == JSParser.JS_TRY && this.m_tokenB.code == "catch") ||
                        ((topStack == JSParser.JS_TRY || topStack == JSParser.JS_CATCH) && this.m_tokenB.code == "finally") ||
                        topStack == JSParser.JS_IMPORT ||
                        topStack == JSParser.JS_DECL ||
                        this.m_tokenB.code == ")"))) {
                if (strRight.length == 0 || strRight.charAt(strRight.length - 1) != '\n') {
                    strRight += "\n"; // no double newline in some situation
                }

                this.PutToken(this.m_tokenA, leftStyle, strRight);
            } else if (this.m_tokenB.type == JSParser.STRING_TYPE ||
                this.m_tokenB.type == JSParser.COMMENT_TYPE_1 ||
                this.IsInlineComment(this.m_tokenB)) {
                this.PutToken(this.m_tokenA, leftStyle, strRight); // space for else
            } else {
                this.PutToken(this.m_tokenA, leftStyle); // }, }; })
            }
            // Do not delete newline before ), not like ,;

            //char tmpTopStack;
            //GetStackTop(m_blockStack, tmpTopStack);
            // fix indent in ({...})
            if (topStack != JSParser.JS_ASSIGN &&
                JSParser.StackTopEq(this.m_blockStack, JSParser.JS_BRACKET)) {
                let prevIndent = this.m_nIndents;
                let bIndentFix = this.m_indentFixSet.has(prevIndent);
                ++this.m_nIndents;
                this.m_blockStack.pop();
                if (bIndentFix &&
                    (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN) ||
                        JSParser.StackTopEq(this.m_blockStack, JSParser.JS_HELPER))) {
                    ++this.m_nIndents; // =({
                }
                this.m_indentFixSet.delete(prevIndent);
                this.m_blockStack.push(JSParser.JS_BRACKET);
                topStack = JSParser.GetStackTop(this.m_blockStack);
            }
            // fix indent in ({...}) end

            this.PopMultiBlock(topStack);

            return; // }
        }

        if (this.m_tokenA.code == "++" || this.m_tokenA.code == "--" ||
            this.m_tokenA.code == "\n" || this.m_tokenA.code == "\r\n") {
            this.PutToken(this.m_tokenA);
            return;
        }

        if (this.m_tokenA.code == ":" && JSParser.StackTopEq(this.m_blockStack, JSParser.JS_CASE)) {
            // case, default
            if (!bHaveNewLine) {
                this.PutToken(this.m_tokenA, "", strRight + "\n");
            } else {
                this.PutToken(this.m_tokenA, "", strRight);
            }
            this.m_blockStack.pop();
            return;
        }

        if (this.m_tokenA.code == "::" || this.m_tokenA.code == "->" || this.m_tokenA.code == "?.") {
            this.PutToken(this.m_tokenA);
            return;
        }

        if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN)) {
            this.m_bAssign = true;
        }

        if (this.m_tokenA.code == "=" && !JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN)) {
            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
            ++this.m_nIndents;
            this.m_bAssign = false;
        }

        if (this.m_tokenA.code == "?") {
            ++this.m_nQuestOperCount;
            this.m_QuestOperStackCount.push(this.m_blockStack.length);
            this.m_QuestOperIndentStack.push(this.m_nIndents);
        }

        if (this.m_tokenA.code == ":") {
            if (this.m_nQuestOperCount > 0 &&
                (JSParser.GetStackTop(this.m_QuestOperStackCount) >= this.m_blockStack.length ||
                    JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN))) {
                let questIndent = this.m_nIndents;
                if (this.m_QuestOperIndentStack.length > 0) {
                    questIndent = JSParser.GetStackTop(this.m_QuestOperIndentStack);
                }

                if (this.m_bNewLine && this.m_nIndents > questIndent) {
                    this.m_nIndents = questIndent;
                }

                // For ternary branches ending with a block literal/function,
                // keep ':' on the same visual line to avoid a dangling ':' line.
                let lineTrim = TrimRightSpace(this.m_lineBuffer);
                let joinWithPrevious = this.m_bNewLine && lineTrim.length > 0 &&
                    lineTrim.charAt(lineTrim.length - 1) == '}';

                --this.m_nQuestOperCount;
                this.m_QuestOperStackCount.pop();
                if (this.m_QuestOperIndentStack.length > 0) {
                    this.m_QuestOperIndentStack.pop();
                }

                if (joinWithPrevious) {
                    this.m_bNewLine = false;
                    let leftPad = " ";
                    if (this.m_lineBuffer.length > 0) {
                        let lineLastChar = this.m_lineBuffer.charAt(this.m_lineBuffer.length - 1);
                        if (lineLastChar == ' ' || lineLastChar == '\t') {
                            leftPad = "";
                        }
                    }
                    this.PutToken(this.m_tokenA, leftPad, " ");
                    return;
                }
            } else {
                this.PutToken(this.m_tokenA, "", " ");
                return;
            }
        }

        this.PutToken(this.m_tokenA, " ", " "); // all the other operators are " "oper" "
    }

    ProcessString(bHaveNewLine, tokenAFirst, tokenBFirst) {
        let bTokenAPropName = false;
        if (this.m_tokenPreA.code == ".") {
            bTokenAPropName = true;
        }

        if (!bTokenAPropName &&
            (this.m_tokenA.code == "case" || this.m_tokenA.code == "default")) {
            // reduce indent for case, default
            --this.m_nIndents;
            let rightDeco = " ";
            if (this.m_tokenA.code == "default" && this.m_tokenB.code == ":") {
                rightDeco = "";
            }
            this.PutToken(this.m_tokenA, "", rightDeco);
            ++this.m_nIndents;
            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
            return;
        }

        if (!bTokenAPropName &&
            (this.m_tokenA.code == "do" ||
                (this.m_tokenA.code == "else" && this.m_tokenB.code != "if") ||
                this.m_tokenA.code == "try" || this.m_tokenA.code == "finally")) {
            // do, else (NOT else if), try
            this.PutToken(this.m_tokenA);

            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
            ++this.m_nIndents; // no need to wait (), give an indent
            this.m_bBlockStmt = false; // wait for statment inside block

            this.PutString(" ");
            if ((this.m_tokenB.type == JSParser.STRING_TYPE || this.m_struOption.eBracNL == BRAC_NEWLINE.NEWLINE_BRAC) && !bHaveNewLine) {
                this.PutString("\n");
            }

            return;
        }

        if (!bTokenAPropName && this.m_tokenA.code == "function") {
            if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN)) {
                --this.m_nIndents;
                this.m_blockStack.pop();
            }
            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]); // push function into stack, if will be poped when read }
        }

        if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_ASSIGN)) {
            this.m_bAssign = true;
        }

        if (this.m_tokenA.code.endsWith("${")) {
            this.m_blockStack.push(JSParser.JS_TEMP_LITE);
        }

        if (JSParser.StackTopEq(this.m_blockStack, JSParser.JS_TEMP_LITE) &&
            this.m_tokenA.code.startsWith("}")) {
            this.m_blockStack.pop();
        }

        if (this.m_tokenB.type == JSParser.STRING_TYPE ||
            this.m_tokenB.type == JSParser.COMMENT_TYPE_1 ||
            this.m_tokenB.type == JSParser.COMMENT_TYPE_2 ||
            this.m_tokenB.code == "{" || this.m_tokenB.code == "#" ||
            (this.m_declareKeywordSet.includes(this.m_tokenA.code) && this.m_tokenB.code == "[")) {
            if (this.m_tokenA.type == JSParser.STRING_TYPE &&
                this.m_tokenA.code.endsWith("${")) {
                this.m_bTemplatePut = true;
                this.PutToken(this.m_tokenA);
                this.m_bTemplatePut = false;
            } else {
                this.PutToken(this.m_tokenA, "", " ");
            }

            //if(m_blockStack.top() != 't' && IsType(m_tokenA))
            //m_blockStack.push('t'); // variable statment

            if (this.m_tokenA.code == "import") {
                this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
            }

            if (this.m_declareKeywordSet.includes(this.m_tokenA.code) && this.m_tokenB.code == "{") {
                this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
            }

            return;
        }

        if (!bTokenAPropName &&
            (this.m_bracketKeywordSet.includes(this.m_tokenA.code) &&
                this.m_tokenB.code != ";")) {
            this.PutToken(this.m_tokenA, "", " ");
        } else if ((this.m_tokenA.code.startsWith("`") || this.m_tokenA.code.startsWith("}")) &&
            (this.m_tokenA.code.endsWith("`") || this.m_tokenA.code.endsWith("${"))) {
            this.m_bTemplatePut = true;
            this.PutToken(this.m_tokenA);
            this.m_bTemplatePut = false;
        } else {
            this.ProcessQuote(this.m_tokenA);
            this.PutToken(this.m_tokenA);
        }

        if (!bTokenAPropName &&
            (this.m_tokenA.code == "if" || this.m_tokenA.code == "for" ||
                this.m_tokenA.code == "while" || this.m_tokenA.code == "catch")) {
            // indent after read ()
            this.m_brcNeedStack.push(false);
            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
        }

        if (!bTokenAPropName && this.m_tokenA.code == "switch") {
            this.m_brcNeedStack.push(false);
            this.m_blockStack.push(this.m_blockMap[this.m_tokenA.code]);
        }
    }

    ProcessQuote(token) {
        let chFirst = token.code.charAt(0);
        let chLast = token.code.charAt(token.code.length - 1);
        if (token.type == JSParser.STRING_TYPE &&
            ((chFirst == '"' && chLast == '"') ||
                (chFirst == '\'' && chLast == '\''))) {
            let tokenNewCode = "";
            let tokenLine = "";
            let tokenLen = token.code.length;
            for (let i = 0; i < tokenLen; ++i) {
                let ch = token.code.charAt(i);
                tokenLine += ch;

                if (ch == '\n' || i == (tokenLen - 1)) {
                    tokenNewCode += TrimSpace(tokenLine);
                    tokenLine = "";
                }
            }

            token.code = tokenNewCode;
        }
    }

    // Put a token out with style
    PutToken(token, leftStyle, rightStyle) {
        // debug
        /*size_t length = token.size();
        for(size_t i = 0; i < length; ++i)
        PutChar(token[i]);
        PutChar('\n');*/
        // debug

        if (leftStyle == undefined) {
            leftStyle = "";
        }
        if (rightStyle == undefined) {
            rightStyle = "";
        }

        this.PutString(leftStyle);
        this.PutString(token);
        this.PutString(rightStyle);
        if (!(this.m_bCommentPut && this.m_bNewLine)) {
            this.m_bCommentPut = false; // must happen after output comment
        }
    }

    PutString(token) {
        if (typeof token === "string" || token instanceof String) {
            let str = token;
            let tokenWrapper = new JSParser.Token();
            tokenWrapper.type = JSParser.NOT_TOKEN;
            tokenWrapper.code = str;
            tokenWrapper.inlineComment = false;
            tokenWrapper.line = -1;

            this.PutString(tokenWrapper);
            return;
        }

        let length = token.code.length;
        //char topStack = m_blockStack.top();
        for (let i = 0; i < length; ++i) {
            if (this.m_bNewLine && (this.m_bCommentPut ||
                    ((this.m_struOption.eBracNL == BRAC_NEWLINE.NEWLINE_BRAC || token.code.charAt(i) != '{') &&
                        token.code.charAt(i) != ',' && token.code.charAt(i) != ';' && !this.IsInlineComment(token)))) {
                // real newline until not {,; after newline
                this.PutLineBuffer(); // output line buffer

                this.m_lineBuffer = "";
                this.m_bLineTemplate = false;
                this.m_bNewLine = false;
                this.m_nIndents = this.m_nIndents < 0 ? 0 : this.m_nIndents; // fix anyway
                this.m_nLineIndents = this.m_nIndents;
                if (token.code.charAt(i) == '{' || token.code.charAt(i) == ',' || token.code.charAt(i) == ';') { // no newline for {,; if line is end with comment
                    --this.m_nLineIndents;
                }
            }

            if (this.m_bNewLine && !this.m_bCommentPut &&
                ((this.m_struOption.eBracNL == BRAC_NEWLINE.NO_NEWLINE_BRAC && token.code.charAt(i) == '{') ||
                    token.code.charAt(i) == ',' || token.code.charAt(i) == ';' || this.IsInlineComment(token))) {
                this.m_bNewLine = false;
            }

            if (this.m_lineBuffer.length == 0 && this.m_bTemplatePut) {
                this.m_bLineTemplate = true;
            }

            if (token.code.charAt(i) == '\n') {
                this.m_bNewLine = true;
            } else {
                this.m_lineBuffer += token.code.charAt(i);
                let tokenLine = token.line;
                if (tokenLine != -1) {
                    this.m_lineWaitVec.push(tokenLine);
                }
            }
        }
    }

    PutLineBuffer() {
        // Map original line count to formatted line count
        let i = 0;
        while (1) {
            if (i >= this.m_lineWaitVec.length) {
                this.m_lineWaitVec = [];
                break;
            }

            let oldLine = this.m_lineWaitVec[i];
            if (oldLine >= this.m_lineFormattedVec.length) {
                //m_lineFormattedVec.resize(m_lineFormattedVec.size() * 2, -1);
                let curLen = this.m_lineFormattedVec.length;
                for (let growth = curLen; growth <= curLen * 2; ++growth) {
                    // init -1
                    this.m_lineFormattedVec[growth] = -1;
                }
                continue;
            }

            if (this.m_lineFormattedVec[oldLine] == -1) {
                this.m_lineFormattedVec[oldLine] = this.m_nFormattedLineCount;
            }
            ++i;
        }

        let line = "";
        if (this.m_bLineTemplate && this.m_bTemplatePut) {
            line += this.m_lineBuffer; // output Template String directly
        } else {
            line += TrimRightSpace(this.m_lineBuffer);
        }

        if ((!this.m_bLineTemplate || (this.m_bTemplatePut && this.m_lineBuffer.charAt(0) == '`')) &&
            (line != "" || this.m_struOption.eEmpytIndent == EMPTYLINE_INDENT.INDENT_IN_EMPTYLINE)) // Fix "JSLint unexpect space" bug
        {
            for (let i = 0; i < this.m_initIndent.length; ++i) {
                this.PutChar(this.m_initIndent.charAt(i)); // first, output init indent
            }

            for (let c = 0; c < this.m_nLineIndents; ++c) {
                for (let c2 = 0; c2 < this.m_struOption.nChPerInd; ++c2) {
                    this.PutChar(this.m_struOption.chIndent); // output indent
                }
            }
        }

        // add newline
        if (this.m_struOption.eCRPut == CR_PUT.PUT_CR) {
            line += "\r"; //PutChar('\r');
        }
        line += "\n"; //PutChar('\n');

        // output line
        for (let i = 0; i < line.length; ++i) {
            let ch = line.charAt(i);
            this.PutChar(ch);
            if (ch == '\n') {
                ++this.m_nFormattedLineCount;
            }
        }
    }
}

// exports
exports.VERSION = VERSION;

exports.CR_READ = CR_READ;
exports.CR_PUT = CR_PUT;
exports.BRAC_NEWLINE = BRAC_NEWLINE;
exports.EMPTYLINE_INDENT = EMPTYLINE_INDENT;

exports.FormatterOption = FormatterOption;

exports.RealJSFormatter = RealJSFormatter;

//console.log(exports);
