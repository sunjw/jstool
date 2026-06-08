const vscode = require('vscode');
const VSCUtils = require("./vscutils.js");
const JsonPP = require("./jsonpp.js");

const CTX_ROOT_NODE = "rootNode";
const CTX_COLLAP_NODE = "collapNode";
const CTX_LEAF_NODE = "leafNode";

function convertJsonValueToString(value) {
    if (typeof value !== 'string' && !(value instanceof String)) {
        return value.toString();
    }
    return value;
}

class JsonTreeNode {
    constructor(key, value, parent) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = 0;
        this.treeItem = 0;
        this.valueLabel = "";
    }
}

class JsonTreeProvider {
    /*
     * A implementation of TreeDataProvider
     */
    constructor(rootJsonValue) {
        this.rootNode = new JsonTreeNode("$", rootJsonValue, 0);
    }

    isRootNode(element) {
        if (!element) {
            return false;
        }
        return (element.parent == 0);
    }

    getTreeItem(element) {
        let treeItem = element.treeItem;
        if (treeItem != 0) {
            return treeItem;
        }

        let collapState = vscode.TreeItemCollapsibleState.NONE;

        let itemLabel = element.key;
        let jsonValue = element.value;

        let valueType = jsonValue.GetValueType();
        let valueLabel = "";
        switch (valueType) {
        case JsonPP.JsonValue.MAP_VALUE:
            valueLabel = "[Object]";
            collapState = vscode.TreeItemCollapsibleState.Collapsed;
            break;
        case JsonPP.JsonValue.ARRAY_VALUE:
            valueLabel = "[Array]";
            collapState = vscode.TreeItemCollapsibleState.Collapsed;
            break;
        default:
            valueLabel = jsonValue.ToString();
            break;
        }

        let isRoot = this.isRootNode(element);
        if (isRoot) {
            collapState = vscode.TreeItemCollapsibleState.Expanded;
        } else {
            itemLabel = itemLabel + ": " + valueLabel;
        }

        element.valueLabel = valueLabel;

        treeItem = new vscode.TreeItem(itemLabel, collapState);
        treeItem.command = {
            command: "extension.JSONTreeViewClickItem",
            title: "Select JSON Tree View Item",
            arguments: [element]
        };
        if (collapState == vscode.TreeItemCollapsibleState.NONE) {
            treeItem.contextValue = CTX_LEAF_NODE;
        } else if (isRoot) {
            treeItem.contextValue = CTX_ROOT_NODE;
        } else {
            treeItem.contextValue = CTX_COLLAP_NODE;
        }

        element.treeItem = treeItem;
        return element.treeItem;
    }

    getParent(element) {
        if (!element) {
            return undefined;
        }
        return element.parent;
    }

    getChildren(element) {
        if (element) {
            let children = element.children;
            if (children != 0) {
                return children;
            }

            children = [];
            let jsonValue = element.value;
            let valueType = jsonValue.GetValueType();
            switch (valueType) {
            case JsonPP.JsonValue.MAP_VALUE:
                let mapValue = jsonValue.GetValue();
                let keysItr = mapValue.keys();
                let keysArray = Array.from(keysItr);
                for (let i = 0; i < keysArray.length; ++i) {
                    let key = keysArray[i];
                    let value = mapValue.get(key);
                    children.push(new JsonTreeNode(key, value, element));
                }
                break;
            case JsonPP.JsonValue.ARRAY_VALUE:
                let arrayValue = jsonValue.GetValue();
                for (let i = 0; i < arrayValue.length; ++i) {
                    let value = arrayValue[i];
                    children.push(new JsonTreeNode(i, value, element));
                }
                break;
            }

            element.children = children;
            return children;
        } else {
            // Root
            return [this.rootNode];
        }
    }

    clickElem(textEditor, element) {
        if (!textEditor || !element) {
            return;
        }
        let line = element.value.line - 1;
        if (line >= 0) {
            VSCUtils.moveToLine(textEditor, line);
        }
    }

    copyElem(element) {
        if (!element) {
            return;
        }
        let treeItem = element.treeItem;
        VSCUtils.copyToClipboard(treeItem.label);
    }

    copyElemName(element) {
        if (!element) {
            return;
        }
        let keyString = convertJsonValueToString(element.key);
        VSCUtils.copyToClipboard(keyString);
    }

    copyElemValue(element, raw) {
        if (!element) {
            return;
        }
        let valueLabel = element.valueLabel;
        if (raw) {
            VSCUtils.copyToClipboard(valueLabel);
            return;
        }
        if (valueLabel == "undefined") {
            VSCUtils.copyToClipboard(valueLabel);
            return;
        }
        let valueToEscape = "{\"value\":" + valueLabel + "}";
        let valueJson = JSON.parse(valueToEscape);
        let valueEscaped = valueJson.value;
        if (typeof valueEscaped !== 'string' && !(valueEscaped instanceof String)) {
            valueEscaped = JSON.stringify(valueEscaped);
        }
        VSCUtils.copyToClipboard(valueEscaped);
    }

    copyElemPath(element) {
        let jsonPath = "";
        while (element) {
            let elemKey = element.key;
            let elemValue = element.value;
            let elemParent = this.getParent(element);
            if (elemParent) {
                let elementParentType = elemParent.value.GetValueType();
                if (elementParentType == JsonPP.JsonValue.ARRAY_VALUE) {
                    elemKey = "[" + elemKey + "]";
                }
            }
            if (jsonPath == "") {
                jsonPath = jsonPath + elemKey;
            } else {
                let elementValueType = elemValue.GetValueType();
                if (elementValueType == JsonPP.JsonValue.ARRAY_VALUE) {
                    jsonPath = elemKey + jsonPath;
                } else {
                    jsonPath = elemKey + "." + jsonPath;
                }
            }
            element = elemParent;
        }
        VSCUtils.copyToClipboard(jsonPath);
    }
}

exports.JsonTreeProvider = JsonTreeProvider
