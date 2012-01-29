/**
 * Represents a geographic point.
 * @constructor
 * @param {Number} lat Geographic latitude. Required.
 * @param {Number} lon Geographic longitude. Required.
 */
Crystal.GeoPoint = function(lat, lon)
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
    var _validateConstructorParams = function(lat, lon)
    {
        if(Object.prototype.toString.call(lat) != '[object Number]' || lat < -90 || lat > 90)
        {
            throw new TypeError('GeoPoint constructor called with invalid latitude.')
        }
        if(Object.prototype.toString.call(lon) != '[object Number]' || lon < -180 || lon > 180)
        {
            throw new TypeError('GeoPoint constructor called with invalid longitude.')
        }        
    }

    /**
     * Initialization.
     */
    _validateConstructorParams(lat, lon);    
    _lat = lat;
    _lon = lon;    
}

Crystal.GeoPoint.prototype.CLASS_NAME = 'Crystal.GeoPoint';