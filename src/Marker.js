/**
 * DOM marker.
 * @author Andrey Geonya <a.geonya@gmail.com>
 * @todo Should be completed
 */
define(['Utils/Dom', 'Utils/Common', 'Draggable', 'Vendors/PubSub'], function(Utils_Dom, Utils_Common, Draggable, Vendors_PubSub) {
    /**
     * @type {Markers/Common}
     */
    var _self;

    /**
     * @type {Map} Map instance, marker belongs to.
     */
    var _map;

    /**
     * @type {Object}
     */
    var _initGeoPoint;

    /**
     * @type {Object}
     */
    var _pixel;

    /**
     * @type {String}
     */
    var _iconUrl;

    /**
     * @type {Boolean}
     */
    var _isDraggable;

    /**
     * Initializes marker container.
     */
    function _initContainer() {
        _self.container = Utils_Dom.create(
            'img',
            Utils_Common.createUniqueId('Marker'),
            'crystal-marker'
        );

        _self.container.src = _iconUrl;
    }

    /**
     * Destroys a tile container.
     */
    function _destroyContainer() {
        _map.baseLayer.container.removeChild(_self.container);
        _self.container = null;
    }

    /**
     * Appends marker to the map.
     */
    function _draw() {
        _map.baseLayer.container.appendChild(_self.container);
        _redraw();
    }

    /**
     * Redraws marker into new position.
     */
    function _redraw() {
        _self.container.style.left = _pixel.x - (_self.container.clientWidth / 2) + 'px';
        _self.container.style.top = _pixel.y - (_self.container.clientHeight) + 'px';
    }

    /**
     * @constructor
     * @implements {IMapObserver}
     */
    var constructor = function() {
        _self = this;

        /**
         * @type {Object} Marker DOM object.
         */
        _self.container = null;

        /**
         * @type {Boolean} Marker visibility state.
         */
        _self.isShown = false;

        /**
         * Init.
         * @param {Object} options Marker options. Required. Structure:
         * - {Object} geoPoint Geographic point of the marker. Structure:
         *  - {Number} lat Latitude.
         *  - {Number} lon Longitude.
         * - {String} iconUrl Marker icon url.
         * - {Boolean} isDraggable Defines or marker is draggable.
         */
        (function(options) {
            _initGeoPoint = options.geoPoint;
            _iconUrl = options.iconUrl || Utils_Common.getBaseUrl() + '/images/marker.png';
            _isDraggable = options.isDraggable || false;
        })(arguments[0]);

        /**
         * Handles and process addition to the map notification.
         * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
         */
        _self.onAddToMap = function(mapEvent) {
            _map = mapEvent.map;
            _pixel = _map.projectToViewPort(_initGeoPoint);

            _initContainer();
            _draw();

            if(_isDraggable === true) {
                _self.enableDragging(_map, _self.container);
            }

            Vendors_PubSub.subscribe('Map/OnCenterChange', _redraw);
            Vendors_PubSub.subscribe('Map/OnZoomChange', _redraw);
        };

        /**
         * Handles and process removal from the map notification.
         * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
         */
        _self.onRemoveFromMap = function(mapEvent) {
            Vendors_PubSub.unsubscribe('Map/OnCenterChange', _redraw);
            Vendors_PubSub.unsubscribe('Map/OnZoomChange', _redraw);
                
            _destroyContainer();
            _pixel = null;
            _map = null;
        };

        /**
         * Handles and process dragging notification.
         */
        _self.onDrag = function(event) {
            _pixel = event.currentPixel;
            _pixel.x -= _map.baseLayer.container.offsetLeft;
            _pixel.y -= _map.baseLayer.container.offsetTop;
            _pixel.x -= event.offsetPixel.x;
            _pixel.y -= event.offsetPixel.y;
            
            _self.container.style.left = _pixel.x + 'px';
            _self.container.style.top = _pixel.y + 'px';
        };
    };

    constructor.prototype = Draggable;
    constructor.prototype.parent = constructor.prototype;

    return constructor;
});