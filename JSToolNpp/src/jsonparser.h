/* JsonParser.h
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
#ifndef _JSON_PARSER_H_
#define _JSON_PARSER_H_

#include "jsonpp.h"
#include "jsparser.h"

class JsonParser: public JSParser
{
public:
	JsonParser():m_nRecuLevel(0)
	{}

	inline void Go(JsonValue& jsonValue)
	{ RecursiveProc(jsonValue); }

private:
	int m_nRecuLevel; // ¿éµÝ¹é²ã´Î

	// performance info
	clock_t m_startClock;
	clock_t m_endClock;
	double m_duration;

	void RecursiveProc(JsonValue& jsonValue);
	void GenStrJsonValue(JsonValue& jsonValue, std::string value);
	std::string ReadStrValue();
};

#endif

