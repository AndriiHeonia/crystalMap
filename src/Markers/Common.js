/**
 * DOM marker module.
 * @todo
 */
define(function() {
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
        _self.container = Utils_Dom.create(
            'div',
            Utils_Common.createUniqueId('Markers/Common'),
            'crystal-marker'
        );

        _self.container.style.position = 'absolute';
        _self.container.style.left = pixel.x + 'px';
        _self.container.style.top = pixel.y + 'px';
        _self.container.style.width = '20px';
        _self.container.style.height = '20px';
        _self.container.style.backgroundColor = 'blue';        
    }

    /**
     * Destroys a tile container.
     */
    function _destroyContainer() {
        _map.container.removeChild(_container);
        _self.container = null;
    }

    function _redraw() {
        var pixel = map.projectToViewPort(_geoPoint);
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
        this.container = null;

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

            _redraw();
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