/**
 * DOM utils module.
 * Provides a DOM processing functionality.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(['require', 'Utils/DomEventFactory'], function(require, Utils_DomEventFactory) {
    var object = {
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
            
            parentMap = require('MapRegister').getItemByDomElement(element);
            
            // handles browser event, creates one of Events.* event and calls an user handler.
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
        },

        /**
         * @todo test it
         * Returns offset of the element on page.
         * @see http://javascript.ru/ui/offset
         * @param {Object} element DOM element.
         * @return {Objject} Structure:
         * - {Number} top Top offset.
         * - {Number} left Left offset.
         */
        getOffset: function(element) {
            var box, body, docElem, scrollTop, scrollLeft, clientTop, clientLeft, top, left;

            if (element.getBoundingClientRect) {
                box = element.getBoundingClientRect();
                body = document.body;
                docElem = document.documentElement;
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
                clientTop = docElem.clientTop || body.clientTop || 0;
                clientLeft = docElem.clientLeft || body.clientLeft || 0;
                top  = box.top +  scrollTop - clientTop;
                left = box.left + scrollLeft - clientLeft;

                return { top: Math.round(top), left: Math.round(left) };
            } else {
                top=0, left=0;
                while(element) {
                    top = top + parseInt(element.offsetTop, 10);
                    left = left + parseInt(element.offsetLeft, 10);
                    element = element.offsetParent;
                }

                return {top: top, left: left};
            }
        },

        // @todo doc and test
        hasClass: function(element, className) {
            return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },
 
        // @todo doc and test
        addClass: function(element, className) {
            if (this.hasClass(element, className) === false) {
                element.className += " " + className;
            }
        },
 
        // @todo doc and test
        removeClass: function(element, className) {
            var reg;

            if (this.hasClass(element, className)) {
                reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                element.className = element.className.replace(reg, '');
            }
        }
    };

    return object;
});