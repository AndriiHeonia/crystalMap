/**
 * Contains links to all maps on the page.
 * @static
 */
Crystal.MapRegister = {
    /**
     * Registered maps.
     * @type {Array}
     */
    _items: {},
    
    /**
     * Adds map to register.
     * @param {Crystal.Map} map Map object.
     */
    add: function(map)
    {
        Crystal.MapRegister._items[map.getContainer().id] = map;
    },
    
    /**
     * Returns map by map container ID.
     * @param {String} containerId Map container ID.
     * @return {Crystal.Map|null}
     */
    get: function(containerId)
    {
        var result;
        
        if(typeof(Crystal.MapRegister._items[containerId]) !== 'undefined')
        {
            result = Crystal.MapRegister._items[containerId]; 
        }
        else
        {
            result = null;
        }
        
        return result;
    },

    /**
     * Removes map from register.
     * @param {String} containerId Map container ID.
     */
    remove: function(containerId)
    {
        if(typeof(Crystal.MapRegister._items[containerId]) !== 'undefined')
        {
            delete Crystal.MapRegister._items[containerId];            
        }
    },
    
    /**
     * Returns all registered maps.
     * @return {Object} Object where keys are map container IDs and values are Crystal.Map objects.
     */
    getItems: function()
    {
        return Crystal.MapRegister._items;
    },
    
    /**
     * Returns map, element belongs to.
     * @static
     * @param {Object} element Any DOM element in any map on the page. Required.
     * @return {Crystal.Map|null} Map object, element belongs to, or null.
     */
    getItemByDomElement: function(element)
    {
        var map;
        
        for(var containerId in Crystal.MapRegister._items)
        {
            map = Crystal.MapRegister._items[containerId];
            
            if(element === map.getContainer())
            {
                return map;
            }
            
            if(Crystal.Utils.Dom.isDescendant(map.getContainer(), element) === true)
            {
                return map;
            }
        }
        
        return null;
    }    
}