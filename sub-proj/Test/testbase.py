#
# Base test
# Author: Sun Junwen
# Date: 2019-01-09
#
import collections
import hashlib
import os
from subprocess import call

import comm_util

OUTPUT_FILE_NAME = 'out.js'

class TestCase:
    case_dir = ''
    source = ''
    result = ''

class CaseGenerator(object):
    def __init__(self, case_dir):
        self.case_dir = case_dir

    def _is_result_file(self, file):
        filename_no_ext = os.path.splitext(file)[0]
        if filename_no_ext.endswith('.test'):
            return True
        return False

    def _file_to_case_name(self, file):
        filename_no_ext = os.path.splitext(file)[0]
        return filename_no_ext

    def _result_file_to_case_name(self, file):
        filename_no_ext = os.path.splitext(file)[0]
        case_name = filename_no_ext[:-5] # remove .test
        return case_name

    def _filter_out_case(self, case):
        return (case.source == '' or case.result == '')

    def _make_test_case(self, files):
        test_cases = {}

        for file in files:
            file = os.path.join(self.case_dir, file)
            if self._is_result_file(file):
                # case result
                case_name = self._result_file_to_case_name(file)
                if not (case_name in test_cases):
                    test_cases[case_name] = TestCase()

                test_cases[case_name].result = file
            else:
                case_name = self._file_to_case_name(file)
                if not (case_name in test_cases):
                    test_cases[case_name] = TestCase()

                test_cases[case_name].source = file

        for name in list(test_cases):
            case = test_cases[name]
            if self._filter_out_case(case):
                test_cases.pop(name, 0)
            else:
                case.case_dir = self.case_dir

        test_cases_ordered = collections.OrderedDict(sorted(test_cases.items()))

        return test_cases_ordered

    def generate(self):
        files = comm_util.list_file(self.case_dir)
        return self._make_test_case(files)

class CaseRuntime(object):
    def __init__(self, runtime_path):
        self.runtime_path = runtime_path
        self.out_file = OUTPUT_FILE_NAME

    def _case_execute(self, test_case):
        call([self.runtime_path, test_case.source, self.get_out_path_from_case(test_case)])

    def _case_result(self, test_case):
        result = 'ERROR'
        out_md5 = comm_util.md5_file(self.get_out_path_from_case(test_case))
        result_md5 = comm_util.md5_file(test_case.result)
        if out_md5 == result_md5:
            result = 'PASS'

        comm_util.log(result)
        return result

    def run_case(self, test_case):
        self._case_execute(test_case)
        return self._case_result(test_case)

    def get_out_path_from_case(self, test_case):
        return os.path.join(test_case.case_dir, self.out_file)

    def dump_name(self):
        comm_util.log('CaseRuntime')

    def dump_info(self):
        comm_util.log('Using %s' % (self.runtime_path))

    def dump_version(self):
        call([self.runtime_path, '--version'])
