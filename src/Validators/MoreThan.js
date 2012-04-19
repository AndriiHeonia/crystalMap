/**
 * Provides a number comparison validator.
 * @static
 */
Crystal.Validators.MoreThan = {
    /**
     * Checks or number is more than some another number.
     * @static
     * @param {Number} value Value should be validated. Required.
     * @param {Number} moreThan Value for the comparison. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, moreThan, callerClass, callerMethod)
    {
        if(value <= moreThan)
        {
            throw new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be more than ' + moreThan + '.');
        }
    }
}