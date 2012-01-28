/**
 * Represents a screen point.
 * @constructor
 * @param {Number} x X coordinate.
 * @param {Number} y Y coordinate.
 */
Crystal.Pixel = function(x, y)
{
    /**
     * @type {Number}
     */
    var _x;
    
    /**
     * @type {Number}
     */
    var _y;
    
    /**
     * Returns X coordinate of the point.
     */
    this.getX = function()
    {
        return _x;
    },
    
    /**
     * Returns Y coordinate of the point.
     */
    this.getY = function()
    {
        return _y;
    }
    
    /**
     * Initialization.
     * @todo validate params.
     */
    _x = x;
    _y = y;
}

Crystal.Pixel.prototype.CLASS_NAME = 'Crystal.Pixel';