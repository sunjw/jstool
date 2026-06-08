#include "aboutDlg.h"

#include "resource.h"
#include "comDef.h"
#include "utility.h"

extern HINSTANCE g_hInst;

BOOL CALLBACK dlgProcAbout(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam) 
{
	switch (message) 
	{
		case WM_DRAWITEM:
			{
				HICON hIcon = (HICON)::LoadImage(g_hInst, 
					MAKEINTRESOURCE(IDI_JS_ICON), IMAGE_ICON, 
					48, 48, LR_DEFAULTSIZE);
				DRAWITEMSTRUCT *pdis = (DRAWITEMSTRUCT *)lParam;

				float fDeskScale = GetDesktopScale(hwnd);
				::DrawIconEx(pdis->hDC, 0, 0, hIcon, 
							(48 * fDeskScale), (48 * fDeskScale), 
							0, NULL, DI_NORMAL);
				return TRUE;
			}
		case WM_COMMAND:
			switch (LOWORD(wParam))
			{
				case IDCLOSE:
				case IDCANCEL:
				{
					::EndDialog(hwnd, 0);
					return TRUE;
				}
				case IDC_PROPAGE:
					projectSite();
					break;
			}
			return FALSE;
	}
	return FALSE;
}

void projectSite()
{
	ShellExecute(NULL, TEXT("open"), TEXT(PROJECT_SITE), NULL, NULL, SW_SHOW);
}
