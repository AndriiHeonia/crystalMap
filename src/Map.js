/**
 * Provides a map functionaity.
 * Map fires the next events:
 * - MapUpdating - when any object added to the map or removed from the map;
 * - ZoomChanging - when map zoom changed;
 * - CenterChanging - when map center changed.
 *
 * @constructor
 * @extends {Crystal.Observable}
 */
Crystal.Map = function()
{
    // apply inheritance
    Crystal.Map.superclass.constructor.call(this);

    /**
     * DOM element, which contains this map.
     * @type {Object}
     */
    this.container = null;
    
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
        this.container = containerIsStr ? document.getElementById(container) : container;
        
        if(containerIsStr)
        {
            Crystal.Validators.NotNull.validate(this.container, Crystal.Map.CLASS_NAME, 'initialize');
        }
        else
        {
            Crystal.Validators.DomElement.validate(this.container, Crystal.Map.CLASS_NAME, 'initialize');
        }
        if(center)
        {
            Crystal.Validators.GeoPoint.validate(center);
        }        
        if(zoom)
        {
            Crystal.Validators.Number.validate(zoom, Crystal.Map.CLASS_NAME, 'initialize');
        }
        
        this.container.innerHTML = '';
        this.container.style.position = 'relative';
        this.container.style.backgroundColor = '#F4F2EE';
        _center = center || {lat: 0, lon: 0};
        _zoom = zoom || 0;
        _projection = projection || Crystal.Projections.SphericalMercator;
        
        Crystal.MapRegister.add(this);
        
        // events, which can be fired by this object
        this.registerEvent([
            'MapUpdating',
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
        Crystal.Validators.Number.validate(zoom, Crystal.Map.CLASS_NAME, 'setZoom');
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
        
        observer.onAddToMap(this.getEventObject());
        this.fireEvent('MapUpdating');
    }

    /**
     * Removes an observer from the map.
     * @param {Crystal.IMapObserver} observer Registered observer. Required.
     */
    this.remove = function(observer)
    {
        Crystal.Interface.isImplements(observer, [Crystal.IMapObserver]);

        observer.onRemoveFromMap(this.getEventObject());
        this.fireEvent('MapUpdating');
    }
    
    /**
     * Destructor
     */
    this.destroy = function() {
        Crystal.MapRegister.remove(this.container.id);
        // @todo fire observers
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
        Crystal.Utils.Dom.addListener(this.container, 'mousemove', Crystal.Utils.Common.bind(this, _handleDragging));
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