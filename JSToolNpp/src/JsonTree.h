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

#ifndef _JSON_TREE_H_
#define _JSON_TREE_H_

#include <string>

#include <shlwapi.h>

#include "strhelper.h"
#include "PluginInterface.h"
#include "TreeViewController.h"

#define JSON_TREE_ROOT "$"
#define JSON_TREE_SPLITOR ": "

class JsonTree: public TreeViewController
{
public:
	JsonTree(HWND hScintilla = NULL, HWND hWndWindow = NULL, HWND hWndTree = NULL);

	HTREEITEM search(const sunjwbase::tstring& tstrSearchKey, HTREEITEM htiCurrent);

	sunjwbase::tstring getJsonNodePath(HTREEITEM hti);

	void jumpToSciLine(HTREEITEM hti, int iLineBase);

	void splitNodeText(const sunjwbase::tstring& tstrText, 
		sunjwbase::tstring& tstrKey, 
		sunjwbase::tstring& tstrValue);

private:
	HWND m_hScintilla;
	
	HTREEITEM doSearch(const sunjwbase::tstring& tstrSearchKey, 
		HTREEITEM htiCurrent, 
		bool bSkipCurrent);
};

#endif
