#include "jsonpp.h"
#include "jsonStringProc.h"

using namespace std;
using namespace sunjwbase;

JsonStringProc::JsonStringProc(const string& string)
:m_string(string),m_pos(0),m_strlen(string.length())
{}

int JsonStringProc::GetChar()
{
	if (m_pos < m_strlen)
	{
		return m_string[m_pos++];
	}
	else
	{
		return 0;
	}
}
