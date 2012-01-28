/**
 * Defines a map functionaity.
 * @interface
 */
var ILayer = new Crystal.Interface('ILayer', ['redraw']);

/**
 * Defines a map observer functionaity.
 * @interface
 */
var IMapObserver = new Crystal.Interface('IMapObserver', ['onMapUpdate', 'onAddToMap', 'onRemoveFromMap']);

/**
 * Defines an observable functionaity.
 * @interface
 */
var IObservable = new Crystal.Interface('IObservable', ['getContainer']);