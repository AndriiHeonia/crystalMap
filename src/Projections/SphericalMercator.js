/**
 * Provides a functionality to project geographic coordinates to Spherical Mercator coordinates and reverse.
 * @see http://wiki.openstreetmap.org/wiki/Mercator#Spherical_Mercator
 * @static
 */
Crystal.Projections.SphericalMercator = {    
    /**
     * Returns Spherical Mercator point by geographic point.
     * @param {Object} geoPoint Geographic point. Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     * @return {Object} Structure:
     * - {Number} x X coordinate in Spherical Mercator projection.
     * - {Number} y Y coordinate in Spherical Mercator projection.
     */    
    project: function(geoPoint) 
    {
        return {
            x: Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Crystal.Math.degreesToRadians(geoPoint.lon),
            y: Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Math.log(Math.tan(Math.PI / 4 + Crystal.Math.degreesToRadians(geoPoint.lat) / 2))
        }        
    },

    /**
     * Returns geographic point by Spherical Mercator point.
     * @param {Object} point Spherical Mercator point. Structure:
     * - {Number} x X coordinate in Spherical Mercator projection.
     * - {Number} y Y coordinate in Spherical Mercator projection.
     * @return {Object} Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     */
	unproject: function(point) 
    {
        return {
            lat: Crystal.Math.radiansToDegrees(2 * Math.atan(Math.exp(point.y / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)) - Math.PI / 2),
            lon: Crystal.Math.radiansToDegrees(point.x / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)
        }
	},

    ELLIPSOID_AXIS: 6378137.0
}