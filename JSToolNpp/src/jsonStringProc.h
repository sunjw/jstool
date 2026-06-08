#ifndef _JSON_FILE_PROC_H_
#define _JSON_FILE_PROC_H_

#include "jsonpp.h"
#include "jsonparser.h"

class JsonStringProc: public JsonParser
{
public:
	explicit JsonStringProc(const std::string& string);

private:
	std::string m_string;
	std::string::size_type m_strlen;
	std::string::size_type m_pos;

	virtual int GetChar();
};

#endif
