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
.script('../src/Map.js')

// 2nd level classes
.script('../src/Utils/Common.js')
.script('../src/Utils/Dom.js')
.script('../src/Utils/DomEventFactory.js')
.script('../src/Utils/Type.js')
.script('../src/Events/Map.js')
.script('../src/Events/Mouse.js')
.script('../src/Layers/Tile.js')
.script('../src/Validators/Array.js')
.script('../src/Validators/Boolean.js')
.script('../src/Validators/Boolean.js')
.script('../src/Validators/GeoPoint.js')
.script('../src/Validators/Instance.js')
.script('../src/Validators/Number.js')
.script('../src/Validators/Pixel.js')
.script('../src/Validators/String.js')
.wait();

// 3d level classes

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
    .script('../spec/suites/ClassSpec.js')
    .script('../spec/suites/InterfaceSpec.js')
    .script('../spec/suites/Utils/CommonSpec.js')
    .script('../spec/suites/Utils/DomSpec.js')
    .script('../spec/suites/Utils/TypeSpec.js')    
    .script('../spec/suites/Layers/TileSpec.js')
    .script('../spec/suites/Events/MapSpec.js')
    .script('../spec/suites/MapSpec.js')
    .script('../spec/suites/Validators/ArraySpec.js')
    .script('../spec/suites/Validators/BooleanSpec.js')
    .script('../spec/suites/Validators/GeoPointSpec.js')
    .script('../spec/suites/Validators/InstanceSpec.js')
    .script('../spec/suites/Validators/NumberSpec.js')    
    .script('../spec/suites/Validators/PixelSpec.js')
    .script('../spec/suites/Validators/StringSpec.js')    
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