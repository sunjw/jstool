#include "jsformatString.h"

JSFormatString::JSFormatString(const char *input, 
								string *output,
								const FormatterOption& option):
				RealJSFormatter(option), 
				in(), inLen(0), out(output), getPos(0), putPos(0)
{
	in.append(input);
	inLen = in.length();
}

int JSFormatString::GetChar()
{
	if (getPos <= inLen)
	{
		return in[getPos++];
	}
	else
	{
		return 0;
	}
}

void JSFormatString::PutChar(int ch)
{ 
	out->append(1, ch);
}
