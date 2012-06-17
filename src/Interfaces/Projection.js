/**
 * Defines a projection interface.
 */
define(["System/Interface"], function(System_Interface) {
    var object = new System_Interface('Interfaces/Projection', [
        'getGroundResolution',
        'getViewPortStartInGlobalCoords',
        'projectToGlobalCoords',
        'unprojectFromGlobalCoords',
        'projectToViewPort',
        'unprojectFromViewPort'
    ]);

    return object;
});