/* JsonValue.cpp
   2012-3-11
   Version: 0.9.1

Copyright (c) 2012- SUN Junwen

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
#include "jsonpp.h"

using namespace std;
using namespace sunjwbase;

JsonValue::JsonValue(const JsonValue& rhs)
{
	m_valType = rhs.m_valType;
	m_strValue = rhs.m_strValue;
	m_mapValue = rhs.m_mapValue;
	m_arrayValue = rhs.m_arrayValue;
	line = rhs.line;
}

JsonValue& JsonValue::operator=(const JsonValue& rhs)
{
	if (this == &rhs)
	{
		return *this;
	}

	m_valType = rhs.m_valType;
	m_strValue = rhs.m_strValue;
	m_mapValue = rhs.m_mapValue;
	m_arrayValue = rhs.m_arrayValue;
	line = rhs.line;

	return *this;
}

string JsonValue::GetStrValue() const
{
	return m_strValue;
}

void JsonValue::SetStrValue(const string& str)
{
	m_strValue = str;
	if (m_valType != JsonValue::STRING_VALUE &&
		m_valType != JsonValue::NUMBER_VALUE &&
		m_valType != JsonValue::BOOL_VALUE &&
		m_valType != JsonValue::REGULAR_VALUE &&
		m_valType != JsonValue::UNKNOWN_VALUE)
	{
		ChangeType(JsonValue::STRING_VALUE);
	}
}

JsonVec& JsonValue::GetArrayValue()
{
	return m_arrayValue;
}

const JsonVec& JsonValue::GetArrayValue() const 
{
	return m_arrayValue;
}

void JsonValue::SetArrayValue(const JsonVec& jArray)
{
	m_arrayValue = jArray;
	ChangeType(JsonValue::ARRAY_VALUE);
}

JsonUnsortedMap& JsonValue::GetMapValue()
{
	return m_mapValue;
}

const JsonUnsortedMap& JsonValue::GetMapValue() const
{
	return m_mapValue;
}

void JsonValue::SetMapValue(const JsonUnsortedMap& jMap)
{
	m_mapValue = jMap;
	ChangeType(JsonValue::MAP_VALUE);
}

void JsonValue::ArrayPut(const JsonValue& value)
{
	m_arrayValue.push_back(value);
}

void JsonValue::MapPut(const string& key, const JsonValue& value)
{
	m_mapValue[key] = value;
}

// Has specified string key for map value
bool JsonValue::HasKey(const string& key) const
{
	if (m_valType != MAP_VALUE)
	{
		return false;
	}

	return (m_mapValue.find(key) != m_mapValue.end());
}

// Has specified index for array value
bool JsonValue::HasKey(const JsonVec::size_type idx) const
{
	if (m_valType != ARRAY_VALUE)
	{
		return false;
	}

	return (m_arrayValue.size() > idx);
}

// for ArrayValue
JsonValue& JsonValue::operator[](JsonVec::size_type idx)
{
	// Change to ARRAY_VALUE
	ChangeType(JsonValue::ARRAY_VALUE);

	while (m_arrayValue.size() <= idx)
	{
		// need to expand
		m_arrayValue.push_back(JsonValue());
	}

	return m_arrayValue[idx];
}

// for MapValue
JsonValue& JsonValue::operator[](const string& key)
{
	// Change to MAP_VALUE
	ChangeType(JsonValue::MAP_VALUE);

	return m_mapValue[key];
}

void JsonValue::ChangeType(VALUE_TYPE newType)
{
	switch (newType)
	{
	case JsonValue::STRING_VALUE:
	case JsonValue::NUMBER_VALUE:
	case JsonValue::BOOL_VALUE:
	case JsonValue::REGULAR_VALUE:
	case JsonValue::UNKNOWN_VALUE:
		m_arrayValue.clear();
		m_mapValue.clear();
		break;
	case JsonValue::MAP_VALUE:
		m_strValue.clear();
		m_arrayValue.clear();
		break;
	case JsonValue::ARRAY_VALUE:
		m_strValue.clear();
		m_mapValue.clear();
		break;
	}

	m_valType = newType;
}

template<typename _JsonMap>
static string JsonMapToString(const _JsonMap& jsonMap, int nRecuLevel, bool sort)
{
	string ret("");

	++nRecuLevel;

	ret.append("{");
	ret.append("\n");

	typename _JsonMap::const_iterator itr = jsonMap.begin();
	for (; itr != jsonMap.end(); ++itr)
	{
		const string& key = itr->first;
		const JsonValue& value = itr->second;

		for (int r = 0; r < nRecuLevel; ++r)
		{
			ret.append("\t");
		}
		ret.append("\"");
		ret.append(key);
		ret.append("\"");
		ret.append(": ");
		if (!sort)
		{
			ret.append(value.ToString(nRecuLevel));
		}
		else
		{
			ret.append(value.ToStringSorted(nRecuLevel));
		}
		typename _JsonMap::const_iterator temp = itr;
		++temp;
		if (temp != jsonMap.end())
		{
			ret.append(",");
		}
		ret.append("\n");
	}

	for (int r = 0; r < nRecuLevel - 1; ++r)
	{
		ret.append("\t");
	}
	ret.append("}");

	return ret;
}

string JsonValue::ToString(int nRecuLevel, bool sort) const
{
	string ret("");

	switch (m_valType)
	{
	case JsonValue::STRING_VALUE:
		{
			ret.append("\"");
			ret.append(m_strValue);
			ret.append("\"");
		}
		break;
	case JsonValue::NUMBER_VALUE:
	case JsonValue::BOOL_VALUE:
	case JsonValue::REGULAR_VALUE:
	case JsonValue::UNKNOWN_VALUE:
		ret.append(m_strValue);
		break;
	case JsonValue::MAP_VALUE:
		{
			string mapString;
			if (!sort)
			{
				mapString = JsonMapToString(m_mapValue, nRecuLevel, sort);
			}
			else
			{
				JsonMap sortedJsonMap;
				sortedJsonMap.insert(m_mapValue.begin(), m_mapValue.end());
				mapString = JsonMapToString(sortedJsonMap, nRecuLevel, sort);
			}

			ret.append(mapString);
		}
		break;
	case JsonValue::ARRAY_VALUE:
		{
			ret.append("[");
			
			JsonVec::const_iterator itr = m_arrayValue.begin();
			for (; itr != m_arrayValue.end(); ++itr)
			{
				const JsonValue& value = *itr;

				ret.append(value.ToString(nRecuLevel, sort));
				JsonVec::const_iterator temp = itr;
				++temp;
				if (temp != m_arrayValue.end())
				{
					ret.append(", ");
				}
			}

			ret.append("]");
		}
		break;
	}

	return ret;
}
