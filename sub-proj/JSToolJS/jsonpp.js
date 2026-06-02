/* jsonpp.js
2019-1-14

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

const JSParser = require('./jsparser.js');

const VERSION = JSParser.VERSION;

function JsonMapToString(jsonMap, nRecuLevel, sort) {
    let ret = "";

    ++nRecuLevel;

    ret += "{";
    ret += "\n";

    let keysItr = jsonMap.keys();
    let keysArray = Array.from(keysItr);
    if (sort) {
        keysArray.sort();
    }
    for (let i = 0; i < keysArray.length; ++i) {
        let key = keysArray[i];
        let value = jsonMap.get(key);

        for (let r = 0; r < nRecuLevel; ++r) {
            ret += "\t";
        }
        ret += "\"";
        ret += key;
        ret += "\"";
        ret += ": ";
        if (!sort) {
            ret += value.ToString(nRecuLevel);
        } else {
            ret += value.ToStringSorted(nRecuLevel);
        }
        if (i != (keysArray.length - 1)) {
            ret += ",";
        }
        ret += "\n";
    }

    for (let r = 0; r < nRecuLevel - 1; ++r) {
        ret += "\t";
    }
    ret += "}";

    return ret;
}

class JsonValue {
    /*
     * Constructors
     * Default is string value
     */
    constructor(value = "", type = JsonValue.STRING_VALUE) {
        this.line = -1;
        this.m_valType = type;
        this.m_value = value;
    }

    // Get value
    GetValue() {
        return this.m_value;
    }

    // Set string value
    SetStrValue(str) {
        if (this.m_valType != JsonValue.STRING_VALUE &&
            this.m_valType != JsonValue.NUMBER_VALUE &&
            this.m_valType != JsonValue.BOOL_VALUE &&
            this.m_valType != JsonValue.REGULAR_VALUE &&
            this.m_valType != JsonValue.UNKNOWN_VALUE) {
            this.ChangeType(JsonValue.STRING_VALUE);
        }
        this.m_value = str;
    }

    // Set array value
    SetArrayValue(jArray) {
        this.ChangeType(JsonValue.ARRAY_VALUE);
        this.m_value = jArray;
    }

    // Set map value
    SetMapValue(jMap) {
        this.ChangeType(JsonValue.MAP_VALUE);
        this.m_value = jMap;
    }

    // Type of value this stored
    GetValueType() {
        return this.m_valType;
    }

    // Set value mode
    SetValueType(valType) {
        this.ChangeType(valType);
    }

    ChangeType(newType) {
        switch (newType) {
        case JsonValue.STRING_VALUE:
        case JsonValue.NUMBER_VALUE:
        case JsonValue.BOOL_VALUE:
        case JsonValue.REGULAR_VALUE:
        case JsonValue.UNKNOWN_VALUE:
            this.m_value = "";
            break;
        case JsonValue.MAP_VALUE:
            this.m_value = new Map();
            break;
        case JsonValue.ARRAY_VALUE:
            this.m_value = [];
            break;
        }

        this.m_valType = newType;
    }

    // Put key-value pair into array value
    ArrayPut(value) {
        this.m_value.push(value);
    }

    // Put key-value pair into map value
    MapPut(key, value) {
        this.m_value.set(key, value);
    }

    // Has specified string key for map value, or has specified index for array value
    HasKey(key) {
        if (this.m_valType == JsonValue.MAP_VALUE) {
            return this.m_value.has(key);
        }
        if (this.m_valType == JsonValue.ARRAY_VALUE) {
            return (this.m_value.length > key);
        }
        return false;
    }

    ToString(nRecuLevel = 0, sort = false) {
        let ret = "";

        switch (this.m_valType) {
        case JsonValue.STRING_VALUE:
            ret += "\"";
            ret += this.m_value;
            ret += "\"";
            break;
        case JsonValue.NUMBER_VALUE:
        case JsonValue.BOOL_VALUE:
        case JsonValue.REGULAR_VALUE:
        case JsonValue.UNKNOWN_VALUE:
            ret += this.m_value;
            break;
        case JsonValue.MAP_VALUE:
            let mapString = JsonMapToString(this.m_value, nRecuLevel, sort);
            ret += mapString;
            break;
        case JsonValue.ARRAY_VALUE:
            ret += "[";

            for (let i = 0; i < this.m_value.length; ++i) {
                let value = this.m_value[i];

                ret += value.ToString(nRecuLevel, sort);
                if (i != (this.m_value.length - 1)) {
                    ret += ", ";
                }
            }

            ret += "]";
            break;
        }

        return ret;
    }

    ToStringSorted(nRecuLevel = 0) {
        return this.ToString(nRecuLevel, true);
    }
}

