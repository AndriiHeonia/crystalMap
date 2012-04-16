/**
 * Provides a Map functionaity.
 * @constructor
 * @extends {Crystal.Observable}
 */
Crystal.Map = function()
{
    // apply inheritance
    Crystal.Map.superclass.constructor.call(this);
        
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
     * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
     * @param {Crystal.GeoPoint} center Geographic coordinates of the center. Optional.
     * @param {Number} zoom Zoom level. Optional.
     */
    this.initialize = function(container, center, zoom)
    {
        _validateConstructorParams(container, center, zoom);    
        _container = Crystal.Utils.Type.isString(container) === true ? document.getElementById(container) : container;
        _container.innerHTML = '';
        _container.style.position = 'relative';
        _container.style.backgroundColor = '#F4F2EE';
        _center = center || {lat: 0, lon: 0};
        _zoom = zoom || 0;
        console.log(this);        
        _addDomListeners();
        // events, which can be fired by this object
        this.registerEvent([
            'ObserverAdding',
            'ObserverRemoving',
            'ZoomChanging',
            'CenterChanging'
        ]);
    }

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
        Crystal.Validators.GeoPoint.validate(center);
        
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
     * Adds an observer to the map.
     * @param {Crystal.IMapObserver} observer Observer to listen map events. Required.
     */
    this.add = function(observer)
    {
        Crystal.Interface.isImplements(observer, [Crystal.IMapObserver]);
        
        // subscribing to the map events
        this.addListener('ObserverAdding', observer.onAddToMap);
        this.addListener('ObserverRemoving', observer.onRemoveFromMap);
        this.addListener('ZoomChanging', observer.onMapUpdate);
        this.addListener('CenterChanging', observer.onMapUpdate);

        this.fireEvent('ObserverAdding');
    }

    /**
     * Removes an observer from the map.
     * @param {Crystal.IMapObserver} observer Registered observer. Required.
     */
    this.remove = function(observer)
    {
        this.fireEvent('ObserverRemoving');
        
        // unsubscribing from the map events
        this.removeListener('ObserverAdding', observer.onAddToMap);
        this.removeListener('ObserverRemoving', observer.onRemoveFromMap);
        this.removeListener('ZoomChanging', observer.onMapUpdate);
        this.removeListener('CenterChanging', observer.onMapUpdate);        
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
        
        containerIsStr = Object.prototype.toString.call(container) === '[object String]';
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
        
        if(center)
        {
            Crystal.Validators.GeoPoint.validate(center);
        }
        
        if(zoom && Crystal.Utils.Type.isNumber(zoom) === false)
        {
            throw new TypeError('Map constructor called with invalid zoom.')
        }
    }
    
    function _handleDragging(event)
    {
        console.log(event);
    }
    
    /**
     * 
     */
    function _addDomListeners()
    {
        console.log(this);
//        Crystal.Utils.Dom.addListener(this.getContainer(), 'mousemove', _handleDragging);
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);
}

// declare inheritance
Crystal.Class.extend(Crystal.Map, Crystal.Observable);