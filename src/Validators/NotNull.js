/**
 * Null validator module.
 */
define({
    /**
     * Checks or value is not null.
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerObject Caller object name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerObject, callerMethod) {
        if(value === null) {
            throw new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerObject + ' should not be Null.');
        }
    }
});