#include "jsminCharArray.h"

JSMinCharArray::JSMinCharArray(const unsigned char *input, unsigned char *output, bool bPutCR, bool bKeepTopComt)
		:JSMin(bKeepTopComt), in(input), inLen(0), out(output), getPos(0), putPos(0), bPutCR(bPutCR)
{
	inLen = strlen(reinterpret_cast<const char*>(in));
}

int JSMinCharArray::getChar()
{
	if (getPos <= inLen)
	{
		return in[getPos++];
	}
	else
	{
		return EOF;
	}
}

void JSMinCharArray::put(int _Ch)
{
	if (_Ch == '\n' && bPutCR)
	{
		out[putPos++] = '\r';
	}
	out[putPos++] = _Ch;
}
