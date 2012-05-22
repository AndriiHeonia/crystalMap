/**
 * Provides a boolean validator.
 * @static
 */
Crystal.Validators.Boolean = {
    /**
     * Checks or value is a boolean.
     * @static
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod)
    {
        if(Crystal.Utils.Type.isBoolean(value) === false)
        {
            throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a Boolean.');
        }
    }
};