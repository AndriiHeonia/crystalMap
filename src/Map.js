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
     * @type {Array}
     */
    var _userObservers = [];

    /**
     * Initialization.
     * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
     * @param {Object} center Geographic coordinates of the center. Optional.
     * @param {Number} zoom Zoom level. Optional.
     */
    this.initialize = function(container, center, zoom)
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

        Crystal.MapRegister.add(this);
        
        // events, which can be fired by this object
        this.registerEvent([
            'MapUpdating',
            'ZoomChanging',
            'CenterChanging'
        ]);
        
        _addDomListeners.call(this);
    };

    /**
     * Returns an event object with information about the map.
     * @return {Crystal.Events.Map}
     */
    this.getEventObject = function()
    {
        return new Crystal.Events.Map(this);
    };

    /**
     * Returns geographic coordinates of the center.
     * @return {Object} Coordinates of the center.
     */
    this.getCenter = function()
    {
        return _center;
    };

    /**
     * Sets geographic coordinates of the center.
     * @param {Object} center Coordinates of the center. Required.
     */
    this.setCenter = function(center)
    {
        Crystal.Validators.GeoPoint.validate(center);
        
        _center = center;
        this.fireEvent('CenterChanging');
    };

    /**
     * Returns zoom level of the map.
     * @return {Number} Zoom level.
     */
    this.getZoom = function()
    {
        return _zoom;
    };

    /**
     * Sets zoom level of the map.
     * @param {Number} zoom Zoom level. Required.
     */
    this.setZoom = function(zoom)
    {
        Crystal.Validators.Number.validate(zoom, Crystal.Map.CLASS_NAME, 'setZoom');
        _zoom = zoom;
        this.fireEvent('ZoomChanging');
    };

    /**
     * Adds an observer to the map.
     * @param {Crystal.IMapObserver} observer Observer to listen map events. Required.
     */
    this.add = function(observer)
    {
        Crystal.Interface.isImplements(observer, [Crystal.IMapObserver]);
        
        _userObservers.push(observer);
        observer.onAddToMap(this.getEventObject());
        this.fireEvent('MapUpdating');
    };

    /**
     * Removes an observer from the map.
     * @param {Crystal.IMapObserver} observer Registered observer. Required.
     */
    this.remove = function(observer)
    {
        Crystal.Interface.isImplements(observer, [Crystal.IMapObserver]);

        observer.onRemoveFromMap(this.getEventObject());
        _userObservers.splice(_userObservers.indexOf(observer), 1);
        this.fireEvent('MapUpdating');
    };
    
    /**
     * Destructor
     */
    this.destroy = function() {
        // Calls onRemoveFromMap method to each user added observer and clears _userObservers array
        for(var i = 0; i < _userObservers.length; i++)
        {
            _userObservers[i].onRemoveFromMap(this.getEventObject);
        }
        _userObservers = [];

        Crystal.MapRegister.remove(this.container.id);
    };
    
    function _handleDragging(event)
    {
        // @todo
//        console.log('src:');
//        console.log(event.getPixel());
//        console.log(event.getGeoPoint());

//        console.log('converted:');
//        console.log(Crystal.Projections.SphericalMercator.getPixelByGeoPoint(event.getGeoPoint(), 10, 256));
//        console.log(Crystal.Projections.SphericalMercator.getGeoPointByPixel(event.getPixel(), 10, 256));

        /*_center = event.getGeoPoint();
        this.fireEvent('CenterChanging');*/
    }
    
    /**
     *
     */
    function _addDomListeners()
    {
        Crystal.Utils.Dom.addListener(this.container, 'click', Crystal.Utils.Common.bind(this, _handleDragging));
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);
};

// declare inheritance
Crystal.Class.extend(Crystal.Map, Crystal.Observable);

/**
 * @const
 * @type {String}
 */
Crystal.Map.CLASS_NAME = 'Crystal.Map';