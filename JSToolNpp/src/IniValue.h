/*
 * IniValue class header file
 * Author: Sun Junwen
 * Version: 1.1.1
 */
#ifndef _INI_VALUE_H_
#define _INI_VALUE_H_

#include <cstdlib>
#include <string>

#include "unsortedmap.h"

class IniValue
{
public:
	typedef UnsortedMap<std::string, std::string> StrMap;

	/*
	 * Constructors
	 * Default is string value
	 */
	explicit IniValue(bool bStr = true)
		:bStr(bStr)
	{};
	explicit IniValue(const std::string& strValue)
		:bStr(true), strValue(strValue)
	{};

	// Get map value
	StrMap GetMapValue() const;
	// Set map value
	void SetMapValue(const StrMap& map);
	// Get string value
	std::string GetStrValue() const;
	// Set string value
	void SetStrValue(const std::string& str);
	
	// Is string value or not
	inline bool IsStrValue() const
	{ return bStr; }
	// Set value mode, true is string, false is not string
	inline void SetMode(bool bStr)
	{ this->bStr = bStr; }

	// Put key-value pair into map value
	void Put(const std::string& key, const std::string& value);

	// Convert string value or map value to string
	std::string ToString() const;

private:
	bool bStr;
	std::string strValue;
	IniValue::StrMap mapValue;

	std::string PreMultiLine(const std::string& value) const;

};

#endif
