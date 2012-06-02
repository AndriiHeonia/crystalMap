/**
 * Incapsulates information about mouse.
 */
define(['Projections/SphericalMercator'], function(Projections_SphericalMercator) {
    /**
     * @type {Object}
     */
    var _browserEvent;

    return function() {
        /**
         * Map, event has been raised in.
         * @type {Map|null}
         */
        this.map = null;

        /**
         * DOM element, event has been raised in.
         * @type {Object}
         */
        this.target = null;

        /**
         * Button was clicked when an event was triggered.
         * 0 - left mouse-button; 1 - middle mouse-button; 2 - right mouse-button.
         * @type {Number}
         */
        this.button = null;

        /**
         * X coordinate of the mouse pointer, relative to the current window, when an event was triggered.
         * @type {Number}
         */
        this.clientX = null;

        /**
         * Y coordinate of the mouse pointer, relative to the current window, when an event was triggered.
         * @type {Number}
         */
        this.clientY = null;

        /**
         * X coordinate of the mouse pointer, relative to the screen, when an event was triggered.
         * @type {Number}
         */
        this.screenX = null;

        /**
         * Y coordinate of the mouse pointer, relative to the screen, when an event was triggered.
         * @type {Number}
         */
        this.screenY = null;

        /**
         * @param {Object} event Browser event.
         * @param {Map|null} map Map, event has been raised in.
         */
        (function(event, map) {
            _browserEvent = event;
            
            this.target = event.target;
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.screenX = event.screenX;
            this.screenY = event.screenY;
            this.button = event.button; // @todo should be normalized for IE, @see http://www.w3schools.com/jsref/event_button.asp
                
            this.map = map;
        })(arguments[0], arguments[1]);

        /**
         * Stops propagation
         */
        this.stopPropagation = function() {
            _browserEvent.stopPropagation();
        };

        /**
         * Prevents default action
         */
        this.preventDefault = function() {
            _browserEvent.preventDefault();
        };
            
        // experimental code:

        /**
         * Returns a geographic coordinates by mouse cursor position.
         * @return {Object}
         */
        this.getGeoPoint = function() {
            var pixel;
            var mapSize;
            var zoomLevel = 10;
            var tileSize = 256;
            var mapCenterPixel;

            zoomLevel = this.map.getZoom();
            mapSize = Projections_SphericalMercator.getMapSize(tileSize, zoomLevel);

            mapCenterPixel = Projections_SphericalMercator.getPixelByGeoPoint(this.map.getCenter(), zoomLevel, tileSize);
            pixel = {
                x: mapSize - mapCenterPixel.x - (this.map.container.offsetWidth / 2) + this.clientX,
                y: mapSize - mapCenterPixel.y - (this.map.container.offsetHeight / 2) + this.clientY
            };

            return Projections_SphericalMercator.getGeoPointByPixel(pixel, zoomLevel, tileSize);
        },

        this.getPixel = function() {
            var pixel;
            var mapSize;
            var zoomLevel = 10;
            var tileSize = 256;
            var mapCenterPixel;

            zoomLevel = this.map.getZoom();
            mapSize = Projections_SphericalMercator.getMapSize(tileSize, zoomLevel);

            mapCenterPixel = Projections_SphericalMercator.getPixelByGeoPoint(this.map.getCenter(), zoomLevel, tileSize);
                
            return {
                x: mapSize - mapCenterPixel.x - (this.map.container.offsetWidth / 2) + this.clientX,
                y: mapSize - mapCenterPixel.y - (this.map.container.offsetHeight / 2) + this.clientY
            };
        };
    };
});