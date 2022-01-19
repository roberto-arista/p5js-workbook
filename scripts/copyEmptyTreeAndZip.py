#!/usr/bin/env python3
# coding: utf-8

# -------------------------------------------------- #
# Copy website tree, empty exercise files and zip it #
# -------------------------------------------------- #

# --- Modules --- #
from pathlib import Path
from shutil import copytree, rmtree, copy, make_archive

# --- Objects & Methods --- #

# --- Constants --- #
DONT_TOUCH = ['static', '.lektor', ]

# --- Variables --- #
root = Path('..')
emptySketch = 'emptySketch.js'

# --- Instructions --- #
if __name__ == '__main__':
    tempPath = root / 'p5js_workbook'
    if tempPath.exists():
        rmtree(tempPath)
    copytree(root / 'build', tempPath)

    for eachScript in [js for js in tempPath.glob('exercises/**/*.js')]:
        eachScript.unlink()
        copy(emptySketch, eachScript)

    outputPath = root / 'assets' / 'static' / tempPath.name
    make_archive(outputPath, 'zip', tempPath)
    rmtree(tempPath)
