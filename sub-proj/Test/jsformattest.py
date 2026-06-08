#
# JSFormatter test
# Author: Sun Junwen
# Date: 2014-01-04
#
import os
import sys
from subprocess import call

import comm_util
from testbase import *

TEST_CASE_DIR = 'jsformat'
WIN_ARM64 = 'ARM64'

JSFORMATTER_PATH_WIN = '../../JSToolNpp/debug/JSFormatterTest.exe'
JSFORMATTER_REL_PATH_WIN = '../../JSToolNpp/release/JSFormatterTest.exe'
JSFORMATTER_PATH_WIN_64 = '../../JSToolNpp/x64/debug/JSFormatterTest.exe'
JSFORMATTER_REL_PATH_WIN_64 = '../../JSToolNpp/x64/release/JSFormatterTest.exe'
JSFORMATTER_PATH_WIN_ARM64 = '../../JSToolNpp/arm64/debug/JSFormatterTest.exe'
JSFORMATTER_REL_PATH_WIN_ARM64 = '../../JSToolNpp/arm64/release/JSFormatterTest.exe'
JSFORMATTER_PATH_MAC = '../../trunk/DerivedData/JSTool/Build/Products/Debug/JSFormatterTest'
JSFORMATTER_REL_PATH_MAC = '../../trunk/DerivedData/JSTool/Build/Products/Release/JSFormatterTest'
JSFORMATTER_NODEJS_SCRIPT_PATH = '../../JSToolJS/jsfjsnode.js'

class NodeCaseRuntime(CaseRuntime):
    def _case_execute(self, test_case):
        call(['node', self.runtime_path, test_case.source, self.get_out_path_from_case(test_case)])

    def dump_name(self):
        comm_util.log('NodeCaseRuntime')

    def dump_version(self):
        call(['node', self.runtime_path, '--version'])
        comm_util.log('node version: ')
        call(['node', '--version'])

class ValidateCaseRuntime(CaseRuntime):
    def __init__(self, runtime_path, nodejs_script_path):
        super(ValidateCaseRuntime, self).__init__(runtime_path)
        self.nodejs_script_path = nodejs_script_path
        self.out_cpp = 'outcpp.js'
        self.out_js = 'outjs.js'

    def _case_execute(self, test_case):
        comm_util.log('Call cpp...')
        call([self.runtime_path, test_case.source, os.path.join(test_case.case_dir, self.out_cpp)])
        comm_util.log('Call node...')
        call(['node', self.nodejs_script_path, test_case.source, os.path.join(test_case.case_dir, self.out_js)])

    def _case_result(self, test_case):
        result = 'ERROR'
        outcpp_md5 = comm_util.md5_file(os.path.join(test_case.case_dir, self.out_cpp))
        outjs_md5 = comm_util.md5_file(os.path.join(test_case.case_dir, self.out_js))
        if outcpp_md5 == outjs_md5:
            result = 'PASS'

        comm_util.log(result)
        return result

    def dump_name(self):
        comm_util.log('ValidateCaseRuntime')

    def dump_info(self):
        comm_util.log('%s vs. %s' % (self.runtime_path, self.nodejs_script_path))

    def dump_version(self):
        call([self.runtime_path, '--version'])
        call(['node', self.nodejs_script_path, '--version'])
        comm_util.log('node version: ')
        call(['node', '--version'])

def main():
    x64 = True # x64 is default
    release = False
    nodejs = False
    validate = False

    win_arm64 = False
    machine = comm_util.get_machine()
    if comm_util.is_windows_sys() and machine == WIN_ARM64:
        win_arm64 = True

    for argv in sys.argv:
        argv = argv.lower()
        if argv == 'node' or argv == 'nodejs' or argv == 'js':
            nodejs = True
            x64 = True
            release = False
            validate = False
            break
        if argv == 'validate':
            validate = True
            x64 = True
            release = False
            nodejs = False
            break
        if argv == 'release' or argv == 'rel':
            release = True
        if argv == '64' or argv == 'x64':
            x64 = True
        if argv == '32' or argv == 'x86':
            if not comm_util.is_macos_sys() and not win_arm64:
                x64 = False

    # system check
    if nodejs == False:
        if not comm_util.is_windows_sys() and not comm_util.is_macos_sys():
            if comm_util.is_linux_sys():
                comm_util.log('Linux only support node.')
            else:
                comm_util.log('Unknown operating system.')
            return
    else:
        if not comm_util.is_windows_sys() and not comm_util.is_macos_sys() and not comm_util.is_linux_sys():
            comm_util.log('Unknown operating system.')
            return

    # prepare path
    jsformatter_path_sel = ''
    jsformatter_nodejs_script_sel = ''

    if nodejs == False and validate == False:
        if comm_util.is_windows_sys() and not win_arm64:
            jsformatter_path_sel = JSFORMATTER_PATH_WIN
            if release and x64:
                jsformatter_path_sel = JSFORMATTER_REL_PATH_WIN_64
            elif x64:
                jsformatter_path_sel = JSFORMATTER_PATH_WIN_64
            elif release:
                jsformatter_path_sel = JSFORMATTER_REL_PATH_WIN
        if comm_util.is_windows_sys() and win_arm64:
            jsformatter_path_sel = JSFORMATTER_PATH_WIN_ARM64
            if release:
                jsformatter_path_sel = JSFORMATTER_REL_PATH_WIN_ARM64
        if comm_util.is_macos_sys():
            jsformatter_path_sel = JSFORMATTER_PATH_MAC
            if release:
                jsformatter_path_sel = JSFORMATTER_REL_PATH_MAC
    if validate:
        # validate test only support Windows x64 relase build
        jsformatter_path_sel = JSFORMATTER_REL_PATH_WIN_64
        if win_arm64:
            jsformatter_path_sel = JSFORMATTER_REL_PATH_WIN_ARM64
        if comm_util.is_macos_sys():
            jsformatter_path_sel = JSFORMATTER_REL_PATH_MAC
    if nodejs or validate:
        jsformatter_nodejs_script_sel = JSFORMATTER_NODEJS_SCRIPT_PATH

    # make runtime
    case_runtime = 0
    if nodejs == False and validate == False:
        case_runtime = CaseRuntime(jsformatter_path_sel)
    if nodejs:
        case_runtime = NodeCaseRuntime(jsformatter_nodejs_script_sel)
    if validate:
        case_runtime = ValidateCaseRuntime(jsformatter_path_sel, jsformatter_nodejs_script_sel)

    # prepare cases
    case_generator = CaseGenerator(TEST_CASE_DIR)
    test_cases = case_generator.generate()

    # run cases
    start_time = comm_util.get_cur_timestamp_millis()
    allpass = True
    idx = 1
    for name, case in test_cases.items():
        comm_util.log('name: ' + name)
        comm_util.log('source: ' + case.source)
        comm_util.log('result: ' + case.result)
        comm_util.log('running...')

        result = case_runtime.run_case(case)
        comm_util.log('[%d/%d]' % (idx, len(test_cases)))
        comm_util.log('')

        if result == 'ERROR':
            allpass = False
            break

        idx += 1

    end_time = comm_util.get_cur_timestamp_millis()
    duration_time = (end_time - start_time) / 1000.0

    if allpass:
        comm_util.log('%d cases ALL PASS, took %.2fs.' % (len(test_cases), duration_time))

    comm_util.log('Test args: x64=%r, release=%r, nodejs=%r, validate=%r' % (x64, release, nodejs, validate))
    comm_util.log('')

    case_runtime.dump_name()
    case_runtime.dump_info()
    case_runtime.dump_version()

if __name__ == '__main__':
    main()
