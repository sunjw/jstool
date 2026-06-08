#include <Windows.h>
#include <tchar.h>
#include "Shlwapi.h"

#include "PluginInterface.h"
#include "IniFileProcessor.h"
#include "utility.h"

tstring GetConfigFilePath(HWND nppHandle)
{
	tstring strConfigFilePath;

	TCHAR szConfigDir[MAX_PATH];
	TCHAR szBuffer[MAX_PATH];
	szConfigDir[0] = 0;
	::SendMessage(nppHandle, NPPM_GETPLUGINSCONFIGDIR, 
		MAX_PATH, (LPARAM)szConfigDir);
	::PathCombine(szBuffer, szConfigDir, TEXT("JSMinNpp.ini"));
	strConfigFilePath = szBuffer;

	return strConfigFilePath;
}

void LoadOption(HWND nppHandle, StruOptions& struOptions)
{
	LoadDefaultOption(struOptions);
	tstring tsConfigFilePath = GetConfigFilePath(nppHandle);

	IniFileProcessor processor(tsConfigFilePath);
	IniFileProcessor::IniMap map;

	map = processor.GetInfo(true);
	IniFileProcessor::IniMap::iterator itrEnd = map.end();

	if (map.find(keyPutCR) != itrEnd)
	{
		struOptions.nPutCR = atoi(map[keyPutCR].GetStrValue().c_str());
		if (struOptions.nPutCR != EOL_AUTO &&
			struOptions.nPutCR != EOL_CRLF &&
			struOptions.nPutCR != EOL_LF)
		{
			struOptions.nPutCR = EOL_AUTO;
		}
	}

	if (map.find(keyChIndent) != itrEnd)
	{
		string strIndent = map[keyChIndent].GetStrValue();
		if (!strIndent.compare(OPT_INDENT_TAB))
		{
			struOptions.chIndent = INDENT_TAB;
		}
		else if (!strIndent.compare(OPT_INDENT_SPACE))
		{
			struOptions.chIndent = INDENT_SPACE;
		}
	}

	if (map.find(keyChPerInd) != itrEnd)
	{
		struOptions.nChPerInd = atoi(map[keyChPerInd].GetStrValue().c_str());
	}

	if (map.find(keyKeepTopComt) != itrEnd)
	{
		if (!map[keyKeepTopComt].GetStrValue().compare("1"))
		{
			struOptions.bKeepTopComt = true;
		}
	}

	if (map.find(keyIndentInEmpty) != itrEnd)
	{
		if (!map[keyIndentInEmpty].GetStrValue().compare("1"))
		{
			struOptions.bIndentInEmpty = true;
		}
	}

	if (map.find(keyDisableVersionCheck) != itrEnd)
	{
		if (!map[keyDisableVersionCheck].GetStrValue().compare("1"))
		{
			struOptions.bDisableVersionCheck = true;
		}
	}
}

void LoadDefaultOption(StruOptions& struOptions)
{
	struOptions.nPutCR = EOL_AUTO;
	struOptions.chIndent = INDENT_SPACE;
	struOptions.nChPerInd = 4;
	struOptions.bNLBracket = false;
	struOptions.bKeepTopComt = false;
	struOptions.bIndentInEmpty = false;
	struOptions.bDisableVersionCheck = false;
}

void SaveOption(HWND nppHandle, StruOptions struOptions)
{
	tstring tsConfigFilePath = GetConfigFilePath(nppHandle);

	IniFileProcessor processor(tsConfigFilePath);
	IniFileProcessor::IniMap map;
	
	char buffer[256] = {0};

	_itoa_s(struOptions.nPutCR, buffer, 250, 10);
	map[keyPutCR] = IniValue(string(buffer));
	map[keyChIndent] = IniValue(struOptions.chIndent == INDENT_TAB ? OPT_INDENT_TAB : OPT_INDENT_SPACE);
	_itoa_s(struOptions.nChPerInd, buffer, 250, 10);
	map[keyChPerInd] = IniValue(string(buffer));
	map[keyNLBracket] = IniValue(struOptions.bNLBracket ? string("1") : string("0"));
	map[keyKeepTopComt] = IniValue(struOptions.bKeepTopComt ? string("1") : string("0"));
	map[keyIndentInEmpty] = IniValue(struOptions.bIndentInEmpty ? string("1") : string("0"));
	map[keyDisableVersionCheck] = IniValue(struOptions.bDisableVersionCheck ? string("1") : string("0"));

	processor.SetMap(map);

	processor.Save();
}

void CopyText(LPCTSTR lpcText)
{
	HGLOBAL hMoveable;
	LPTSTR pszArr;

	size_t textLen = _tcslen(lpcText);

	size_t bytes = (textLen + 1)*sizeof(TCHAR);
	hMoveable = GlobalAlloc(GMEM_MOVEABLE, bytes);
	pszArr = (LPTSTR)GlobalLock(hMoveable);
	ZeroMemory(pszArr, bytes);
	_tcscpy_s(pszArr, textLen + 1, lpcText);
	GlobalUnlock(hMoveable);

	OpenClipboard(NULL);
	EmptyClipboard();
	SetClipboardData(CF_UNICODETEXT, hMoveable);
	CloseClipboard();
}

float GetDesktopScale(HWND hWnd)
{
	HDC hdc = GetDC(hWnd);
	float fScale = GetDeviceCaps(hdc, LOGPIXELSX) / 96.0f;
	ReleaseDC(hWnd, hdc);
	return fScale;
}
