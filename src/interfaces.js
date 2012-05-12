/**
 * Defines a map observer interface.
 * @interface
 */
Crystal.IMapObserver = new Crystal.Interface('IMapObserver', ['onAddToMap', 'onRemoveFromMap']);

/**
 * Defines a projection interface.
 * @interface
 */
Crystal.IProjection = new Crystal.Interface('IProjection', ['project', 'unproject', 'getGroundResolution']);

/**
 * Defines a layer interface.
 * @interface
 */
Crystal.ILayer = new Crystal.Interface('ILayer', ['getSize', 'getGroundResolution', 'getScale', 'projectToViewPort']);