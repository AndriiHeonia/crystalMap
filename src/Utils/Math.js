/**
 * Provides a mathematical calculations.
 * @static
 */
Crystal.Utils.Math = {
    /**
     * Converts degrees to radians.
     * @param {Number} degrees Degrees.
     * @return {Number}
     */
    degreesToRadians: function(degrees)
    {
        return 1 * (degrees * (Math.PI / 180)).toFixed(10);
    },
    
    /**
     * Converts radians to degrees.
     * @param {Number} radians Radians.
     * @return {Number}
     */
    radiansToDegrees: function(radians)
    {
        return 1 * (radians * (180 / Math.PI)).toFixed(10);
    }
}