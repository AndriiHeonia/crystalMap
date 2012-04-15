/**
 * Creates a custom event objects.
 * @static
 */
Crystal.Utils.DomEventFactory = {
    /**
     * Creates one of the Crystal.Events.* object.
     * @static
     * @param {Object} event Browser event.
     * @return {Object}
     */
    create: function(event)
    {
        var customEvent;
        switch(event.type)
        {
            case 'mousemove':
                customEvent = new Crystal.Events.Mouse(event);
                break;
        }
        return customEvent;
    }    
}