/**
 * Defines a map observer interface.
 */
define(["Interface"], function(Interface) {
    var object = new Interface('Interfaces/MapObserver', [
        'onAddToMap',
        'onRemoveFromMap'
    ]);

    return object;
});