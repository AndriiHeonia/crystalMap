/**
* Defines a map observer functionaity.
* @interface
* @todo onMapUpdate should be removed
*/
Crystal.IMapObserver = new Crystal.Interface('IMapObserver', ['onMapUpdate', 'onAddToMap', 'onRemoveFromMap']);