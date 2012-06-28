/**
 * Undefined validator module.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define({
    /**
     * Checks or value is not undefined.
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerObject Caller object name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerObject, callerMethod) {
        if(typeof(value) === 'undefined') {
            throw new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerObject + ' should not be Undefined.');
        }
    }
});