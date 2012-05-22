/**
 * Provides an undefined validator.
 * @static
 */
Crystal.Validators.NotUndefined = {
    /**
     * Checks or value is not undefined.
     * @static
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod)
    {
        if(typeof(value) === 'undefined')
        {
            throw new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerClass + ' class should not be Undefined.');
        }
    }
};