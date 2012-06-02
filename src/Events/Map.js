/**
 * Incapsulates information about the map that has been raised an event.
 */
define(['Map', 'Validators/Instance'], function(Map, Validators_Instance) {
    return function() {
        /**
         * Map instance that has been raised an event.
         * @type {Map}
         */
        this.map = null;

         /**
          * @param {Map} map Map instance.
          */
        (function(map){
            Validators_Instance.validate(map, Map, 'Events/Map');
            this.map = map;
        })(arguments[0]);
    };
});