/**
 * Represents a geographic point.
 * @constructor
 */
Crystal.GeoPoint = function()
{
    /**
     * @type {Number}
     */
    var _lat;

    /**
     * @type {Number}
     */
    var _lon;

    /**
     * Initialization.
     * @param {Number} lat Geographic latitude. Required.
     * @param {Number} lon Geographic longitude. Required.
     */
    this.initialize = function(lat, lon)
    {
        _validateConstructorParams(lat, lon);    
        _lat = lat;
        _lon = lon;        
    }

    /**
     * Returns geographic latitude.
     * @return {Number}
     */
    this.getLat = function()
    {
        return _lat;
    },

    /**
     * Returns geographic longitude.
     * @return {Number}
     */
    this.getLon = function()
    {
        return _lon;
    }

    /**
     * Validate constructor params.
     * @param {Number} lat Geographic latitude. Required.
     * @param {Number} lon Geographic longitude. Required.
     */
    function _validateConstructorParams(lat, lon)
    {
        if(Object.prototype.toString.call(lat) != '[object Number]' || lat < -90 || lat > 90)
        {
            throw new Error('GeoPoint constructor called with invalid latitude.')
        }
        if(Object.prototype.toString.call(lon) != '[object Number]' || lon < -180 || lon > 180)
        {
            throw new Error('GeoPoint constructor called with invalid longitude.')
        }
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);    
}