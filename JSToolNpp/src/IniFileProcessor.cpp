/*
 * IniFileProcessor class implementation file
 * Author: Sun Junwen
 * Version: 1.0.2
 */
#include "IniFileProcessor.h"

#include <cstdlib>
#include <string>
#include <fstream>
#include "strhelper.h"

using namespace std;
using namespace sunjwbase;

void IniFileProcessor::Save()
{
#if defined (WIN32)
	ofstream out(m_tstrFileName.c_str());
#else
	string strFileName = tstrtostr(m_tstrFileName);
	ofstream out(strFileName.c_str());
#endif

	if (out)
	{
		out << ToString();
	}

	out.close();
}
	
IniProcessor::IniMap IniFileProcessor::GetInfo(bool bProcSection, bool bRefresh)
{
#if defined (WIN32)
	ifstream m_in(m_tstrFileName.c_str());
#else
	string strFileName = tstrtostr(m_tstrFileName);
	ifstream m_in(strFileName.c_str());
#endif
	return IniProcessor::GetInfo(m_in, bProcSection, bRefresh);
}
