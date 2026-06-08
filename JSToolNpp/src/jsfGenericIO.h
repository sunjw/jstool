#ifndef _JSFORMAT_GENERIC_IO_H_
#define _JSFORMAT_GENERIC_IO_H_

#include "jsformatter.h"
#include "realjsformatter.h"

class JSFormatGenericIO: public RealJSFormatter
{
public:
	JSFormatGenericIO(void *ioContext,
						ReadCharFunc readCharFunc, 
						WriteCharFunc writeCharFunc,
						const FormatterOption& option):
		RealJSFormatter(option),
		_ioContext(ioContext),
		_readCharFunc(readCharFunc), _writeCharFunc(writeCharFunc)
	{}

	virtual ~JSFormatGenericIO()
	{}

private:
	void *_ioContext;
	ReadCharFunc _readCharFunc;
	WriteCharFunc _writeCharFunc;

	virtual int GetChar();
	virtual void PutChar(int ch);
};

#endif
