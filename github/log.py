import traceback
import sys
import os
from pathlib import Path

import util
from datetime import datetime


_log_file = None


def _define_log_file_path(specified_log_dir):
    if specified_log_dir is None:
        specified_log_dir = os.getcwd()
    directory = util.ensure_directory(Path(specified_log_dir), Path(os.getcwd()))
    base_filename = datetime.now().strftime("%y%m%d-%H%M%S")
    file_path = directory.joinpath(f"{base_filename}.log")
    suffix_idx = 0
    while file_path.exists():
        suffix_idx += 1
        file_path = directory.joinpath(f"{base_filename}_{suffix_idx}.log")
    return file_path


def _log_message(level, tag, msg, stderr=False):
    assembled_msg = f"[{timestamp()}] [{level}] [{tag}] {msg}"
    file = sys.stderr if stderr else sys.stdout
    print(assembled_msg, file=file)
    if _log_file is not None:
        _log_file.write(assembled_msg)
        _log_file.write("\n")
        _log_file.flush()


def _terminate(exit_code):
    global _log_file
    if _log_file is not None:
        _log_file.close()
    exit(exit_code)


def open_log_file(specified_log_dir):
    global _log_file
    if _log_file is not None:
        warning("LOGS", "Log file already open.")
        return
    file_path = _define_log_file_path(specified_log_dir)
    _log_file = open(file_path, "w", encoding="utf-8")
    info("LOGS", f"Logging to file '{file_path}'.")


def timestamp():
    return datetime.now().strftime(util.get_time_format_pattern())


def info(tag, msg):
    _log_message("INFO", tag, msg)


def warning(tag, msg):
    _log_message("WARN", tag, msg)


def error(tag, msg):
    _log_message("ERR!", tag, msg, stderr=True)


def unhandled_exception_exit(tag, exception):
    error(tag, f"Uncaught {type(exception).__name__}: See traceback below.")
    _log_message("TBCK", tag, traceback.format_exc(), stderr=True)
    abort_and_exit(tag, "Exiting due to exception.")


def terminate_successfully(tag):
    _log_message("DONE", tag, "Script execution terminated successfully.")
    _terminate(0)


def abort_and_exit(tag, msg):
    error(tag, msg)
    _log_message("HALT", tag, "Execution terminated with errors.", stderr=True)
    _terminate(1)
