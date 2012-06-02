/**
 * DOM utils module.
 * Provides a DOM processing functionality.
 */
define([
        'MapRegister',
        'Utils/DomEventFactory'
    ],
    function(
        MapRegister,
        Utils_DomEventFactory
    ) {
    return {
        /**
         * Provides a DOM processing functionality.
         * @param {String} tagName Tag, should be created. Required.
         * @param {String} id Id of the created tag. Optional.
         * @param {String} className Class of the created tag. Optional.
         * @param {Object} container Container DOM element, created tag should be appended. Optional.
         * @return {Object} Created DOM element.
         */
        create: function(tagName, id, className, container) {
            var el = document.createElement(tagName);
            if (id) {
                el.id = id;
            }
            if(className) {
                el.className = className;
            }
            if (container) {
                container.appendChild(el);
            }

            return el;
        },

        /**
         * Checks or object is a DOM node.
         * @param {Object} object Checkable object. Required.
         * @return {Boolean}
         */
        isNode: function(object) {
            return object.nodeType ? true : false;
        },

        /**
         * Checks or object is a DOM element.
         * @param {Object} object Checkable object. Required.
         * @return {Boolean}
         */
        isElement: function(object) {
            return (object.nodeType && object.nodeType == 1) ? true : false;
        },

        /**
         * Sets opacity to the DOM element.
         * @param {Object} element DOM element. Required.
         * @param {Number} opacity. Opacity (0.0-1.0). Required.
         */
        setOpacity: function(element, opacity) {
            element.style.opacity = opacity;
            element.style.MozOpacity = opacity;
            element.style.KhtmlOpacity = opacity;
            element.style.filter = 'alpha(opacity=' + (opacity * 100) + ');';
        },

        /**
         * Displays a DOM element with the fade animation.
         * @param {Object} element DOM element. Required.
         * @param {Number} duration. Fade duration in milliseconds. Required.
         */
        fadeIn: function(element, duration) {
            for (var i = 0; i <= 1; i += 0.05) {
                setTimeout(this.setOpacity, i * duration, element, i);
            }
        },

        /**
         * Hides a DOM element with the fade animation.
         * @param {Object} element DOM element. Required.
         * @param {Number} duration. Fade duration in milliseconds. Required.
         */
        fadeOut: function(element, duration) {
            for (var i = 0; i <= 1; i += 0.05) {
                setTimeout(this.setOpacity, i * duration, element, (1 - i));
            }
        },

        /**
         * Appends an event handler to the DOM element.
         * @param {Object} element DOM element event should be appended. Required.
         * @param {String} eventName The name of the event to listen for. Required.
         * @param {Function} handler The method the event invokes. Required.
         */
        addListener: function(element, eventName, handler) {
            var parentMap;
            
            parentMap = MapRegister.getItemByDomElement(element);
            
            // handles browser event, creates one of Crystal.Events.* event and calls an user handler.
            var metaHandler = function(event) {
                handler.call(this, Utils_DomEventFactory.create(event, parentMap));
            };

            if(element.addEventListener) {
                element.addEventListener(eventName, metaHandler, false);
            }
            else if(element.attachEvent) {
                element.attachEvent('on' + eventName, metaHandler);
            }
        },

        /**
         * Removes an event handler.
         * @param {Object} element DOM element event should be removed. Required.
         * @param {String} eventName The name of event the handler was associated with. Required.
         * @param {Function} handler The handler to remove. Must be a reference to the function passed into the addListener call. Required.
         */
        removeListener: function(element, eventName, handler) {
            if(element.removeEventListener) {
                element.removeEventListener(eventName, handler, false);
            }
            else if(element.detachEvent) {
                element.detachEvent('on' + eventName, handler);
            }
        },
        
        /**
         * Checks or child DOM element is descendant of the parent DOM element.
         * @param {Object} parent Parent DOM element. Required.
         * @param {Object} child Child DOM element. Required.
         * @return {Boolean}
         */
        isDescendant: function(parent, child) {
            var node = child.parentNode;
            while(node !== null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
    }
});