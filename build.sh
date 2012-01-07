#!/bin/bash
java -jar lib/closure-compiler/compiler.jar --js \
    src/Crystal.js \
    src/Class.js \
    src/Interface.js \
--js_output_file dist/crystalmap.js
echo "Compilation finished"