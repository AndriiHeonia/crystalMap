/**
 * Defines a projection interface.
 */
define(["Interface"], function(Interface) {
    var object = new Interface('Interfaces/Projection', [
        'project',
        'unproject',
        'getGroundResolution'
    ]);

    return object;
});