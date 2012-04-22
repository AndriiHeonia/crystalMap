/**
 * Provides a Map functionaity.
 * @constructor
 * @extends {Crystal.Observable}
 */
Crystal.Map = function()
{
    // apply inheritance
    Crystal.Map.superclass.constructor.call(this);

    // @todo should be a public props

    /**
     * @type {Object}
     */
    var _container;
    
    /**
     * @type {Object}
     */
    var _center;

    /**
     * @type {Number}
     */
    var _zoom;

    /**
     * @type {Object}
     */
    var _projection;

    /**
     * Initialization.
     * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
     * @param {Object} center Geographic coordinates of the center. Optional.
     * @param {Number} zoom Zoom level. Optional.
     * @param {String} projection Projection. Optional.
     */
    this.initialize = function(container, center, zoom, projection)
    {
        var containerIsStr;
        
        containerIsStr = Crystal.Utils.Type.isString(container);
        _container = containerIsStr ? document.getElementById(container) : container;
        
        if(containerIsStr)
        {
            Crystal.Validators.NotNull.validate(_container, Crystal.Map.CLASS_NAME, 'initialize');
        }
        else
        {
            Crystal.Validators.DomElement.validate(_container, Crystal.Map.CLASS_NAME, 'initialize');
        }
        if(center)
        {
            Crystal.Validators.GeoPoint.validate(center);
        }        
        if(zoom)
        {
            Crystal.Validators.Number.validate(zoom, Crystal.Map.CLASS_NAME, 'initialize');
        }
        
        _container.innerHTML = '';
        _container.style.position = 'relative';
        _container.style.backgroundColor = '#F4F2EE';
        _center = center || {lat: 0, lon: 0};
        _zoom = zoom || 0;
        _projection = projection || Crystal.Projections.SphericalMercator;
        
        Crystal.MapRegister.add(this);
        
        // events, which can be fired by this object
        this.registerEvent([
            'ObserverAdding',
            'ObserverRemoving',
            'ZoomChanging',
            'CenterChanging'
        ]);
        
        _addDomListeners.call(this);        
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
     * @return {Object} Coordinates of the center.
     */
    this.getCenter = function()
    {
        return _center;
    }

    /**
     * Sets geographic coordinates of the center.
     * @param {Object} center Coordinates of the center. Required.
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
     * Returns a projection of the map.
     * @return {Object}
     */
    this.getProjection = function()
    {
        return _projection;
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
    
    function _handleDragging(event)
    {
        // @todo
//        _center = event.getGeoPoint();
        
        this.fireEvent('CenterChanging');
        console.log(event.map);
    }
    
    /**
     * 
     */
    function _addDomListeners()
    {
        Crystal.Utils.Dom.addListener(this.getContainer(), 'mousemove', Crystal.Utils.Common.bind(this, _handleDragging));
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);
}

// declare inheritance
Crystal.Class.extend(Crystal.Map, Crystal.Observable);

/**
 * @const
 * @type {String}
 */
Crystal.Map.CLASS_NAME = 'Crystal.Map';