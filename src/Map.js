/**
 * Provides a Map functionaity.
 * @constructor
 * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map.
 * @param {Crystal.GeoPoint} center Geographic coordinates of the center.
 * @param {Number} zoom Zoom level.
 * @implements {IObservable}
 */
Crystal.Map = function(container, center, zoom)
{
    /**
     * @type {Array}
     */
    var _layers = [];
    
    /**
     * @type {Object}
     */
    var _container;
    
    /**
     * @type {Crystal.GeoPoint}
     */
    var _center;

    /**
     * @type {Number}
     */
    var _zoom;
    
    /**
     * Returns DOM element, which contains this map.
     * @return {Object}
     */
    this.getContainer = function()
    {
        return _container;
    }

    /**
     * Returns geographic coordinates of the center.
     * @return {Crystal.GeoPoint} Coordinates of the center.
     */
    this.getCenter = function()
    {
        return _center;
    }

    /**
     * Returns zoom level of the map.
     * @return {Number} Zoom level.
     */
    this.getZoom = function()
    {
        return _zoom;
    }

    /**
     * Adds layer to the map.
     * @param {Crystal.Layers.Tile} layer Tile layer.
     */
    this.addLayer = function(layer)
    {
        Crystal.Interface.ensureImplements(layer, [IMapObserver]);
        _layers.push(layer);
        
        _notifyObserversOnAdd.call(this);
    }

    /**
     * Removes layer from the map.
     * @param {Crystal.Layers.Tile} layer Tile layer,
     */
    this.removeLayer = function(layer)
    {
        for(var i = 0; i < _layers.length; i++)
        {
            if(_layers[i] === layer)
            {
                delete _layers[i];
            }
        }
        
        _notifyObserversOnRemove.call(this);
    }

    /**
     * Notifies observers about addition to the map.
     */
    var _notifyObserversOnAdd = function()
    {
        for(var i = 0; i < _layers.length; i++)
        {
            _layers[i].onAddToMap(new Crystal.Events.Map(this));
        }
    }

    /**
     * Notifies observers about map updates.
     */
    var _notifyObserversOnUpdate = function()
    {
        for(var i = 0; i < _layers.length; i++)
        {
            _layers[i].onMapUpdate(new Crystal.Events.Map(this));
        }
    }
    
    /**
     * Notifies observers about removal from the map.
     */
    var _notifyObserversOnRemove = function()
    {
        for(var i = 0; i < _layers.length; i++)
        {
            _layers[i].onRemoveFromMap(new Crystal.Events.Map(this));
        }
    }
    
    /**
     * Initialization.
     * @todo validate params.
     */
    _container = Object.prototype.toString.call(container) == '[object String]' ? document.getElementById(container) : container;
    _center = center;
    _zoom = zoom || 0;
}

Crystal.Map.prototype.CLASS_NAME = 'Crystal.Map';