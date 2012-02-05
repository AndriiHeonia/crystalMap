/**
 * Provides a Map functionaity.
 * @constructor
 * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
 * @param {Crystal.GeoPoint} center Geographic coordinates of the center. Optional.
 * @param {Number} zoom Zoom level. Optional.
 * @implements {IObservable}
 */
Crystal.Map = function(container, center, zoom)
{
    /**
     * @todo To think about event manager.
     */
    var _observers = [];
    
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
     * Sets geographic coordinates of the center.
     * @param {Crystal.GeoPoint} center Coordinates of the center. Required.
     */
    this.setCenter = function(center)
    {
        if(!(center instanceof Crystal.GeoPoint))
        {
            throw new TypeError('setCenter method called with invalid center.')
        }
        _center = center;
        _notifyObserversOnUpdate.call(this);
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
     * Sets zoom level of the map.
     * @param {Number} zoom Zoom level. Required.
     */
    this.setZoom = function(zoom)
    {
        if(Object.prototype.toString.call(zoom) != '[object Number]')
        {
            throw new TypeError('setZoom method called with invalid zoom.')
        }
        _zoom = zoom;
        _notifyObserversOnUpdate.call(this);
    }

    /**
     * Adds layer to the map.
     * @param {Crystal.Layers.Tile} layer Tile layer.
     */
    this.addLayer = function(layer)
    {
        Crystal.Interface.ensureImplements(layer, [IMapObserver]);
        _layers.push(layer);
        _observers.push(layer);
        _notifyObserversOnAdd.call(this, layer);
    }

    /**
     * Removes layer from the map.
     * @param {Crystal.Layers.Tile} layer Tile layer,
     */
    this.removeLayer = function(layer)
    {        
        _layers.splice(_layers.indexOf(layer), 1);
        _observers.splice(_observers.indexOf(layer), 1);
        _notifyObserversOnRemove.call(this, layer);        
    }

    /**
     * Notifies observers about addition to the map.
     * @param {IMapObserver} observer Observer, should be notified. Optional. If not passed - all observers will be notified.
     */
    var _notifyObserversOnAdd = function(observer)
    {
        if(observer)
        {
            observer.onAddToMap(new Crystal.Events.Map(this));
        }
        else
        {
            for(var i = 0; i < _layers.length; i++)
            {
                _observers[i].onAddToMap(new Crystal.Events.Map(this));
            }            
        }
    }

    /**
     * Notifies observers about map updates.
     * @param {IMapObserver} observer Observer, should be notified. Optional. If not passed - all observers will be notified.
     */
    var _notifyObserversOnUpdate = function(observer)
    {
        if(observer)
        {
            observer.onMapUpdate(new Crystal.Events.Map(this));
        }
        else
        {
            for(var i = 0; i < _layers.length; i++)
            {
                _observers[i].onMapUpdate(new Crystal.Events.Map(this));
            }            
        }
    }
    
    /**
     * Notifies observers about removal from the map.
     * @param {IMapObserver} observer Observer, should be notified. Optional. If not passed - all observers will be notified.
     */
    var _notifyObserversOnRemove = function(observer)
    {
        if(observer)
        {
            observer.onRemoveFromMap(new Crystal.Events.Map(this));
        }
        else
        {
            for(var i = 0; i < _layers.length; i++)
            {
                _observers[i].onRemoveFromMap(new Crystal.Events.Map(this));
            }            
        }
    }

    /**
     * Validate constructor params.
     * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
     * @param {Crystal.GeoPoint} center Geographic coordinates of the center. Optional.
     * @param {Number} zoom Zoom level. Optional.
     */
    var _validateConstructorParams = function(container, center, zoom)
    {
        var containerIsStr;
        var containerObj;
        
        containerIsStr = Object.prototype.toString.call(container) == '[object String]';
        containerObj = containerIsStr ? document.getElementById(container) : container;
        if(containerIsStr)
        {
            if(containerObj === null)
            {
                throw new ReferenceError('Map constructor called with invalid container id.');
            }
        }
        else
        {
            if(!Crystal.Utils.Dom.isElement(containerObj))
            {
                throw new TypeError('Map constructor called with invalid container DOM element.');
            }
        }
        
        if(center && !(center instanceof Crystal.GeoPoint))
        {
            throw new TypeError('Map constructor called with invalid center.')
        }
        
        if(zoom && Object.prototype.toString.call(zoom) != '[object Number]')
        {
            throw new TypeError('Map constructor called with invalid zoom.')
        }
    }

    /**
     * Initialization.
     */
    _validateConstructorParams(container, center, zoom);
    _container = Object.prototype.toString.call(container) == '[object String]' ? document.getElementById(container) : container;
    _container.innerHtml = '';
    _container.style.position = 'relative';
    _center = center;
    _zoom = zoom || 0;
}

Crystal.Map.prototype.CLASS_NAME = 'Crystal.Map';