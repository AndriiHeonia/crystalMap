/**
 * Defines a projection interface.
 */
define(["Interface"], function(Interface) {
    return new Interface('Interfaces/Projection', [
        'project',
        'unproject',
        'getGroundResolution'
    ]);
});