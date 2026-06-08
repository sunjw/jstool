/*
 * IniValue class implementation file
 * Author: Sun Junwen
 * Version: 1.1.1
 */
#include <cstdlib>
#include <string>
#include <map>

#include "strhelper.h"
#include "IniValue.h"

using namespace std;
using namespace sunjwbase;

IniValue::StrMap IniValue::GetMapValue() const
{
	return mapValue;
}

void IniValue::SetMapValue(const IniValue::StrMap& map)
{
	mapValue = map;
}

string IniValue::GetStrValue() const
{
	return strValue;
}

void IniValue::SetStrValue(const string& str)
{
	strValue = str;
}

void IniValue::Put(const string& key, const string& value)
{
	mapValue[key] = value;
}

string IniValue::ToString() const
{
	string ret("");

	if (bStr)
	{
		ret.append(PreMultiLine(strValue));
		ret.append("\n");
	}
	else
	{
		IniValue::StrMap::const_iterator itr = mapValue.begin();
		for (; itr != mapValue.end(); ++itr)
		{
			string line("");
			line.append((*itr).first);
			line.append("=");
			line.append(PreMultiLine((*itr).second));
			line.append("\n");
			ret.append(line);
		}
	}

	return ret;
}

string IniValue::PreMultiLine(const string& value) const
{
	string ret(value);
	ret = strreplace(ret, "\r\n", "\n");
	ret = strreplace(ret, "\\\n", "\\ \n");
	ret = strreplace(ret, "\n", "\\\n");

	return ret;
}
