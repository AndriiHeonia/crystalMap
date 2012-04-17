/**
 * Provides an instance validator.
 * @static
 */
Crystal.Validators.Instance = {
    /**
     * Checks or value is an instance of functionConstructor.
     * @static
     * @param {Object} instance Object should be validated. Required.
     * @param {Object} functionConstructor Constructor, instance belongs to. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(instance, functionConstructor, callerClass, callerMethod)
    {
        if((instance instanceof functionConstructor) === false)
        {
            throw new TypeError('Object passed to the ' + callerMethod + ' method of the ' + callerClass + ' class should be an instance of ' + functionConstructor.CLASS_NAME + '.');
        }        
    }
}