JsonValue.STRING_VALUE = 0x00;
JsonValue.NUMBER_VALUE = 0x01;
JsonValue.BOOL_VALUE = 0x02;
JsonValue.REGULAR_VALUE = 0x03;
JsonValue.UNKNOWN_VALUE = 0x04;
JsonValue.ARRAY_VALUE = 0x10;
JsonValue.MAP_VALUE = 0x20;

class JsonParser extends JSParser.JSParser {
    constructor() {
        super();

        this.m_nRecuLevel = 0;
    }

    Go(jsonValue) {
        this.RecursiveProc(jsonValue);
    }

    RecursiveProc(jsonValue) {
        // initial job
        if (this.m_nRecuLevel == 0) {
            this.StartParse();

            jsonValue.SetValueType(JsonValue.UNKNOWN_VALUE);
        }

        ++this.m_nRecuLevel;
        // initial job

        let stackTop = JSParser.GetStackTop(this.m_blockStack);
        if (stackTop == undefined) {
            stackTop = JSParser.JS_EMPTY;
        }

        let key,
        strValue;
        let keyLine = -1,
        valLine = -1;
        let bGetKey = false;
        let bGetSplitor = false;
        while (this.GetToken()) // Get next m_tokenA, m_tokenB
        {
            // JsonParser ignore newline, other parser may not
            if (this.m_tokenA.code == "\r\n" ||
                this.m_tokenA.code == "\n" ||
                this.m_tokenA.type == JSParser.COMMENT_TYPE_1 ||
                this.m_tokenA.type == JSParser.COMMENT_TYPE_2) {
                continue;
            }

            /*
             * until here, finish reading m_tokenA, m_tokenB
             * merged multiple newline
             * already recognized positive/negative
             * already recognized regex
             */
            if (this.m_tokenA.code == "{") {
                this.m_blockStack.push(JSParser.JS_BLOCK);
                let blockLine = this.m_tokenA.line;

                if (stackTop == JSParser.JS_EMPTY) {
                    jsonValue.SetValueType(JsonValue.MAP_VALUE);
                    this.RecursiveProc(jsonValue);
                } else {
                    if (stackTop == JSParser.JS_SQUARE) {
                        jsonValue.ArrayPut(new JsonValue());

                        let curArray = jsonValue.GetValue();
                        let innerValue = curArray[curArray.length - 1];
                        innerValue.SetValueType(JsonValue.MAP_VALUE);

                        this.RecursiveProc(innerValue);

                        innerValue.line = blockLine;
                    } else if (stackTop == JSParser.JS_BLOCK) {
                        jsonValue.MapPut(key, new JsonValue());

                        let innerValue = jsonValue.GetValue().get(key);
                        innerValue.SetValueType(JsonValue.MAP_VALUE);

                        this.RecursiveProc(innerValue);

                        bGetKey = false;
                        bGetSplitor = false;
                        innerValue.line = keyLine;
                    }
                }

                continue;
            }

            if (this.m_tokenA.code == "}") {
                bGetKey = false;
                bGetSplitor = false;

                if (this.m_blockStack.length > 0) {
                    this.m_blockStack.pop();
                    --this.m_nRecuLevel;
                }

                return;
            }

            if (this.m_tokenA.code == "[") {
                this.m_blockStack.push(JSParser.JS_SQUARE);
                let squareLine = this.m_tokenA.line;

                if (stackTop == JSParser.JS_EMPTY) {
                    jsonValue.SetValueType(JsonValue.ARRAY_VALUE);
                    this.RecursiveProc(jsonValue);
                } else {
                    if (stackTop == JSParser.JS_SQUARE) {
                        jsonValue.ArrayPut(new JsonValue());

                        let curArray = jsonValue.GetValue();
                        let innerValue = curArray[curArray.length - 1];
                        innerValue.SetValueType(JsonValue.ARRAY_VALUE);

                        this.RecursiveProc(innerValue);

                        innerValue.line = squareLine;
                    } else if (stackTop == JSParser.JS_BLOCK) {
                        jsonValue.MapPut(key, new JsonValue());

                        let innerValue = jsonValue.GetValue().get(key);
                        innerValue.SetValueType(JsonValue.ARRAY_VALUE);

                        this.RecursiveProc(innerValue);

                        bGetKey = false;
                        bGetSplitor = false;
                        innerValue.line = keyLine;
                    }
                }

                continue;
            }

            if (this.m_tokenA.code == "]") {
                if (this.m_blockStack.length > 0) {
                    this.m_blockStack.pop();
                    --this.m_nRecuLevel;
                }

                return;
            }

            if (stackTop == JSParser.JS_BLOCK) {
                if (!bGetKey && this.m_tokenA.code != ",") {
                    key = this.m_tokenA.code;
                    keyLine = this.m_tokenA.line;

                    if ((key.charAt(0) == '\'' && key.charAt(key.length - 1) == '\'') ||
                        (key.charAt(0) == '"' && key.charAt(key.length - 1) == '"')) {
                        key = key.substring(1, key.length - 1);
                    }

                    bGetKey = true;
                    continue;
                }

                if (bGetKey && !bGetSplitor && this.m_tokenA.code == ":") {
                    bGetSplitor = true;
                    continue;
                }

                if (bGetKey && bGetSplitor) {
                    strValue = this.ReadStrValue();
                    valLine = this.m_tokenA.line;

                    jsonValue.MapPut(key, new JsonValue());
                    let jValue = jsonValue.GetValue().get(key);
                    this.GenStrJsonValue(jValue, strValue);

                    jValue.line = keyLine;

                    bGetKey = false;
                    bGetSplitor = false;
                }
            }

            if (stackTop == JSParser.JS_SQUARE) {
                if (this.m_tokenA.code != ",") {
                    strValue = this.ReadStrValue();
                    valLine = this.m_tokenA.line;

                    let jValue = new JsonValue();
                    this.GenStrJsonValue(jValue, strValue);
                    jValue.line = valLine;

                    jsonValue.ArrayPut(jValue);
                }
            }
        }

        // finished job
        if (this.m_nRecuLevel == 1) {
            //FlushLineBuffer();

            this.EndParse();
        }
        // finished job
    }

