/**
 * Map behavior.
 */
define(['Utils/Dom', 'Utils/Common'], function(Utils_Dom, Utils_Common) {
    /**
     * @type {Map/Behavior}
     */
    var _self;

    /**
     * @type {Map}
     */
    var _map;

    function _handleDragging(event) {
        _map.setCenter(event.getGeoPoint());
        this.fireEvent('CenterChanging');
    }
            
    function _addDomListeners() {
        Utils_Dom.addListener(_map.container, 'click', Utils_Common.bind(_self, _handleDragging));
    }

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
            _map = map;
            _addDomListeners();
        })(arguments[0]);
    };

    return constructor;
});