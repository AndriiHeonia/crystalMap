/**
 * Incapsulates information about the map that has been raised an event.
 * @constructor
 */
Crystal.Events.Mouse = function()
{
    /**
     * @type {Object}
     */
    var _browserEvent;

    /**
     * Initialization.
     * @param {Object} event Browser event.
     */
    this.initialize = function(event)
    {
        _browserEvent = event;
    }

    this.getTarget = function()
    {
        return _browserEvent.target;
    }

    /**
     * Returns a geographic position of the mouse cursor.
     * @return {Crystal.GeoPoint}
     */
    this.getGeoPoint = function()
    {
    }
    
    this.stopPropagation = function()
    {
        _browserEvent.stopPropagation();
    }

    // apply constructor
    this.initialize.apply(this, arguments);
}