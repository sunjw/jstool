#include "jsformatter.h"
#include "realjsformatter.h"
#include "jsfGenericIO.h"
#include "jsfStringIO.h"
#include "version.h"

//#define DEBUG_MEM_LEAK
#undef DEBUG_MEM_LEAK

#ifdef DEBUG_MEM_LEAK
#define _CRTDBG_MAP_ALLOC
#include <stdlib.h>
#include <crtdbg.h>
#endif

DLLAPI JSFormatter *JSFCreateGenericIO(void *ioContext,
							 ReadCharFunc readCharFunc, 
							 WriteCharFunc writeCharFunc,
							 const FormatterOption *option)
{
#ifdef DEBUG_MEM_LEAK
	_CrtSetDbgFlag(_CRTDBG_ALLOC_MEM_DF | _CRTDBG_LEAK_CHECK_DF);
#endif

	JSFormatGenericIO *jsf = new JSFormatGenericIO(
		ioContext, readCharFunc, writeCharFunc, 
		FormatterOption(option->chIndent,
			option->nChPerInd,
			option->eCRRead,
			option->eCRPut,
			option->eBracNL,
			option->eEmpytIndent));

	return (JSFormatter *)jsf;
}

DLLAPI JSFormatter *JSFCreateStringIO(void *ioContext, 
							 const char *inputString, 
							 WriteStringFunc writeStringFunc,
							 const FormatterOption *option)
{
#ifdef DEBUG_MEM_LEAK
	_CrtSetDbgFlag(_CRTDBG_ALLOC_MEM_DF | _CRTDBG_LEAK_CHECK_DF);
#endif

	JSFormatStringIO *jsf = new JSFormatStringIO(
		ioContext, inputString, writeStringFunc, 
		FormatterOption(option->chIndent,
			option->nChPerInd,
			option->eCRRead,
			option->eCRPut,
			option->eBracNL,
			option->eEmpytIndent));

	return (JSFormatter *)jsf;
}

DLLAPI void JSFRelease(JSFormatter *jsf)
{
	delete (RealJSFormatter *)jsf;
}

DLLAPI void JSFFormatJavaScript(JSFormatter *jsf)
{
	((RealJSFormatter *)jsf)->Go();
}

DLLAPI void JSFEnableDebug(JSFormatter *jsf)
{
	((RealJSFormatter *)jsf)->m_debug = true;
}

DLLAPI void JSFDisableDebug(JSFormatter *jsf)
{
	((RealJSFormatter *)jsf)->m_debug = false;
}

DLLAPI const char *JSFGetDebugOutput(JSFormatter *jsf)
{
	return ((RealJSFormatter *)jsf)->GetDebugOutput();
}

DLLAPI int JSFGetFormattedLine(JSFormatter *jsf, int originalLine)
{
	return ((RealJSFormatter *)jsf)->GetFormattedLine(originalLine);
}

#ifdef _M_AMD64
// WIN64
#define VERSION_VALUE_ARCH VERSION_VALUE " x64"
#else
#ifdef __arm64__
// macOS
#define VERSION_VALUE_ARCH VERSION_VALUE " arm64"
#else
#ifdef _M_ARM64
// WIN ARM64
#define VERSION_VALUE_ARCH VERSION_VALUE " arm64"
#else
// else
#define VERSION_VALUE_ARCH VERSION_VALUE
#endif
#endif
#endif

#ifdef _DEBUG
#define DEBUG 1
#endif
#if DEBUG
#define VERSION_VALUE_ARCH_CONFIG VERSION_VALUE_ARCH " debug"
#else
#define VERSION_VALUE_ARCH_CONFIG VERSION_VALUE_ARCH " release"
#endif

DLLAPI const char *JSFGetVersion()
{
	return VERSION_VALUE_ARCH_CONFIG;
}
