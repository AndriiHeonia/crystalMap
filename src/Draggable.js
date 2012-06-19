/**
 * Incapsulates draggable behavior.
 */
define(['Utils/Dom', 'Utils/Common', 'Events/Drag'], function(Utils_Dom, Utils_Common, Events_Drag) {
    var object = {
        /**
         * @type {Object} DOM element should be dragged.
         */
        dragObject: null,

        /**
         * @type {Map} Map related with draggable object.
         * Object position will be calculated related to this map.
         */
        map: null,

        /**
         * Attaches dragging functionality for the DOM element.
         * @param {Map} map Map, draggable object belongs to.
         * @param {Object} container DOM element, dragging should be attached.
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
         * @param {Events/Mouse} event Mouse event.
         */
        handleMouseDown: function(event) {
            var mapRelatedMousePixel;

            this.dragObject = event.currentTarget;
            event.stopPropagation();

            // we can't use event.getPixel(), because target may be outside the map
            mapRelatedMousePixel = {
                x: event.clientX - this.map.container.offsetLeft + window.pageXOffset,
                y: event.clientY - this.map.container.offsetTop + window.pageYOffset
            };
            Events_Drag.map = this.map;
            Events_Drag.startPixel = mapRelatedMousePixel;
            Events_Drag.currentPixel = mapRelatedMousePixel;
            Events_Drag.offsetPixel = {
                x: event.currentTargetOffsetX,
                y: event.currentTargetOffsetY
            };
            this.onDragStart(Events_Drag);

            event.preventDefault();
        },

        /**
         * Mouse move event handler.
         * Calls onDrag template method when user dragging.
         * @param {Events/Mouse} event Mouse event.
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
         * @param {Events/Mouse} event Mouse event.
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

        /**
         * Template method called on drag start, may be overriden by childs.
         * @param {Events/Drag} Drag event.
         */
        onDragStart: function(event) {},

        /**
         * Template method called on dragging, may be overriden by childs.
         * @param {Events/Drag} Drag event.
         */
        onDrag: function(event) {},

        /**
         * Template method called on drag stop, may be overriden by childs.
         * @param {Events/Drag} Drag event.
         */
        onDragStop: function(event) {}
    };

    return object;
});