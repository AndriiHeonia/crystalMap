/**
 * Map register module.
 * Contains links to all maps on the page.
 */
define(['Utils/Dom'], function(Utils_Dom) {
    /**
     * Registered maps.
     * @type {Array}
     */
    var _items = {};

    return {
        /**
         * Adds map to register.
         * @param {Crystal.Map} map Map object.
         */
        add: function(map) {
            _items[map.container.id] = map;
        },
        
        /**
         * Returns map by map container ID.
         * @param {String} containerId Map container ID.
         * @return {Crystal.Map|null}
         */
        get: function(containerId) {
            var result;
            
            if(typeof(_items[containerId]) !== 'undefined') {
                result = _items[containerId];
            }
            else {
                result = null;
            }
            
            return result;
        },

        /**
         * Removes map from register.
         * @param {String} containerId Map container ID.
         */
        remove: function(containerId) {
            if(typeof(_items[containerId]) !== 'undefined') {
                delete _items[containerId];
            }
        },
        
        /**
         * Returns all registered maps.
         * @return {Object} Object where keys are map container IDs and values are Crystal.Map objects.
         */
        getItems: function() {
            return _items;
        },
        
        /**
         * Returns map, element belongs to.
         * @static
         * @param {Object} element Any DOM element in any map on the page. Required.
         * @return {Crystal.Map|null} Map object, element belongs to, or null.
         */
        getItemByDomElement: function(element) {
            var map;
            
            for(var containerId in _items) {
                map = _items[containerId];
                
                if(element === map.container) {
                    return map;
                }
                
                if(Utils_Dom.isDescendant(map.container, element) === true) {
                    return map;
                }
            }
            
            return null;
        }
    }
});