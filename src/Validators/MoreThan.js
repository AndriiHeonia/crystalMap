/**
 * Number comparison validator module.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define({
    /**
     * Checks or number is more than some another number.
     * @param {Number} value Value should be validated. Required.
     * @param {Number} moreThan Value for the comparison. Required.
     * @param {String} callerObject Caller object name. Required.
     * @param {String} callerMethod Caller method name. Required.
     */
    validate: function(value, moreThan, callerObject, callerMethod) {
        if(value <= moreThan) {
            throw new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be more than ' + moreThan + '.');
        }
    }
});