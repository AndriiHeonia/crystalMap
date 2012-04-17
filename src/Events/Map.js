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
        Crystal.Validators.Instance.validate(map, Crystal.Map, this.constructor.CLASS_NAME, 'initialize');

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

/**
 * @const
 * @type {String}
 */
Crystal.Events.Map.CLASS_NAME = 'Crystal.Events.Map';