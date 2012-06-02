/**
 * Defines a layer interface.
 */
define(["Interface"], function(Interface) {
    return new Interface('Interfaces/Layer', [
        'getSize',
        'getGroundResolution',
        'getScale',
        'projectToViewPort'
    ]);
});