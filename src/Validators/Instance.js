/**
 * Instance validator module.
 */
define({
    /**
     * Checks or value is an instance of functionConstructor.
     * @param {Object} instance Object should be validated. Required.
     * @param {Object} functionConstructor Constructor, instance belongs to. Required.
     * @param {String} callerObject Caller object name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(instance, functionConstructor, callerObject, callerMethod) {
        if((instance instanceof functionConstructor) === false) {
            throw new TypeError('Object passed to the ' + callerMethod + ' method of the ' + callerObject + ' should be an instance of ' + functionConstructor.CLASS_NAME + '.');
        }
    }
});