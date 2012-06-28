/**
 * Defines a map observer interface.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(["System/Interface"], function(System_Interface) {
    var object = new System_Interface('Interfaces/MapObserver', [
        'onAddToMap',
        'onRemoveFromMap'
    ]);

    return object;
});