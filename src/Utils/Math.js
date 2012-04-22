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
        return degrees * (Math.PI / 180);
    },
    
    /**
     * Converts radians to degrees.
     * @param {Number} radians Radians.
     * @return {Number}
     */
    radiansToDegrees: function(radians)
    {
        return radians * (180 / Math.PI);
    }
}