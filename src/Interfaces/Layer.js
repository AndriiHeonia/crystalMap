/**
 * Defines a layer interface.
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