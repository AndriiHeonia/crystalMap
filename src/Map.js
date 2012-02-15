/**
 * Provides a Map functionaity.
 * @constructor
 * @extends {Crystal.Observable}
 * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
 * @param {Crystal.GeoPoint} center Geographic coordinates of the center. Optional.
 * @param {Number} zoom Zoom level. Optional.
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
     * Initialization.
     */
    _validateConstructorParams(container, center, zoom);    
    Crystal.Map.superclass.constructor.call(this);
    _container = Object.prototype.toString.call(container) == '[object String]' ? document.getElementById(container) : container;
    _container.innerHTML = '';
    _container.style.position = 'relative';
    _container.style.backgroundColor = '#F4F2EE';
    _center = center || new Crystal.GeoPoint(0, 0);
    _zoom = zoom || 0;
    this.registerEvent(['LayerAdding', 'LayerRemoving', 'ZoomChanging', 'CenterChanging']); // events can be fired by this object
    
    /**
     * Returns an event object with information about the map.
     * @return {Crystal.Events.Map}
     */
    this.getEventObject = function()
    {
        return new Crystal.Events.Map(this);
    }
    
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
            throw new TypeError('setCenter method called with invalid center.');
        }
        _center = center;
        this.fireEvent('CenterChanging');
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
        this.fireEvent('ZoomChanging');
    }

    /**
     * Adds layer to the map.
     * @param {Crystal.Layers.Tile} layer Tile layer.
     */
    this.addLayer = function(layer)
    {
        Crystal.Interface.ensureImplements(layer, [IMapObserver]);
        
        // subscribing to the map events
        this.addListener('LayerAdding', layer.onAddToMap);
        this.addListener('LayerRemoving', layer.onRemoveFromMap);
        this.addListener('ZoomChanging', layer.onMapUpdate);
        this.addListener('CenterChanging', layer.onMapUpdate);

        _layers.push(layer);
        this.fireEvent('LayerAdding');
    }

    /**
     * Removes layer from the map.
     * @param {Crystal.Layers.Tile} layer Tile layer,
     */
    this.removeLayer = function(layer)
    {        
        _layers.splice(_layers.indexOf(layer), 1);
        this.fireEvent('LayerRemoving');
    }

    /**
     * Validate constructor params.
     * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
     * @param {Crystal.GeoPoint} center Geographic coordinates of the center. Optional.
     * @param {Number} zoom Zoom level. Optional.
     */
    function _validateConstructorParams(container, center, zoom)
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
}

Crystal.Class.extend(Crystal.Map, Crystal.Observable);

Crystal.Map.prototype.CLASS_NAME = 'Crystal.Map';