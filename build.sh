#!/bin/bash
java -jar lib/closure-compiler/compiler.jar --js \
    src/Crystal.js \
    src/Class.js \
    src/Interface.js \
    src/interfaces.js \
    src/GeoPoint.js \
    src/Map.js \
    src/Events/Events.js \
    src/Events/Map.js \
    src/Layers/Layers.js \
    src/Layers/Tile.js \
    src/Utils/Utils.js \
--js_output_file dist/crystalmap.js
echo "Compilation finished"