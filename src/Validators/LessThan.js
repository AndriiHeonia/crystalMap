/**
 * Number comparison validator module.
 */
define({
    /**
     * Checks or number is less than some another number.
     * @param {Number} value Value should be validated. Required.
     * @param {Number} lessThan Value for the comparison. Required.
     * @param {String} callerClass Caller class name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, lessThan, callerClass, callerMethod) {
        if(value >= lessThan) {
            throw new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be less than ' + lessThan + '.');
        }
    }
});