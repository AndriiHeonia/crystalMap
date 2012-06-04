/**
 * Spherical Mercator module.
 * Provides a functionality to project geographic coordinates to
 * coordinates in Cartesian coordinate system via Spherical Mercator
 * projection (WGS-84) and inverse transformations.
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

        /**
         * Returns view port start in global Cartesian coordinate system.
         * @param {Object} viewPortSize View port size. Structure:
         * - {Number} width
         * - {Numbet} height
         * @param {Object} mapCenter Geographic point of the map center. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @param {Number} mapSize Map/base layer size in pixels.
         * @return {Object} Structure:
         * - {Number} x X coordinate (in pixels).
         * - {Number} y Y coordinate (in pixels).
         */
        getViewPortStartInGlobalCoords: function(viewPortSize, mapCenter, mapSize) {
            var mapCenterInGlobalCoords = this.projectToGlobalCoords(mapCenter, mapSize);
            
            return {
                x: 1 * (mapCenterInGlobalCoords.x - (viewPortSize.width / 2)).toFixed(10),
                y: 1 * (mapCenterInGlobalCoords.y - (viewPortSize.height / 2)).toFixed(10)
            };
        },

        /**
         * Returns point in global Cartesian coordinate system by geographic point.
         * @param {Object} geoPoint Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @param {Number} mapSize Map/base layer size in pixels.
         * @return {Object} Structure:
         * - {Number} x X coordinate (in pixels).
         * - {Number} y Y coordinate (in pixels).
         */
        projectToGlobalCoords: function(geoPoint, mapSize) {
            var lat = Utils_Math.clip(geoPoint.lat, _minLat, _maxLat);
            var lon = Utils_Math.clip(geoPoint.lon, _minLon, _maxLon);
            
            var x = (lon + 180) / 360;
            var sinLat = Math.sin(lat * Math.PI / 180);
            var y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
                
            return {
                x: 1 * (Utils_Math.clip(x * mapSize + 0.5, 0, mapSize - 1)).toFixed(10),
                y: 1 * (Utils_Math.clip(y * mapSize + 0.5, 0, mapSize - 1)).toFixed(10)
            };
        },

        /**
         * Returns geographic point by point in global Cartesian coordinate system.
         * @param {Object} pixel Point in global Cartesian coordinate system. Structure:
         * - {Number} x X coordinate (in pixels).
         * - {Number} y Y coordinate (in pixels).
         * @param {Number} mapSize Map/base layer size in pixels.
         * @return Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         */
        unprojectFromGlobalCoords: function(pixel, mapSize) {
            var x = (Utils_Math.clip(pixel.x, 0, mapSize - 1) / mapSize) - 0.5;
            var y = 0.5 - (Utils_Math.clip(pixel.y, 0, mapSize - 1) / mapSize);

            return {
                lat: 1 * (90 - 360 * Math.atan(Math.exp((-1 * y) * 2 * Math.PI)) / Math.PI).toFixed(10),
                lon: 1 * (360 * x).toFixed(10)
            };
        },

        /**
         * Returns point in view port Cartesian coordinate system by geographic point.
         * X and y coordinates will be rounded to the integer value.
         * @param {Object} geoPoint Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @param {Object} mapCenter Geographic point of the map center. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @param {Number} mapSize Map/base layer size in pixels.
         * @param {Object} viewPortSize View port size. Structure:
         * - {Number} width
         * - {Numbet} height
         * @return {Object} Structure:
         * - {Number} x X coordinate (in pixels).
         * - {Number} y Y coordinate (in pixels).
         */
        projectToViewPort: function(geoPoint, mapCenter, mapSize, viewPortSize) {
            var geoPointInGlobalCoords;
            var viewPortStartInGlobalCoords;

            geoPointInGlobalCoords = this.projectToGlobalCoords(geoPoint, mapSize);
            viewPortStartInGlobalCoords = this.getViewPortStartInGlobalCoords(viewPortSize, mapCenter, mapSize);

            return {
                x: parseInt(geoPointInGlobalCoords.x - viewPortStartInGlobalCoords.x, 10),
                y: parseInt(geoPointInGlobalCoords.y - viewPortStartInGlobalCoords.y, 10)
            };
        },

        /**
         * Return geographic point by point in view port Cartesian coordinate system.
         * @param {Object} pixel Point in view port Cartesian coordinate system. Structure:
         * - {Number} x X coordinate (in pixels).
         * - {Number} y Y coordinate (in pixels).
         * @param {Object} mapCenter Geographic point of the map center. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         * @param {Number} mapSize Map/base layer size in pixels.
         * @param {Object} viewPortSize View port size. Structure:
         * - {Number} width
         * - {Numbet} height
         * @return Geographic point. Structure:
         * - {Number} lat Latitude.
         * - {Number} lon Longitude.
         */
        unprojectFromViewPort: function(pixel, mapCenter, mapSize, viewPortSize) {
            var viewPortStartInGlobalCoords;
            var pixelInGlobalCoords;

            viewPortStartInGlobalCoords = this.getViewPortStartInGlobalCoords(viewPortSize, mapCenter, mapSize);
            pixelInGlobalCoords = {
                x: viewPortStartInGlobalCoords.x + pixel.x,
                y: viewPortStartInGlobalCoords.y + pixel.y
            };

            return this.unprojectFromGlobalCoords(pixelInGlobalCoords, mapSize);
        }
    };

    return object;
});