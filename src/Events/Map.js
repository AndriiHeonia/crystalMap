/**
 * Incapsulates information about the map that has been raised an event.
 */
define(function() {
    return function() {
        /**
         * Map instance that has been raised an event.
         * @type {Map}
         */
        this.map = null;

        _self = this;

         /**
          * @param {Map} map Map instance.
          */
        (function(map){
            _self.map = map;
        })(arguments[0]);
    };
});