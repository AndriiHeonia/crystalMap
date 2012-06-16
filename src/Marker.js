/**
 * DOM marker.
 * @todo
 */
define(['Utils/Dom', 'Utils/Common'], function(Utils_Dom, Utils_Common) {
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
    var _geoPoint;

    /**
     * @type {String}
     */
    var _iconUrl;

    /**
     * Initializes marker container.
     */
    function _initContainer() {
        var pixel;

        pixel = _map.projectToViewPort(_geoPoint);

        _self.container = Utils_Dom.create(
            'img',
            Utils_Common.createUniqueId('Marker'),
            'crystal-marker'
        );

        _self.container.src = _iconUrl || Utils_Common.getBaseUrl() + '/images/marker.png';
        _self.container.style.left = pixel.x + 'px';
        _self.container.style.top = pixel.y + 'px';
    }

    /**
     * Destroys a tile container.
     */
    function _destroyContainer() {
        _map.container.removeChild(_container);
        _self.container = null;
    }

    /**
     * Appends marker to the map.
     */
    function _draw() {
        _map.container.appendChild(_self.container);
        _redraw();
    }

    /**
     * Redraws marker into new position.
     */
    function _redraw() {
        var pixel;

        pixel = _map.projectToViewPort(_geoPoint);

        _self.container.style.left = pixel.x - (_self.container.clientWidth / 2) + 'px';
        _self.container.style.top = pixel.y - (_self.container.clientHeight) + 'px';
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
         */
        (function(options) {
            _geoPoint = options.geoPoint;
            _iconUrl = options.iconUrl;
        })(arguments[0]);

        /**
         * Handles and process addition to the map notification.
         * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
         */
        _self.onAddToMap = function(mapEvent) {
            _map = mapEvent.map;

            _initContainer();
            _draw();

            _map.addListener('ZoomChanging', _redraw);
            _map.addListener('CenterChanging', _redraw);
        };

        /**
         * Handles and process removal from the map notification.
         * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
         */
        _self.onRemoveFromMap = function(mapEvent) {
            _map.removeListener('ZoomChanging', _redraw);
            _map.removeListener('CenterChanging', _redraw);
                
            _destroyContainer();
            _map = null;
        };
    };

    return constructor;
});