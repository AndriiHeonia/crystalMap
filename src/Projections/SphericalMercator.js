/**
 * Spherical Mercator module.
 * Provides a functionality to project geographic coordinates to
 * coordinates in Cartesian coordinate system via Spherical Mercator
 * projection (WGS-84) and inverse transformations.
 *
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 * @see http://wiki.openstreetmap.org/wiki/Mercator#Spherical_Mercator
 * @see http://kartoweb.itc.nl/geometrics/Map%20projections/mappro.html
 */
define([
        "Utils/Math",
        "Utils/Common"
    ], function(
        Utils_Math,
        Utils_Common
    ) {
    return {
        /**
         * Ellipsoid radius (in meters).
         * @const
         * @type {Number}
         */
        ELLIPSOID_AXIS: 6378137,

        /**
         * Minimum latitude.
         * @const
         * @type {Number}
         */
        MIN_LAT: -85.05112878,

        /**
         * Maximum latitude.
         * @const
         * @type {Number}
         */
        MAX_LAT: 85.05112878,

        /**
         * Minimum longitude.
         * @const
         * @type {Number}
         */
        MIN_LON: -180,

        /**
         * Maximum longitude.
         * @const
         * @type {Number}
         */
        MAX_LON: 180,

        /**
         * Returns point in global Cartesian coordinate system by geographic point.
         * @param {Object} geoPoint Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @return {Object} Structure:
         * - {Number} x X coordinate (in meters).
         * - {Number} y Y coordinate (in meters).
         */
        project: function(geoPoint) {
            return {
                x: 1 * (this.ELLIPSOID_AXIS * Utils_Math.degreesToRadians(geoPoint.lon)).toFixed(10),
                y: 1 * (this.ELLIPSOID_AXIS * Math.log(Math.tan(Math.PI / 4 + Utils_Math.degreesToRadians(Utils_Common.clip(geoPoint.lat, this.MIN_LAT, this.MAX_LAT)) / 2))).toFixed(10)
            };
        },

        /**
         * Returns geographic point by point in global Cartesian coordinate system.
         * @param {Object} point Point in Cartesian coordinate system. Structure:
         * - {Number} x X coordinate (in meters).
         * - {Number} y Y coordinate (in meters).
         * @return {Object} Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         */
        unproject: function(point) {
            return {
                lat: 1 * (Utils_Math.radiansToDegrees(2 * Math.atan(Math.exp(point.y / this.ELLIPSOID_AXIS)) - Math.PI / 2)).toFixed(10),
                lon: 1 * (Utils_Math.radiansToDegrees(point.x / this.ELLIPSOID_AXIS)).toFixed(10)
            };
        },

        /**
         * Returns ground reolution.
         * The ground resolution indicates the distance on the ground that’s represented by a single pixel in the map.
         * For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters.
         * @param {Number} lat Latitude (in degrees) at which to measure the ground resolution.
         * @param {Number} size Layer size (in pixels).
         * @return {Number} The ground resolution, in meters per pixel.
         */
        getGroundResolution: function(lat, size) {
            var clippedLat;
            var latInRadians;

            clippedLat = Utils_Common.clip(lat, this.MIN_LAT, this.MAX_LAT);
            latInRadians = Utils_Math.degreesToRadians(clippedLat);

            // ground resolution = cos(latitude * pi/180) * earth circumference / map width
            return 1 * (Math.cos(latInRadians) * (2 * Math.PI * this.ELLIPSOID_AXIS) / size).toFixed(10);
        }
    }
});