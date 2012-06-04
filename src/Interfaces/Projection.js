/**
 * Defines a projection interface.
 */
define(["Interface"], function(Interface) {
    var object = new Interface('Interfaces/Projection', [
        'getGroundResolution',
        'getViewPortStartInGlobalCoords',
        'projectToGlobalCoords',
        'unprojectFromGlobalCoords',
        'projectToViewPort',
        'unprojectFromViewPort'
    ]);

    return object;
});