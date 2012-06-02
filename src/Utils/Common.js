/**
 * Common utils module.
 * Provides a common utilities
 */
define({
    /**
     * Creates an unique id.
     * @param {String} prefix Id prefix. Optional.
     * @return {String} Generated id.
     */
    createUniqueId: function(prefix) {
        var date = new Date();
        var time = date.getTime();

        return prefix ? prefix + '_' + time : '' + time;
    },
    
    /**
     * Binds scope with a function
     * @param {Object} scope
     * @param {Function} func
     */
    bind: function(scope, func) {
        return function() {
            return func.apply(scope, arguments);
        };
    },

    /**
     * Clips a number to the specified minimum and maximum values.
     * @param {Number} number The number to clip.
     * @param {Number} minValue Minimum allowable value.
     * @param {Number} maxValue Maximum allowable value.
     * @return {Number}
     */
    clip: function(number, minValue, maxValue) {
        return Math.min(Math.max(number, minValue), maxValue);
    }
});