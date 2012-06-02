/**
 * DOM element validator module.
 */
define(['Utils/Dom'], function(Utils_Dom) {
    return {
        /**
         * Checks or value is a DOM element.
         * @param {Object} value Value should be validated. Required.
         * @param {String} callerClass Caller class name. Required.
         * @param {String} callerMethod Caller method name. Required.
         */
        validate: function(value, callerClass, callerMethod)
        {
            if(Utils_Dom.isElement(value) === false)
            {
                throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a DOM element.');
            }
        }
    }
});