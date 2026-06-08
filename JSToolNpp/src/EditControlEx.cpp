#include "EditControlEx.h"

#include <Windows.h>

EditControlEx::EditControlEx(HWND hDlg, int editControlId):
	m_hDlg(hDlg), m_hEditControl(NULL),
	m_editControlId(editControlId),
	m_oldEditControlProc(NULL)
{
	if (m_hDlg != NULL && m_editControlId > -1)
	{
		m_hEditControl = GetDlgItem(m_hDlg, m_editControlId);
	}

	if (m_hEditControl != NULL)
	{
		// Let's replace WindowProc.
		// Save ourself in GWLP_USERDATA.
		::SetWindowLongPtr(m_hEditControl, GWLP_USERDATA, (LONG_PTR)this);

		// Save old WindowProc.
		m_oldEditControlProc = ::GetWindowLongPtr(m_hEditControl, GWLP_WNDPROC);

		// Set our WindowProc.
		::SetWindowLongPtr(m_hEditControl, GWLP_WNDPROC,
			(LONG_PTR)EditControlEx::EditControlProc);
	}
}

EditControlEx::~EditControlEx()
{
	// Restore WindowProc
	if (m_hEditControl != NULL && m_oldEditControlProc != NULL)
	{
		::SetWindowLongPtr(m_hEditControl, GWLP_WNDPROC,
			(LONG_PTR)m_oldEditControlProc);
	}
}

LRESULT CALLBACK EditControlEx::EditControlProc(
	HWND hEditControl, UINT message, WPARAM wParam, LPARAM lParam)
{
	EditControlEx *pEditControlEx = (EditControlEx *)(::GetWindowLongPtr(hEditControl, GWLP_USERDATA));

	switch (message)
	{
	case WM_KEYDOWN:
		{
			if ((::GetKeyState(VK_CONTROL) & 0xFF00) == 0xFF00)
			{
				if (wParam == 'A' || wParam == 'a')
				{
					::SendMessage(pEditControlEx->m_hEditControl, EM_SETSEL, 0, -1);
					return TRUE;  
				}
			}
		}
		break;
	}

	return CallWindowProc(
		(WNDPROC)pEditControlEx->m_oldEditControlProc, 
		hEditControl, message, wParam, lParam);
}
