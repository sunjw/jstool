#ifndef _UTILITY_H_
#define _UTILITY_H_

#include <string>
#include "strhelper.h"

using namespace std;
using namespace sunjwbase;

const int EOL_LF = 0; // \n
const int EOL_CRLF = 1; // \r\n
const int EOL_AUTO = 3;
const char INDENT_TAB = '\t';
const char INDENT_SPACE = ' ';
const string OPT_INDENT_TAB = string("tab");
const string OPT_INDENT_SPACE = string("space");

struct StruOptions
{
	int nPutCR; // 是否输出 \r\n
	char chIndent; // 缩进用的字符
	int nChPerInd; // 每个缩进使用几个字符
	bool bNLBracket; // { 之前是否换行
	bool bKeepTopComt; // 是否保留头部的注释
	bool bIndentInEmpty; // 是否保留空行中的缩进
	bool bDisableVersionCheck; // 是否关闭自动版本检查
};

const string keyPutCR("Put CR");
const string keyChIndent("Indent char");
const string keyChPerInd("Chars per indent");
const string keyNLBracket("New line before {");
const string keyKeepTopComt("Kepp top comment");
const string keyIndentInEmpty("Indent in empty");
const string keyDisableVersionCheck("Disable version check");

tstring GetConfigFilePath(HWND nppHandle);

void LoadOption(HWND nppHandle, StruOptions& struOptions);
void LoadDefaultOption(StruOptions& struOptions);

void SaveOption(HWND nppHandle, StruOptions struOptions);

void CopyText(LPCTSTR lpcText);

float GetDesktopScale(HWND hWnd);

#endif
