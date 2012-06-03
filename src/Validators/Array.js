/**
 * Array validator module.
 */
define(['Utils/Type'], function(Utils_Type) {
    var object = {
        /**
         * Checks or value is an array.
         * @param {Object} value Value should be validated. Required.
         * @param {String} callerClass Caller class name. Required.
         * @param {String} callerMethod Caller method name. Required.
         */
        validate: function(value, callerClass, callerMethod) {
            if(Utils_Type.isArray(value) === false) {
                throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be an Array.');
            }
        }
    };

    return object;
});