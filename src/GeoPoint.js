/**
 * Represents a geographic point.
 * @constructor
 * @param {Number} lat Geographic latitude.
 * @param {Number} lon Geographic longitude.
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
     * Initialization.
     * @todo validate params.
     */
    _lat = lat;
    _lon = lon;    
}

Crystal.GeoPoint.prototype.CLASS_NAME = 'Crystal.GeoPoint';