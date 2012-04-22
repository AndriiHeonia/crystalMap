/**
 * Incapsulates information about mouse.
 * @constructor
 */
Crystal.Events.Mouse = function()
{    
    /**
     * Map, event has been raised in.
     * @type {Crystal.Map|null}
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
     * @type {Object}
     */
    var _browserEvent;

    /**
     * Initialization.
     * @param {Object} event Browser event.
     * @param {Crystal.Map|null} map Map, event has been raised in. 
     */
    this.initialize = function(event, map)
    {
        _browserEvent = event;
        
        this.target = event.target;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
        this.screenX = event.screenX;
        this.screenY = event.screenY;
        this.button = event.button; // @todo should be normalized for IE, @see http://www.w3schools.com/jsref/event_button.asp
        
        this.map = map;
    }

    /**
     * Returns a geographic position of the mouse cursor.
     * @return {Object}
     */
    this.getGeoPoint = function()
    {
        var pixel;
        
        pixel = {
            x: this.clientX,
            y: this.clientY
        }
        
        return Crystal.Utils.Converters.Mercator.pixelToGeoPoint(pixel);
    }
    
    /**
     * Stops propagation
     */
    this.stopPropagation = function()
    {
        _browserEvent.stopPropagation();
    }

    /**
     * Prevents default action
     */
    this.preventDefault = function()
    {
        _browserEvent.preventDefault();
    }

    // apply constructor
    this.initialize.apply(this, arguments);
}

/**
 * @const
 * @type {String}
 */
Crystal.Events.Mouse.CLASS_NAME = 'Crystal.Events.Mouse';