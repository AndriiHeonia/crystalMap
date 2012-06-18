/**
 * Incapsulates information about mouse.
 */
define(function() {
    /**
     * @type {Object} Native browser event.
     */
    var _browserEvent;

    /**
     * @type {Events/Mouse}
     */
    var _self;

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

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
         * DOM element, event has been attached.
         * @type {Object}
         */
        this.currentTarget = null;

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
         * Init.
         * @param {Object} event Browser event.
         * @param {Map|null} map Map, event has been raised in.
         */
        (function(event, map) {
            _browserEvent = event;
            
            _self.target = event.target;
            _self.currentTarget = event.currentTarget;
            _self.clientX = event.clientX;
            _self.clientY = event.clientY;
            _self.screenX = event.screenX;
            _self.screenY = event.screenY;
            _self.button = event.button; // @todo should be normalized for IE, @see http://www.w3schools.com/jsref/event_button.asp
            
            _self.map = map;
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
         * @todo doc and test
         * Returns a geographic coordinates by mouse cursor position.
         * @return {Object}
         */
        this.getGeoPoint = function() {
            return _self.map.unprojectFromViewPort(_self.getPixel());
        },

        // @todo doc and test
        this.getPixel = function() {
            return {
                x: _self.clientX - _self.map.container.offsetLeft + window.pageXOffset,
                y: _self.clientY - _self.map.container.offsetTop + window.pageYOffset
            };
        };
    };

    return constructor;
});