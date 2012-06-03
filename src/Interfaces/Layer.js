/**
 * Defines a layer interface.
 */
define(["Interface"], function(Interface) {
    var object = new Interface('Interfaces/Layer', [
        'getSize',
        'getGroundResolution',
        'getScale',
        'projectToViewPort'
    ]);

    return object;
});