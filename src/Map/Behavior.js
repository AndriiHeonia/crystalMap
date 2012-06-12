/**
 * Map behavior.
 */
define(function() {
    /**
     * @type {Map/Behavior}
     */
    var _self;

    /**
     * @type {Map}
     */
    var _map;

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

         /**
          * Init.
          * @param {Map/Behavior} map Map instance.
          */
        (function(map) {
            console.log('init behavior');
            _map = map;
        })(arguments[0]);
    };

    return constructor;
});