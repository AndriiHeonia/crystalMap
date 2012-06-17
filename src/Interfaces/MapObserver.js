/**
 * Defines a map observer interface.
 */
define(["System/Interface"], function(System_Interface) {
    var object = new System_Interface('Interfaces/MapObserver', [
        'onAddToMap',
        'onRemoveFromMap'
    ]);

    return object;
});