/**
 * Number comparison validator module.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define({
    /**
     * Checks or number is less than some another number.
     * @param {Number} value Value should be validated. Required.
     * @param {Number} lessThan Value for the comparison. Required.
     * @param {String} callerObject Caller object name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, lessThan, callerObject, callerMethod) {
        if(value >= lessThan) {
            throw new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be less than ' + lessThan + '.');
        }
    }
});