/**
 * Defines a layer interface.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(["System/Interface"], function(System_Interface) {
    var object = new System_Interface('Interfaces/Layer', [
        'getSize',
        'getGroundResolution',
        'getScale',
        'projectToViewPort'
    ]);

    return object;
});