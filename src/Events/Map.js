/**
 * Incapsulates information about the map that has been raised an event.
 * @constructor
 */
Crystal.Events.Map = function()
{
    /**
     * @type {Crystal.Map}
     */
    var _map;

    /**
     * Initialization.
     * @param {Crystal.Map} map Map instance.
     */
    this.initialize = function(map)
    {
        if((map instanceof Crystal.Map) === false)
        {
            throw new TypeError('Map event constructor called with invalid map object.');
        }
        _map = map;
    }

    /**
     * Returns map instance that has been raised an event.
     * @return {Crystal.Map}
     */
    this.getMap = function()
    {
        return _map;
    }

    // apply constructor
    this.initialize.apply(this, arguments);
}