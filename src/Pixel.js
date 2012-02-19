/**
 * Represents a screen point.
 * @constructor
 */
Crystal.Pixel = function()
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
     * Initialization.
     * @param {Number} x X coordinate. Required.
     * @param {Number} y Y coordinate. Required.
     */
    this.initialize = function(x, y)
    {
        _validateConstructorParams(x, y);    
        _x = x;
        _y = y;
    }

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
     * Validate constructor params.
     * @param {Number} x X coordinate. Required.
     * @param {Number} y Y coordinate. Required.
     */
    function _validateConstructorParams(x, y)
    {
        if(Object.prototype.toString.call(x) != '[object Number]')
        {
            throw new TypeError('Pixel constructor called with invalid x.')
        }
        if(Object.prototype.toString.call(y) != '[object Number]')
        {
            throw new TypeError('Pixel constructor called with invalid y.')
        }        
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);
}