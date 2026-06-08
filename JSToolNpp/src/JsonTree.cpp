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
#include "JsonTree.h"

#include <tchar.h>

using namespace std;
using namespace sunjwbase;

JsonTree::JsonTree(HWND hScintilla, HWND hWndWindow, HWND hWndTree):
	m_hScintilla(hScintilla), TreeViewController(hWndWindow, hWndTree)
{}

HTREEITEM JsonTree::search(const tstring& tstrSearchKey, HTREEITEM htiCurrent)
{
	return doSearch(tstrSearchKey, htiCurrent, true);
}

HTREEITEM JsonTree::doSearch(const tstring& tstrSearchKey, 
							 HTREEITEM htiCurrent, 
							 bool bSkipCurrent)
{
	if (bSkipCurrent)
	{
		htiCurrent = nextItem(htiCurrent);
	}

	TCHAR buf[1024] = {0};
	TVITEM tvi = {0};
	while (htiCurrent != NULL)
	{
		if (getTVItem(htiCurrent, buf, 1024, &tvi))
		{
			tstring tstrTreeText = tvi.pszText;
			tstring tstrKey, tstrValue;
			splitNodeText(tstrTreeText, tstrKey, tstrValue);

			if (tstrValue == TEXT("[Object]") || tstrValue == TEXT("[Array]"))
			{
				// Just search key
				if (strfind_ci(tstrKey, tstrSearchKey) >= 0)
				{
					return htiCurrent; // found
				}
			}
			else
			{
				if (strfind_ci(tstrTreeText, tstrSearchKey) >= 0)
				{
					return htiCurrent; // found
				}
			}
		}

		htiCurrent = nextItem(htiCurrent);
	}

	return NULL;
}

/*
 * Get JSON node path.
 */
tstring JsonTree::getJsonNodePath(HTREEITEM hti)
{
	tstring tstrJsonPath;
	HTREEITEM hitTravel = hti;

	while (hitTravel != NULL)
	{
		const int bufLen = 1024;
		TCHAR buf[bufLen] = {0};
		TVITEM tvi = {0};
		if (getTVItem(hitTravel, buf, bufLen, &tvi))
		{
			tstring tstrTreeText = tvi.pszText;
			tstring tstrKey, tstrValue;
			splitNodeText(tstrTreeText, tstrKey, tstrValue);

			if (tstrJsonPath == TEXT(""))
			{
				tstrJsonPath = tstrKey;
			}
			else
			{
				if (tstrTreeText == TEXT(JSON_TREE_ROOT))
				{
					tstrKey = TEXT(JSON_TREE_ROOT);
				}

				if (tstrJsonPath[0] == TEXT('['))
				{
					tstrJsonPath = tstrKey + tstrJsonPath;
				}
				else
				{
					tstrJsonPath = tstrKey + TEXT(".") + tstrJsonPath;
				}
			}
		}

		HTREEITEM htiParent = getParentItem(hitTravel);
		hitTravel = htiParent;
	}

	return tstrJsonPath;
}

/*
 * Jump to the line linked with specified HTREEITEM.
 */
void JsonTree::jumpToSciLine(HTREEITEM hti, int iLineBase)
{
	TCHAR buf[1024] = {0};
	TVITEM tvi = {0};
	if (getTVItem(hti, buf, 1024, &tvi))
	{
		long line = (long)tvi.lParam;
		if (line >= 0)
		{
			::SendMessage(m_hScintilla, SCI_GOTOLINE, line - 1 + iLineBase, 0);
		}
	}
}

void JsonTree::splitNodeText(const tstring& tstrText, 
				tstring& tstrKey, 
				tstring& tstrValue)
{
	tstring::size_type beginPos = 0;
	tstring::size_type splitPos = 0;
	while (1)
	{
		tstring::size_type pos = tstrText.find(tstring(TEXT(JSON_TREE_SPLITOR)), beginPos);
		if (pos == tstring::npos)
		{
			// fallback, the first
			pos = tstrText.find(tstring(TEXT(JSON_TREE_SPLITOR)), 0);
			if (pos == tstring::npos)
			{
				return; // still not able to find
			}

			splitPos = pos + 1;
			break;
		}

		TCHAR cTest = tstrText[pos + tstring(TEXT(JSON_TREE_SPLITOR)).length()];
		if (cTest == TEXT('\"') || cTest == TEXT('[') || 
			cTest == TEXT('/') || // regex
			cTest == TEXT('-') || (cTest >= TEXT('0') && cTest <= TEXT('9')) ||
			cTest == TEXT('t') || cTest == TEXT('f') || // true, false
			cTest == TEXT('n')) // null
		{
			splitPos = pos + 1;
			break;
		}

		beginPos = pos + 1;
	}

	tstrKey = tstrText.substr(0, splitPos - 1);
	tstrKey = strtrim(tstrKey);
	tstrValue = tstrText.substr(splitPos + 1, tstrText.size() - splitPos);
	tstrValue = strtrim(tstrValue);
}
