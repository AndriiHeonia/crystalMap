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
        _self.map = null;

        /**
         * DOM element, event has been raised in.
         * @type {Object}
         */
        _self.target = null;

        /**
         * DOM element, event has been attached.
         * @type {Object}
         */
        _self.currentTarget = null;

        /**
         * Left offset from the top left corner of current target.
         * @todo add test
         * @type {Number}
         */
        _self.currentTargetOffsetX = null;

        /**
         * Top offset from the top left corner of current target.
         * @todo add test
         * @type {Number}
         */
        _self.currentTargetOffsetY = null,

        /**
         * Button was clicked when an event was triggered.
         * 0 - left mouse-button; 1 - middle mouse-button; 2 - right mouse-button.
         * @type {Number}
         */
        _self.button = null;

        /**
         * X coordinate of the mouse pointer, relative to the current window, when an event was triggered.
         * @type {Number}
         */
        _self.clientX = null;

        /**
         * Y coordinate of the mouse pointer, relative to the current window, when an event was triggered.
         * @type {Number}
         */
        _self.clientY = null;

        /**
         * X coordinate of the mouse pointer, relative to the screen, when an event was triggered.
         * @type {Number}
         */
        _self.screenX = null;

        /**
         * Y coordinate of the mouse pointer, relative to the screen, when an event was triggered.
         * @type {Number}
         */
        _self.screenY = null;

        /**
         * Init.
         * @param {Object} event Browser event.
         * @param {Map|null} map Map, event has been raised in.
         */
        (function(event, map) {
            _browserEvent = event;
            
            _self.target = event.target;
            _self.currentTarget = event.currentTarget;
            // @todo fix it, check on marker
            _self.currentTargetOffsetX = event.clientX - event.currentTarget.offsetLeft;
            _self.currentTargetOffsetY = event.clientY - event.currentTarget.offsetTop;
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
        _self.stopPropagation = function() {
            _browserEvent.stopPropagation();
        };

        /**
         * Prevents default action
         */
        _self.preventDefault = function() {
            _browserEvent.preventDefault();
        };
            
        // experimental code:

        /**
         * @todo doc and test
         * Returns a geographic coordinates by mouse cursor position.
         * @return {Object}
         */
        _self.getGeoPoint = function() {
            return _self.map.unprojectFromViewPort(_self.getPixel());
        },

        // @todo doc and test
        _self.getPixel = function() {
            return {
                x: _self.clientX - _self.map.container.offsetLeft + window.pageXOffset,
                y: _self.clientY - _self.map.container.offsetTop + window.pageYOffset
            };
        };

        // @todo doc, test, normalize, extend from base
        _self.stopPropagation = function() {
            if (_browserEvent.stopPropagation) {
                _browserEvent.stopPropagation();
            }
        };
    };

    return constructor;
});