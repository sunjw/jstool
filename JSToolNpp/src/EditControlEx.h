#ifndef _EDITCONTROL_EX_H_
#define _EDITCONTROL_EX_H_
#include <Windows.h>

class EditControlEx
{
public:
	EditControlEx(HWND hDlg = NULL, int editControlId = -1);
	virtual ~EditControlEx();

	static LRESULT CALLBACK EditControlProc(HWND hEditControl, 
		UINT message, WPARAM wParam, LPARAM lParam);

private:
	HWND m_hDlg;
	HWND m_hEditControl;
	int m_editControlId;
	LONG_PTR m_oldEditControlProc;
};

#endif