    ReadStrValue() {
        let ret = this.m_tokenA.code;
        // fix decimal number value bug
        if (this.m_tokenB.code == ".") {
            // maybe it's a decimal
            let strDec = this.m_tokenA.code;
            this.GetToken();
            strDec += ".";
            strDec += this.m_tokenB.code;
            ret = strDec;
            this.GetToken();
        }

        return ret;
    }

    GenStrJsonValue(jsonValue, value) {
        if (value.charAt(0) == '\'' || value.charAt(0) == '"') {
            if ((value.charAt(0) == '\'' && value.charAt(value.length - 1) == '\'') ||
                (value.charAt(0) == '"' && value.charAt(value.length - 1) == '"')) {
                value = value.substring(1, value.length - 1);
            }

            /*
             * STRING_VALUE store without quote
             * it will output with "..."
             * so escape quote in STRING_VALUE
             */
            value = JSParser.StringReplaceAll(value, "\\\\'", "'");
            value = JSParser.StringReplaceAll(value, '\\\\"', '"');
            value = JSParser.StringReplaceAll(value, '\\"', '\\\"');

            jsonValue.SetValueType(JsonValue.STRING_VALUE);
        } else if (this.IsNumChar(value.charAt(0)) || value.charAt(0) == '-' || value.charAt(0) == '+') {
            jsonValue.SetValueType(JsonValue.NUMBER_VALUE);
        } else if (value == "true" || value == "false") {
            jsonValue.SetValueType(JsonValue.BOOL_VALUE);
        } else if (value.charAt(0) == '/') {
            jsonValue.SetValueType(JsonValue.REGULAR_VALUE);
        } else {
            jsonValue.SetValueType(JsonValue.UNKNOWN_VALUE);
        }

        jsonValue.SetStrValue(value);
    }
}

// exports
exports.VERSION = VERSION;

exports.JsonValue = JsonValue;
exports.JsonParser = JsonParser;
