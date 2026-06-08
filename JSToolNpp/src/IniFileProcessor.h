/*
 * IniFileProcessor class header file
 * Author: Sun Junwen
 * Version: 1.0.2
 */
#ifndef _INI_FILE_PROCESSOR_H_
#define _INI_FILE_PROCESSOR_H_

#include "IniProcessor.h"
#include "strhelper.h"

class IniFileProcessor: public IniProcessor
{
public:
	/*
	 * Constructor
	 * Specific the ini file name
	 */
	explicit IniFileProcessor(const sunjwbase::tstring& fileName)
	{
		m_tstrFileName = fileName;
	}

	virtual void Save();

	inline IniMap GetInfo(bool bSection)
	{ return GetInfo(bSection, true); }

	IniProcessor::IniMap GetInfo(bool bProcSection, bool bRefresh);

private:
	sunjwbase::tstring m_tstrFileName;
};

#endif
