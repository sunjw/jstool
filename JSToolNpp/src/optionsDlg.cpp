#include "resource.h"
#include "comDef.h"
#include "optionsDlg.h"
#include "utility.h"

BOOL CALLBACK dlgProcOptions(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam) 
{
	switch (message) 
	{
	case WM_INITDIALOG:
		// 初始化
		switch (g_struOptions.nPutCR)
		{
		case EOL_AUTO:
			CheckRadioButton(hwnd, IDC_WINRADIO, IDC_AUTORADIO, IDC_AUTORADIO);
			break;
		case EOL_CRLF:
			CheckRadioButton(hwnd, IDC_WINRADIO, IDC_AUTORADIO, IDC_WINRADIO);
			break;
		case EOL_LF:
			CheckRadioButton(hwnd, IDC_WINRADIO, IDC_AUTORADIO, IDC_UNIXRADIO);
			break;
		}

		if (g_struOptions.bKeepTopComt)
		{
			CheckDlgButton(hwnd, IDC_KEEPCOMTCHECK, TRUE);
		}
		else
		{
			CheckDlgButton(hwnd, IDC_KEEPCOMTCHECK, FALSE);
		}

		setIndent(hwnd, (g_struOptions.chIndent == INDENT_SPACE ? TRUE : FALSE));

		if (g_struOptions.bIndentInEmpty)
		{
			CheckDlgButton(hwnd, IDC_EMPTYINDENT, TRUE);
		}
		else
		{
			CheckDlgButton(hwnd, IDC_EMPTYINDENT, FALSE);
		}

		if (g_struOptions.bDisableVersionCheck)
		{
			CheckDlgButton(hwnd, IDC_NEWVERSIONCHECK, TRUE);
		}
		else
		{
			CheckDlgButton(hwnd, IDC_NEWVERSIONCHECK, FALSE);
		}

		return TRUE;
	case WM_COMMAND:
		switch (LOWORD(wParam))
		{
		case IDCLOSE:
		case IDCANCEL:
			// 重新读取配置
			LoadOption(g_nppData._nppHandle, g_struOptions);
			::EndDialog(hwnd, 0);
			return TRUE;
		case IDOK:
			// 保存设置
			if (IsDlgButtonChecked(hwnd, IDC_AUTORADIO))
			{
				g_struOptions.nPutCR = EOL_AUTO;
			}
			else if (IsDlgButtonChecked(hwnd, IDC_WINRADIO))
			{
				g_struOptions.nPutCR = EOL_CRLF;
			}
			else if (IsDlgButtonChecked(hwnd, IDC_UNIXRADIO))
			{
				g_struOptions.nPutCR = EOL_LF;
			}
			g_struOptions.chIndent = IsDlgButtonChecked(hwnd, IDC_SPACECHECK) ? INDENT_SPACE : INDENT_TAB;
			g_struOptions.bKeepTopComt = 
				IsDlgButtonChecked(hwnd, IDC_KEEPCOMTCHECK) ? true : false;
			g_struOptions.bIndentInEmpty = 
				IsDlgButtonChecked(hwnd, IDC_EMPTYINDENT) ? true : false;
			g_struOptions.bDisableVersionCheck = 
				IsDlgButtonChecked(hwnd, IDC_NEWVERSIONCHECK) ? true : false;

			TCHAR buffer[256];
			GetWindowText(GetDlgItem(hwnd, IDC_COUNTEDIT), buffer, 255);
			#if defined(UNICODE) || defined(_UNICODE)
			g_struOptions.nChPerInd = _wtoi(buffer);
			#else
			g_struOptions.nChPerInd = atoi(buffer);
			#endif

			SaveOption(g_nppData._nppHandle, g_struOptions);

			// 重新读取配置
			LoadOption(g_nppData._nppHandle, g_struOptions);

			::EndDialog(hwnd, 0);
			return TRUE;
		case IDC_STATIC_USE:
		case IDC_STATIC_SPACE:
			setIndent(hwnd, !IsDlgButtonChecked(hwnd, IDC_SPACECHECK));
			return TRUE;
		case IDC_SPACECHECK:
			setIndent(hwnd, IsDlgButtonChecked(hwnd, IDC_SPACECHECK));
			return TRUE;
		}
		return FALSE;
	}
	return FALSE;
}

void setIndent(HWND hwnd, BOOL bSpace)
{
	TCHAR strCount[256];
#if defined(UNICODE) || defined(_UNICODE)
	_itow_s(g_struOptions.nChPerInd, strCount, 250, 10);
#else
	_itoa_s(g_struOptions.nChPerInd, strCount, 250, 10);
#endif

	CheckDlgButton(hwnd, IDC_SPACECHECK, bSpace);
	SetWindowText(GetDlgItem(hwnd, IDC_COUNTEDIT), strCount);
	EnableWindow(GetDlgItem(hwnd, IDC_COUNTEDIT), bSpace);
}

