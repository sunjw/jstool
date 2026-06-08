#include "jsfStringIO.h"
#include <string>

using namespace std;

void JSFormatStringIO::Go()
{
	RealJSFormatter::Go();
	_writeStringFunc(_ioContext, _outputString.c_str());
}

int JSFormatStringIO::GetChar()
{
	if (_inputIdx <= _inputLen)
		return _inputString[_inputIdx++];
	else
		return 0;
}

void JSFormatStringIO::PutChar(int ch)
{
	_outputString.append(1, ch);
}
