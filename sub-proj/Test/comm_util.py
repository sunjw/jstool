import datetime
import hashlib
import io
import json
import math
import os
import platform
import re
import shlex
import shutil
import subprocess
import sys
import time

from subprocess import Popen, PIPE, STDOUT


# Log to stdout
def log(message):
    print('%s' % (message))


# Log to stderr
def log_err(message):
    print(message, file=sys.stderr)


def get_cur_timestamp():
    return math.floor(time.mktime(datetime.datetime.today().timetuple()))


def get_cur_timestamp_millis():
    return int(round(time.time() * 1000))


def find_strings_in_string(strings, in_string):
    for str_itr in strings:
        if in_string.find(str_itr) >= 0:
            return True

    return False


def pprint_dict_to_string(a_dict):
    return json.dumps(a_dict, indent=2, ensure_ascii=False)


def bytes_to_str(bytes_string):
    return bytes_string.decode('utf-8')


def is_ipv4(input_str):
    compile_ip = re.compile(
        '^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$')
    if compile_ip.match(input_str):
        return True
    else:
        return False


def list_file(dir_path):
    files = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]
    return files


def is_windows_sys():
    return (platform.system() == 'Windows')


def is_macos_sys():
    return (platform.system() == 'Darwin')


def is_linux_sys():
    return (platform.system() == 'Linux')


def get_machine():
    return platform.machine()


def fix_win_path(path):
    if is_windows_sys():
        return path.replace('/', '\\')
    else:
        return path


def fix_win_long_path(path):
    if is_windows_sys() and not path.startswith('\\\\?\\'):
        abs_path = os.path.abspath(path)
        return '\\\\?\\' + abs_path
    return path


def copy_file(source, dest):
    follow_symlinks_os = False
    if is_windows_sys():
        follow_symlinks_os = True
    shutil.copyfile(fix_win_long_path(source), fix_win_long_path(dest), follow_symlinks=follow_symlinks_os)


def copy_dir(source, dest):
    for filename in os.listdir(source):
        src_file = os.path.join(source, filename)
        dst_file = os.path.join(dest, filename)
        if os.path.isdir(src_file):
            if not os.path.exists(dst_file):
                os.mkdir(dst_file)
            copy_dir(src_file, dst_file)

        if os.path.isfile(src_file):
            copy_file(src_file, dst_file)


def remove_file(path):
    fixed_path = fix_win_long_path(path)
    if os.path.exists(fixed_path):
        os.remove(fixed_path)


def remove_dir(path):
    fixed_path = fix_win_long_path(path)
    if os.path.exists(fixed_path):
        shutil.rmtree(fixed_path)


def read_file_text(file_path):
    file_content = ''
    with open(file_path, encoding='utf-8') as f:
        file_content = f.read()
    return file_content


def write_file_text(file_path, file_content, eol=None):
    with io.open(file_path, 'w', newline=eol, encoding='utf-8') as file:
        file.write(file_content)


def read_file_binary(file_path):
    if not os.path.exists(file_path):
        return ''
    file_content = open(file_path, 'rb').read()
    return file_content


def write_file_binary(file_path, file_content):
    file_obj = open(file_path, 'wb')
    file_obj.write(file_content)
    file_obj.close()


def call_command(args_list, is_shell=False):
    subprocess.call(args_list, shell=is_shell)


def call_command_with_output(args_list, is_shell=False):
    process = subprocess.Popen(args_list, shell=is_shell,
                                stdin=subprocess.PIPE,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
    # wait for the process to terminate
    stdout, stderr = process.communicate()
    returncode = process.returncode
    return (returncode, stdout.decode('utf-8'), stderr.decode('utf-8'))


def run_cmd(cmd):
    log('Run: \n%s' % (cmd))
    os.system(cmd)


def run_cmd_with_stdio(cmd, input_data):
    log('Run: \n%s' % (cmd))
    p = Popen(shlex.split(cmd), stdout=PIPE, stdin=PIPE, stderr=STDOUT)
    return p.communicate(input = input_data)[0]


def run_cmd_with_stderr(cmd):
    log('Run: \n%s' % (cmd))
    p = Popen(shlex.split(cmd), stdout=PIPE, stdin=PIPE, stderr=PIPE)

    stdout_text, stderr_text = p.communicate()

    return stdout_text, stderr_text


def md5_str(input_str, encode='utf-8'):
    md5hash = hashlib.md5()
    md5hash.update(input_str.encode(encode))
    return md5hash.hexdigest()


def md5_file(file_path):
    filemd5 = hashlib.md5(open(file_path, 'rb').read()).hexdigest()
    return filemd5


def query_yes_no(question, default='yes'):
    # Ask a yes/no question via raw_input() and return their answer.
    # "question" is a string that is presented to the user.
    # "default" is the presumed answer if the user just hits <Enter>.
    #         It must be "yes" (the default), "no" or None (meaning
    #         an answer is required of the user).
    # The "answer" return value is True for "yes" or False for "no".

    valid = {'yes': True, 'y': True, 'ye': True, 'no': False, 'n': False}
    if default is None:
        prompt = '[y/n] '
    elif default == 'yes':
        prompt = '[Y/n] '
    elif default == 'no':
        prompt = '[y/N] '
    else:
        raise ValueError('invalid default answer: [%s]' % default)

    while True:
        log('%s %s' % (question, prompt))
        choice = input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            log('Please respond with "yes" or "no" (or "y" or "n").')
