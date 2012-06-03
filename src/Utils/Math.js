/**
 * Math utils module.
 * Provides a mathematical calculations.
 */
 define({
    /**
     * Converts degrees to radians.
     * @param {Number} degrees Degrees.
     * @return {Number}
     */
    degreesToRadians: function(degrees) {
        return 1 * (degrees * (Math.PI / 180)).toFixed(10);
    },
    
    /**
     * Converts radians to degrees.
     * @param {Number} radians Radians.
     * @return {Number}
     */
    radiansToDegrees: function(radians) {
        return 1 * (radians * (180 / Math.PI)).toFixed(10);
    },
    
    // @todo test it
    div: function(val, by) {
        return (val - val % by) / by;
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