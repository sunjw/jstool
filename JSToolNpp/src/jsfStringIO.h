#ifndef _JSFORMAT_STRING_IO_H_
#define _JSFORMAT_STRING_IO_H_

#include <string.h>
#include <string>

#include "jsformatter.h"
#include "realjsformatter.h"

class JSFormatStringIO: public RealJSFormatter
{
public:
	JSFormatStringIO(void *ioContext,
						const char *inputString, 
						WriteStringFunc writeStringFunc,
						const FormatterOption& option):
		RealJSFormatter(option), _ioContext(ioContext), 
		_inputString(inputString), _inputLen(0), _inputIdx(0),
		_writeStringFunc(writeStringFunc)
	{ _inputLen = strlen(_inputString); }

	virtual ~JSFormatStringIO()
	{}

	virtual void Go();

private:
	void *_ioContext;

	const char *_inputString;
	size_t _inputLen;
	size_t _inputIdx;

	std::string _outputString;
	WriteStringFunc _writeStringFunc;

	virtual int GetChar();
	virtual void PutChar(int ch);
};

#endif
