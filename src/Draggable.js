/**
 * Draggable behavior.
 * @todo test it.
 */
define(['Utils/Dom', 'Utils/Common'], function(Utils_Dom, Utils_Common) {
    var object = {
        /**
         * {Object}
         */
        dragObject: null,

        /**
         * Attaches dragging for the DOM element.
         * {Map} map Map, dragging belongs to.
         * {Object} container DOM element, dragging should be attached.
         */
        enableDragging: function(map, container) {
            Utils_Dom.addListener(container, 'mousedown', Utils_Common.bind(this, this.handleMouseDown));
            Utils_Dom.addListener(map.container, 'mousemove', Utils_Common.bind(this, this.handleMouseMove));
            Utils_Dom.addListener(map.container, 'mouseup', Utils_Common.bind(this, this.handleMouseUp));
        },

        handleMouseDown: function(event) {
            this.dragObject = event.target;
            this.onDragStart(event);
            event.preventDefault();
        },

        handleMouseMove: function(event) {
            var pixel;
            if(this.dragObject !== null) {
                this.onDrag(event);
            }
            event.preventDefault();
        },

        handleMouseUp: function(event) {
            if(this.dragObject !== null) {
                this.dragObject = null;
                this.onDragStop(event);
            }
            event.preventDefault();
        },

        onDragStart: function() {},

        onDrag: function() {},

        onDragStop: function() {}
    };

    return object;
});