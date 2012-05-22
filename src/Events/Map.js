/**
 * Incapsulates information about the map that has been raised an event.
 * @constructor
 */
Crystal.Events.Map = function()
{
    /**
     * Map instance that has been raised an event.
     * @type {Crystal.Map}
     */
    this.map = null;

    /**
     * Initialization.
     * @param {Crystal.Map} map Map instance.
     */
    this.initialize = function(map)
    {
        Crystal.Validators.Instance.validate(map, Crystal.Map, this.constructor.CLASS_NAME, 'initialize');

        this.map = map;
    };

    // apply constructor
    this.initialize.apply(this, arguments);
};

/**
 * @const
 * @type {String}
 */
Crystal.Events.Map.CLASS_NAME = 'Crystal.Events.Map';