/**
 * Provides a DOM element validator.
 * @static
 */
Crystal.Validators.DomElement = {
    /**
     * Checks or value is a DOM element.
     * @static
     * @param {Object} value Value should be validated. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, callerClass, callerMethod)
    {
        if(Crystal.Utils.Dom.isElement(value) === false)
        {
            throw new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a DOM element.');
        }
    }
};