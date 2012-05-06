/**
 * Creates a custom event objects.
 * @static
 */
Crystal.Utils.DomEventFactory = {
    /**
     * Creates one of the Crystal.Events.* object.
     * @static
     * @param {Object} event Browser event.
     * @param {Crystal.Map|null} map Map, event has been raised in.
     * @return {Object}
     */
    create: function(event, map)
    {
        var customEvent;
        switch(event.type)
        {
            case 'mousemove':
                customEvent = new Crystal.Events.Mouse(event, map);
                break;
            case 'click': // @todo test it
                customEvent = new Crystal.Events.Mouse(event, map);
                break;
        }
        return customEvent;
    }    
}