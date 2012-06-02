/**
 * Null validator module.
 */
define({
    /**
     * Checks or value is not null.
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod) {
        if(value === null) {
            throw new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerClass + ' class should not be Null.');
        }
    }
});