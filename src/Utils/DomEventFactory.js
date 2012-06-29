/**
 * DOM event factory module.
 * Creates a custom event objects.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(['Events/Mouse'], function(Events_Mouse) {
    var object = {
        /**
         * Creates one of the custom event object.
         * @param {Object} event Browser event.
         * @param {Map|null} map Map, event has been raised in.
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
                case 'mousedown': // @todo test it
                    customEvent = new Events_Mouse(event, map);
                    break;
                case 'mouseup': // @todo test it
                    customEvent = new Events_Mouse(event, map);
                    break;
            }
            return customEvent;
        }
    };

    return object;
});