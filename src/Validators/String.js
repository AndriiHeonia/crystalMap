/**
 * Provides a string validator.
 * @static
 */
Crystal.Validators.String = {
    /**
     * Checks or value is a string.
     * @static
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod)
    {
        if(Crystal.Utils.Type.isString(value) === false)
        {
            throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a String.');
        }
    }
};