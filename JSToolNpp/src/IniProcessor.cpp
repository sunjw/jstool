/*
 * IniProcessor class implementation file
 * Author: Sun Junwen
 * Version: 1.2.9
 */
#include <cstdlib>
#include <string>
#include <istream>
#include <map>
#include <list>

#include "IniProcessor.h"
#include "strhelper.h"

using namespace std;
using namespace sunjwbase;

IniProcessor::IniMap IniProcessor::GetInfo(istream& in, bool bProcSection, bool bRefresh)
{
	if (!bRefresh && m_iniMap.size() > 0)
	{
		return m_iniMap;
	}
	
	m_iniMap.clear();

	string line;
	bool bSection = false;
	bool bMultiLine = false;
	string sectionName;
	//IniValue sectionMap;
	IniValue::StrMap sectionMap;

	string key;
	string value;

	while (true)
	{
		if (!getline(in, line)) // eof
		{
			if (bProcSection && bSection)
			{
				AddSection(sectionName, sectionMap);
			}
			break;
		}

		line = strtrim_right(line);
		if (bMultiLine)
		{
			value.append(line);
			if (value.length() > 0 && value[value.length() - 1] == '\\')
			{
				// value 结尾是 \ 表示多行
				value[value.length() - 1] = '\n';
				bMultiLine = true;
			}
			else
			{
				bMultiLine = false;
				if (bProcSection && bSection)
				{
					sectionMap[key] = value;
				}
				else
				{
					m_iniMap[key] = IniValue(value);
				}
			}

			continue;
		}
		line = strtrim(line);

		if (line.length() <= 1 ||
			line[0] == ';' ||
			line[0] == '#' ||
			(line[0] == '/' && line[1] == '/'))
		{
			continue; // 注释行
		}

		if (bProcSection &&
			line[0] == '[' &&
			line[line.length() - 1] == ']')
		{
			if (bSection)
			{
				AddSection(sectionName, sectionMap);
			}

			bSection = true;
			sectionMap.clear();
			sectionName = line.length() - 2 > 0 ?
				line.substr(1, line.length() - 2) : "";
			sectionName = strtrim(sectionName);
		}

		size_t eqPos = line.find("=");
		if (eqPos != string::npos)
		{
			key = line.substr(0, eqPos);
			key = strtrim(key);
				
			value = eqPos + 1 >= line.length() ?
				"" : line.substr(eqPos + 1);
			value = strtrim(value);
			if (value.length() > 0 && value[value.length() - 1] == '\\')
			{
				// value 结尾是 \ 表示多行
				value[value.length() - 1] = '\n';
				bMultiLine = true;
				continue;
			}
			else
			{
				bMultiLine = false;
			}

			if (bProcSection && bSection)
			{
				sectionMap[key] = value;
			}
			else
			{
				m_iniMap[key] = IniValue(value);
			}
		}
	}

	return m_iniMap;
}

void IniProcessor::AddSection(const string& sectionName, const IniValue::StrMap& sectionMap)
{
	IniValue iniValue = m_iniMap[sectionName];// = sectionMap;
	if (iniValue.IsStrValue())
	{
		iniValue.SetMode(false);
		iniValue.SetMapValue(sectionMap);
	}
	else
	{
		IniValue::StrMap::const_iterator itr = sectionMap.begin();
		for (; itr != sectionMap.end(); ++itr)
		{
			iniValue.Put((*itr).first, (*itr).second);
		}
	}
	m_iniMap[sectionName] = iniValue;
}

string IniProcessor::ToString(const IniProcessor::IniMap& map) const
{
	string ret("");

	list<IniMap::pair_type> sectionList;

	IniMap::const_iterator iniItr = map.begin();
	string line;
	string key;
	IniValue value;
	for (; iniItr != map.end(); ++iniItr)
	{
		key = (*iniItr).first;
		value = (*iniItr).second;

		if (value.IsStrValue())
		{
			line = key;
			line.append("=");
			line.append(value.ToString());
			ret.append(line);
		}
		else
		{
			sectionList.push_back(*iniItr);
		}
	}

	while (!sectionList.empty())
	{
		key = sectionList.front().first;
		value = sectionList.front().second;

		line = "\n[";
		line.append(key);
		line.append("]\n");
		ret.append(line);

		line = value.ToString();
		ret.append(line);

		sectionList.pop_front();
	}

	return ret;
}
