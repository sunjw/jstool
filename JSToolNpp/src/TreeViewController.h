/*
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

#ifndef _TREEVIEW_CONTROLLER_H_
#define _TREEVIEW_CONTROLLER_H_

#include "PluginInterface.h"

class TreeViewController
{
public:
	TreeViewController(HWND hWndWindow, HWND hWndTree);

	inline HWND getHWndTree()
	{ return m_hWndTree; }

	BOOL screenToTreeView(LPPOINT lpPoint);

	HTREEITEM hitTest(LPTVHITTESTINFO lpHTInfo);

	HTREEITEM getRoot();

	BOOL selectItem(HTREEITEM hti, BOOL firstVisible = FALSE);
	HTREEITEM getSelection();

	BOOL isItemVisible(HTREEITEM hti);

	BOOL hasChild(HTREEITEM hti);
	HTREEITEM getParentItem(HTREEITEM hti);

	inline HTREEITEM nextItem(HTREEITEM htiCurrent)
	{ return nextItem(htiCurrent, NULL); }
	HTREEITEM nextItem(HTREEITEM htiCurrent, HTREEITEM htiNextRoot);

	BOOL getTVItem(HTREEITEM hti, TCHAR *buf, int bufSize, TVITEM *tvi);

	BOOL expandItem(HTREEITEM hti, UINT flag);

private:
	HWND m_hWndWindow; // Window's handle
	HWND m_hWndTree; // TreeView's handle
	HTREEITEM m_htiRoot; // TreeView's root item 
};

#endif
