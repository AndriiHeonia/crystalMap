/**
 * DOM event factory module.
 * Creates a custom event objects.
 */
define(['Events/Mouse'], function(Events_Mouse) {
    return {
        /**
         * Creates one of the Crystal.Events.* object.
         * @param {Object} event Browser event.
         * @param {Crystal.Map|null} map Map, event has been raised in.
         * @return {Object}
         */
        create: function(event, map) {
            var customEvent;
            switch(event.type) {
                case 'mousemove':
                    customEvent = new Events_Mouse(event, map);
                    break;
                case 'click': // @todo test it
                    customEvent = new Events_Mouse(event, map);
                    break;
            }
            return customEvent;
        }
    }
});