/**
 * Incapsulates information about the map that has been raised an event.
 */
define(function() {
    /**
     * @constructor
     */
    var constructor = function() {
        var self = this;

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
            self.map = map;
        })(arguments[0]);
    };

    return constructor;
});