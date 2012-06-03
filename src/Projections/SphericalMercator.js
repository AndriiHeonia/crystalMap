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
define(["Utils/Math"], function(Utils_Math) {
    /**
     * Ellipsoid radius (in meters).
     * @const
     * @type {Number}
     */
    var _ellipsoidAxis = 6378137;

    /**
     * Minimum latitude.
     * @const
     * @type {Number}
     */
    var _minLat = -85.05112878;

    /**
     * Maximum latitude.
     * @const
     * @type {Number}
     */
    var _maxLat = 85.05112878;

    /**
     * Minimum longitude.
     * @const
     * @type {Number}
     */
    var _minLon = -180;

    /**
     * Maximum longitude.
     * @const
     * @type {Number}
     */
    var _maxLon = 180;

    var object = {
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

            clippedLat = Utils_Math.clip(lat, _minLat, _maxLat);
            latInRadians = Utils_Math.degreesToRadians(clippedLat);

            // ground resolution = cos(latitude * pi/180) * earth circumference / map width
            return 1 * (Math.cos(latInRadians) * (2 * Math.PI * _ellipsoidAxis) / size).toFixed(10);
        },

        getViewPortStartInGlobalCoords: function(viewPortSize, mapCenter, mapSize) {
            var mapCenterInGlobalPixel;
                
            mapCenterInGlobalPixel = this.projectToGlobalCoords(mapCenter, mapSize);
            
            return {
                x: mapCenterInGlobalPixel.x - (viewPortSize.width / 2),
                y: mapCenterInGlobalPixel.y - (viewPortSize.height / 2)
            };
        },

        /**
         * Returns point in view port Cartesian coordinate system by geographic point.
         * @param {Object} geoPoint Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @return {Object} Structure:
         * - {Number} x X coordinate (in meters).
         * - {Number} y Y coordinate (in meters).
         */
        projectToViewPort: function(geoPoint, mapCenter, mapSize, viewPortSize) {
            var geoPointInGlobalPixel;
            var viewPortStartInGlobalPixel;

            geoPointInGlobalPixel = this.projectToGlobalCoords(geoPoint, mapSize);
            viewPortStartInGlobalPixel = this.getViewPortStartInGlobalCoords(viewPortSize, mapCenter, mapSize);

            return {
                x: geoPointInGlobalPixel.x - viewPortStartInGlobalPixel.x,
                y: geoPointInGlobalPixel.y - viewPortStartInGlobalPixel.y
            };
        },

        unprojectFromViewPort: function() {

        },

        projectToGlobalCoords: function(geoPoint, mapSize) {
            var lat = Utils_Math.clip(geoPoint.lat, _minLat, _maxLat);
            var lon = Utils_Math.clip(geoPoint.lon, _minLon, _maxLon);
            
            var x = (lon + 180) / 360;
            var sinLat = Math.sin(lat * Math.PI / 180);
            var y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
                
            return {
                x: Utils_Math.clip(x * mapSize + 0.5, 0, mapSize - 1),
                y: Utils_Math.clip(y * mapSize + 0.5, 0, mapSize - 1)
            };
        },

        unprojectFromGlobalCoors: function() {

        }
    };

    return object;
});