/**
 * Draggable behavior.
 * @todo test it.
 */
define(['Utils/Dom', 'Utils/Common', 'Events/Drag'], function(Utils_Dom, Utils_Common, Events_Drag) {
    var object = {
        /**
         * {Object}
         */
        dragObject: null,

        map: null,

        /**
         * Attaches dragging for the DOM element.
         * {Map} map Map, dragging belongs to.
         * {Object} container DOM element, dragging should be attached.
         */
        enableDragging: function(map, container) {
            this.map = map;
            Utils_Dom.addListener(container, 'mousedown', Utils_Common.bind(this, this.handleMouseDown));
            Utils_Dom.addListener(document, 'mousemove', Utils_Common.bind(this, this.handleMouseMove));
            Utils_Dom.addListener(document, 'mouseup', Utils_Common.bind(this, this.handleMouseUp));
        },

        /**
         * Mouse down event handler.
         * Stores target and calls onDragStart template method.
         * {Events/Mouse} event Mouse event.
         */
        handleMouseDown: function(event) {
            var mapRelatedMousePixel;

            // we can't use event.getPixel(), because target may be outside the map
            mapRelatedMousePixel = {
                x: event.clientX - this.map.container.offsetLeft + window.pageXOffset,
                y: event.clientY - this.map.container.offsetTop + window.pageYOffset
            };
            this.dragObject = event.target;
            Events_Drag.map = this.map;
            Events_Drag.startPixel = mapRelatedMousePixel;
            Events_Drag.currentPixel = mapRelatedMousePixel;
            this.onDragStart(Events_Drag);

            event.preventDefault();
        },

        /**
         * Mouse move event handler.
         * Calls onDrag template method when user dragging object.
         * {Events/Mouse} event Mouse event.
         */
        handleMouseMove: function(event) {
            var mapRelatedMousePixel;

            if(this.dragObject !== null) {
                mapRelatedMousePixel = {
                    x: event.clientX - this.map.container.offsetLeft + window.pageXOffset,
                    y: event.clientY - this.map.container.offsetTop + window.pageYOffset
                };
                Events_Drag.currentPixel = mapRelatedMousePixel;
                this.onDrag(Events_Drag);
            }

            event.preventDefault();
        },

        /**
         * Mouse up event handler.
         * Resets target and calls onDragStop template method.
         * {Events/Mouse} event Mouse event.
         */
        handleMouseUp: function(event) {
            var mapRelatedMousePixel;

            if(this.dragObject !== null) {
                mapRelatedMousePixel = {
                    x: event.clientX - this.map.container.offsetLeft + window.pageXOffset,
                    y: event.clientY - this.map.container.offsetTop + window.pageYOffset
                };
                Events_Drag.endPixel = mapRelatedMousePixel;
                this.dragObject = null;
                this.onDragStop(Events_Drag);
            }

            event.preventDefault();
        },

        onDragStart: function(event) {},

        onDrag: function(event) {},

        onDragStop: function(event) {}
    };

    return object;
});