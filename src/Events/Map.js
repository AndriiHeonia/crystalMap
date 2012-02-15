/**
 * Incapsulates information about the map that has been raised an event.
 * @param {Crystal.Map} map Map instance.
 * @constructor
 */
Crystal.Events.Map = function(map)
{
    /**
     * @type {Crystal.Map}
     */
    var _map;

    /**
     * Initialization.
     * @todo validate params.
     */
    _map = map;

    /**
     * Returns map instance that has been raised an event.
     */
    this.getMap = function()
    {
        return _map;
    }    
}

Crystal.Events.Map.prototype.CLASS_NAME = 'Crystal.Events.Map';