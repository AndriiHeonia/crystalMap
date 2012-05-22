/**
 * Provides a array validator.
 * @static
 */
Crystal.Validators.Array = {
    /**
     * Checks or value is an array.
     * @static
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod)
    {
        if(Crystal.Utils.Type.isArray(value) === false)
        {
            throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be an Array.');
        }
    }
};