/*
 * IniProcessor class header file
 * Author: Sun Junwen
 * Version: 1.2.9
 */
#ifndef _INI_PROCESSOR_H_
#define _INI_PROCESSOR_H_

#include <cstdlib>
#include <string>
#include <istream>

#include "IniValue.h"
#include "unsortedmap.h"

class IniProcessor
{
public:
	typedef UnsortedMap<std::string, IniValue> IniMap;

	/*
	 * Constructor
	 * Specific the ini file name
	 */
	IniProcessor()
	{}

	virtual ~IniProcessor()
	{}

	// Set value into map
	void SetMap(const IniMap& map)
	{ m_iniMap = map; }

	// Save value into file
	virtual void Save() = 0;

	// Convert value to string
	inline std::string ToString() const
	{ return ToString(m_iniMap); }
	std::string ToString(const IniMap& map) const;

protected:
	// Get info from istream
	IniMap GetInfo(std::istream& in, bool bProcSection, bool bRefresh);

private:
	IniMap m_iniMap;

	// Add a section to map
	void AddSection(const std::string& sectionName, const IniValue::StrMap& sectionMap);
};

#endif
