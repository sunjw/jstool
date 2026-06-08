#ifndef _OPTIONS_DLG_H_
#define _OPTIONS_DLG_H_
#include "PluginInterface.h"
#include "menuCmdID.h"
#include "utility.h"

extern StruOptions g_struOptions;
extern NppData g_nppData;

BOOL CALLBACK dlgProcOptions(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam);

void setIndent(HWND hwnd, BOOL bSpace);

#endif
