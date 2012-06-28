/**
 * Incapsulates information about the map that has been raised an event.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(function() {
    /**
     * @type {Events/Map}
     */
    var _self;

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

        /**
         * Map instance that has been raised an event.
         * @type {Map}
         */
        this.map = null;

         /**
          * Init.
          * @param {Map} map Map instance.
          */
        (function(map) {
            _self.map = map;
        })(arguments[0]);
    };

    return constructor;
});