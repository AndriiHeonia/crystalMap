/**
 * Debugging loader.
 */

var lab = $LAB

// namespaces
.script('../src/namespaces.js').wait()

// interfaces
.script('../src/Interface.js').wait()
.script('../src/interfaces.js')

// class
.script('../src/Class.js').wait()

// 1st level classes
.script('../src/Observable.js')
.script('../src/GeoPoint.js')
.script('../src/Map.js')
.script('../src/Pixel.js')

// 2nd level classes
.script('../src/Utils/Common.js')
.script('../src/Utils/Dom.js')
.script('../src/Events/Map.js')
.script('../src/Layers/Tile.js').wait();

if (/.*index.html/.test(location.href))
{
    // debug script
    lab.script('../debug/index.js').wait();
}
else if (/.*spec.html/.test(location.href))
{
    // jasmine scripts
    lab.script('../lib/jasmine/jasmine.js').wait()
    .script('../lib/jasmine/jasmine-html.js').wait()
    
     // spec suites
    .script('../spec/suites/ClassSpec.js').wait()
    .script('../spec/suites/InterfaceSpec.js').wait()
    .script('../spec/suites/GeoPointSpec.js').wait()
    .script('../spec/suites/PixelSpec.js').wait()
    .script('../spec/suites/Utils/CommonSpec.js').wait()
    .script('../spec/suites/Utils/DomSpec.js').wait()
    .script('../spec/suites/Layers/TileSpec.js').wait()
    .script('../spec/suites/Events/MapSpec.js').wait()
    .script('../spec/suites/MapSpec.js')
    .wait(
    function()
    {
        var jasmineEnv = window.jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        var trivialReporter = new window.jasmine.TrivialReporter();
        jasmineEnv.addReporter(trivialReporter);
        jasmineEnv.specFilter = function(spec) {
            return trivialReporter.specFilter(spec);
        };
        var currentWindowOnload = window.onload;
        window.onload = function() {
            if (currentWindowOnload) {
                currentWindowOnload();
            }
            execJasmine();
        };
        function execJasmine() {
            jasmineEnv.execute();
        }
    });
}