/**
 * DOM element validator module.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(['Utils/Dom'], function(Utils_Dom) {
    var object = {
        /**
         * Checks or value is a DOM element.
         * @param {Object} value Value should be validated. Required.
         * @param {String} callerObject Caller object name. Required.
         * @param {String} callerMethod Caller method name. Required.
         */
        validate: function(value, callerObject, callerMethod)
        {
            if(Utils_Dom.isElement(value) === false)
            {
                throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be a DOM element.');
            }
        }
    };

    return object;
});