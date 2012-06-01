/**
 * Map event module.
 * Incapsulates information about the map that has been raised an event.
 */
define([
        'Map',
        'Validators/Instance'
    ],
    function(
        Map,
        Validators_Instance
    ) {
        /**
         * @constructor
         */
        return function(){
            /**
             * Map instance that has been raised an event.
             * @type {Map}
             */
            this.map = null;

            /**
             * Initialization.
             * @param {Map} map Map instance.
             */
            (function(map){
                Validators_Instance.validate(map, Map, 'Events/Map');
                this.map = map;
            })();
        };
    }
);