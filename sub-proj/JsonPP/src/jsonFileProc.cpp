#include "jsonpp.h"
#include "jsonFileProc.h"

using namespace std;
using namespace sunjwbase;

JsonFileProc::JsonFileProc(const tstring& intputFile)
{
	m_strInputFile = tstrtostr(intputFile);
}

void JsonFileProc::GetJsonValue(JsonValue& jsonValue)
{ 
	m_ifile.open(m_strInputFile.c_str());
	if (m_ifile)
	{
		Go(jsonValue);
	}
	m_ifile.close();
}

void JsonFileProc::Save(const JsonValue& jsonValue, const tstring& outputFile, bool sort)
{
	m_ofile.open(tstrtostr(outputFile).c_str());
	if (m_ofile)
	{
		string outString;
		if (!sort)
		{
			outString = jsonValue.ToString();
		}
		else
		{
			outString = jsonValue.ToStringSorted();
		}

#if defined (__APPLE__) || defined (__unix)
		size_t segmentStart = 0;
		for (size_t i = 0; i < outString.size(); ++i)
		{
			if (outString[i] == '\n' && (i == 0 || outString[i - 1] != '\r'))
			{
				if (i > segmentStart)
				{
					m_ofile.write(outString.data() + segmentStart,
						static_cast<std::streamsize>(i - segmentStart));
				}
				m_ofile.write("\r\n", 2);
				segmentStart = i + 1;
			}
		}
		if (segmentStart < outString.size())
		{
			m_ofile.write(outString.data() + segmentStart,
				static_cast<std::streamsize>(outString.size() - segmentStart));
		}
#else
		m_ofile.write(outString.data(), static_cast<std::streamsize>(outString.size()));
#endif
	}
	m_ofile.close();
}

int JsonFileProc::GetChar()
{
	int ret = m_ifile.get();
	if (ret == EOF)
	{
		return 0;
	}
	return ret;
}
