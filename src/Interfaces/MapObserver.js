/**
 * Defines a map observer interface.
 */
define(["Interface"], function(Interface) {
    return new Interface('Interfaces/MapObserver', [
        'onAddToMap',
        'onRemoveFromMap'
    ]);
});