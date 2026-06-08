//this file a header file of JSMinNpp
//Copyright (C) 2010-2010 Sun Junwen
//
//This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License
//as published by the Free Software Foundation; either
//version 2 of the License, or (at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program; if not, write to the Free Software
//Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

#ifndef NPP_TOOLS_H
#define NPP_TOOLS_H

#pragma warning(disable:4005)

#include "resource.h"
#include "PluginInterface.h"
#include "JSONDialog.h"
#include "utility.h"

//#define IDD_ABOUTBOX 250
//
//#ifndef IDC_STATIC 
//#define IDC_STATIC -1
//#endif

HINSTANCE g_hInst;
NppData g_nppData;
StruOptions g_struOptions;

void jsMinCurrent();
void jsMinNew();

void jsFormat();

void jsonSortCurrent();
void jsonSortNew();

void jsonTree();
void onToggleJsonTree(BOOL bVisible);

void options();

HMENU getOwnMenu();

void doInternetCheckUpdate();
void checkUpdate();

void donate();
void openProjectSite();
void openGitHub();
void about();

#endif //NPP_TOOLS_H
