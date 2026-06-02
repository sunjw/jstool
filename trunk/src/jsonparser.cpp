/* JsonParser.cpp
   2012-3-23
   Version: 0.9.8

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
#include "jsonparser.h"

using namespace std;
using namespace sunjwbase;

void JsonParser::RecursiveProc(JsonValue& jsonValue)
{
	// initial job
	if (m_nRecuLevel == 0)
	{
		StartParse();

		jsonValue.SetValueType(JsonValue::UNKNOWN_VALUE);
	}

	++m_nRecuLevel;
	// initial job

	char stackTop = JS_EMPTY;
	GetStackTop(m_blockStack, stackTop);

	string key, strValue;
	long keyLine = -1, valLine = -1;
	bool bGetKey = false;
	bool bGetSplitor = false;

	while (GetToken()) // 获得下一个 m_tokenA 和 m_tokenB
	{
		// JsonParser 忽略换行, 其它的解析器可能不要忽略
		if (m_tokenA.code == "\r\n" ||
			m_tokenA.code == "\n" ||
			m_tokenA.type == COMMENT_TYPE_1 ||
			m_tokenA.type == COMMENT_TYPE_2)
		{
			continue;
		}

		/*
		 * 至此, 读取完成 m_tokenA 和 m_tokenB
		 * 已经合并多个换行
		 * 已经识别负数
		 * 已经识别正则表达式
		 */
		if (m_tokenA.code == "{")
		{
			m_blockStack.push(JS_BLOCK);
			long blockLine = m_tokenA.line;

			if (stackTop == JS_EMPTY)
			{
				jsonValue.SetValueType(JsonValue::MAP_VALUE);
				RecursiveProc(jsonValue);
			}
			else
			{
				if (stackTop == JS_SQUARE)
				{
					jsonValue.ArrayPut(JsonValue());

					JsonValue& innerValue = jsonValue.GetArrayValue().back();
					innerValue.SetValueType(JsonValue::MAP_VALUE);

					RecursiveProc(innerValue);

					innerValue.line = blockLine;
				}
				else if (stackTop == JS_BLOCK)
				{
					jsonValue.MapPut(key, JsonValue());

					JsonValue& innerValue = jsonValue[key];
					innerValue.SetValueType(JsonValue::MAP_VALUE);

					RecursiveProc(innerValue);

					bGetKey = false;
					bGetSplitor = false;
					innerValue.line = keyLine;
				}
			}

			continue;
		}

		if (m_tokenA.code == "}")
		{
			bGetKey = false;
			bGetSplitor = false;

			if (m_blockStack.size() > 0)
			{
				m_blockStack.pop();
				--m_nRecuLevel;
			}

			return;
		}

		if (m_tokenA.code == "[")
		{
			m_blockStack.push(JS_SQUARE);
			long squareLine = m_tokenA.line;

			if (stackTop == JS_EMPTY)
			{
				jsonValue.SetValueType(JsonValue::ARRAY_VALUE);
				RecursiveProc(jsonValue);
			}
			else
			{
				if (stackTop == JS_SQUARE)
				{
					jsonValue.ArrayPut(JsonValue());

					JsonValue& innerValue = jsonValue.GetArrayValue().back();
					innerValue.SetValueType(JsonValue::ARRAY_VALUE);

					RecursiveProc(innerValue);

					innerValue.line = squareLine;
				}
				else if (stackTop == JS_BLOCK)
				{
					jsonValue.MapPut(key, JsonValue());

					JsonValue& innerValue = jsonValue[key];
					innerValue.SetValueType(JsonValue::ARRAY_VALUE);

					RecursiveProc(innerValue);

					bGetKey = false;
					bGetSplitor = false;
					innerValue.line = keyLine;
				}
			}

			continue;
		}

		if (m_tokenA.code == "]")
		{
			if (m_blockStack.size() > 0)
			{
				m_blockStack.pop();
				--m_nRecuLevel;
			}

			return;
		}

		if (stackTop == JS_BLOCK)
		{
			if (!bGetKey && m_tokenA.code != ",")
			{
				key = m_tokenA.code;
				keyLine = m_tokenA.line;

				if ((key[0] == '\'' && key[key.length() - 1] == '\'') ||
					key[0] == '"' && key[key.length() - 1] == '"')
				{
					key = key.substr(1, key.length() - 2);
				}

				bGetKey = true;
				continue;
			}

			if (bGetKey && !bGetSplitor && m_tokenA.code == ":")
			{
				bGetSplitor = true;
				continue;
			}

			if (bGetKey && bGetSplitor)
			{
				strValue = ReadStrValue();
				valLine = m_tokenA.line;

				jsonValue.MapPut(key, JsonValue());
				JsonValue& jValue = jsonValue[key];
				GenStrJsonValue(jValue, strValue);

				jValue.line = keyLine;

				bGetKey = false;
				bGetSplitor = false;
			}
		}

		if (stackTop == JS_SQUARE)
		{
			if (m_tokenA.code != ",")
			{
				strValue = ReadStrValue();
				valLine = m_tokenA.line;

				JsonValue jValue;
				GenStrJsonValue(jValue, strValue);
				jValue.line = valLine;

				jsonValue.ArrayPut(jValue);
			}
		}
	}

	// finished job
	if (m_nRecuLevel == 1)
	{
		//FlushLineBuffer();

		EndParse();
	}
	// finished job
}

string JsonParser::ReadStrValue()
{
	string ret(m_tokenA.code);
	// fix decimal number value bug
	if (m_tokenB.code == ".")
	{
		// maybe it's a decimal
		string strDec(m_tokenA.code);
		GetToken();
		strDec.append(".");
		strDec.append(m_tokenB.code);
		ret = strDec;
		GetToken();
	}

	return ret;
}

void JsonParser::GenStrJsonValue(JsonValue& jsonValue, string value)
{
	if (value[0] == '\'' || value[0] == '"')
	{
		if ((value[0] == '\'' && value[value.length() - 1] == '\'') ||
			value[0] == '"' && value[value.length() - 1] == '"')
		{
			value = value.substr(1, value.length() - 2);
		}

		/*
		 * STRING_VALUE 存入的时候会把周围的引号去掉
		 * 输出的时候统一成 "..."
		 * 所以要把里面的引号转义
		 */
		value = strreplace(value, "\\'", "'");
		value = strreplace(value, "\\\"", "\"");
		value = strreplace(value, "\"", "\\\"");

		jsonValue.SetValueType(JsonValue::STRING_VALUE);
	}
	else if (IsNumChar(value[0]) || value[0] == '-' || value[0] == '+')
	{
		jsonValue.SetValueType(JsonValue::NUMBER_VALUE);
	}
	else if (value == "true" || value == "false")
	{
		jsonValue.SetValueType(JsonValue::BOOL_VALUE);
	}
	else if (value[0] == '/')
	{
		jsonValue.SetValueType(JsonValue::REGULAR_VALUE);
	}
	else
	{
		jsonValue.SetValueType(JsonValue::UNKNOWN_VALUE);
	}

	jsonValue.SetStrValue(value);
}
