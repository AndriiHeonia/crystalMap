/**
 * Provides a functionality to project geographic coordinates to 
 * coordinates in Cartesian coordinate system via Spherical Mercator 
 * projection (WGS-84) and inverse transformations.
 *
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 * @see http://wiki.openstreetmap.org/wiki/Mercator#Spherical_Mercator
 * @see http://kartoweb.itc.nl/geometrics/Map%20projections/mappro.html
 * @todo add clipping and tests
 */
Crystal.Projections.SphericalMercator = function(layer)
{
    /**
     * Layer instance projection belongs to.
     * @type {}
     */
    var _layer = null;

    /**
     * Initialization.
     * @todo
     * @param {} layer Layer instance projection belongs to.
     */
    this.initialize = function(layer)
    {
        _layer = layer;
    }

    /**
     * Returns point in global Cartesian coordinate system by geographic point.
     * @param {Object} geoPoint Geographic point. Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     * @return {Object} Structure:
     * - {Number} x X coordinate (in meters).
     * - {Number} y Y coordinate (in meters).
     */    
    this.project = function(geoPoint) 
    {
        return {
            x: 1 * (Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Crystal.Utils.Math.degreesToRadians(geoPoint.lon)).toFixed(10),
            y: 1 * (Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Math.log(Math.tan(Math.PI / 4 + Crystal.Utils.Math.degreesToRadians(geoPoint.lat) / 2))).toFixed(10)
        }
    }

    /**
     * Returns geographic point by point in global Cartesian coordinate system.
     * @param {Object} Point point in Cartesian coordinate system. Structure:
     * - {Number} x X coordinate (in meters).
     * - {Number} y Y coordinate (in meters).
     * @return {Object} Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     */
	this.unproject = function(point) 
    {
        return {
            lat: 1 * (Crystal.Utils.Math.radiansToDegrees(2 * Math.atan(Math.exp(point.y / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)) - Math.PI / 2)).toFixed(10),
            lon: 1 * (Crystal.Utils.Math.radiansToDegrees(point.x / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)).toFixed(10)
        }
	}

    /**
     * Determines the map width and height (in pixels) at a specified zoom level.
     * @param {Number} tileSize Tile size (in pixels).
     * @return {Number}
     */
    this.getMapSize = function(tileSize)
    {
        return tileSize * Math.pow(2, _layer.map.getZoom());
    }

    /**
     * Returns ground reolution.
     * The ground resolution indicates the distance on the ground that’s represented by a single pixel in the map.
     * For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters.
     * @param {Number} lat Latitude (in degrees) at which to measure the ground resolution.
     * @param {Number} tileSize Tile size.
     * @return {Number} The ground resolution, in meters per pixel.
     */
    this.getGroundResolution = function(lat, tileSize)
    {
        var latInRadians;
        var mapSize;

        latInRadians = Crystal.Utils.Math.degreesToRadians(lat);
        mapSize = this.getMapSize(tileSize, _layer.map.getZoom());

        // ground resolution = cos(latitude * pi/180) * earth circumference / map width
        return Math.cos(latInRadians) * (2 * Math.PI * Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS) / mapSize;        
    }

    /**
     * Returns map scale.
     * The map scale indicates the ratio between map distance and ground distance, when measured in the same units.
     * For instance, at a map scale of 1 : 100,000, each inch on the map represents a ground distance of 100,000 inches.
     * @param {Number} lat Latitude (in degrees) at which to measure the map scale.
     * @param {Number} screenDpi Resolution of the screen, in dots per inch.
     * @return {Number} The map scale, expressed as the denominator N of the ratio 1 : N
     */
    this.getMapScale = function(lat, screenDpi)
    {
        // map scale = 1 : ground resolution * screen dpi / 0.0254 meters/inch
        return this.getGroundResolution(lat, _layer.map.getZoom()) * screenDpi / 0.0254;
    }

    this.projectToViewPort = function(geoPoint, tileSize)
    {
        // 1. Спроецировать geoPoint в глобальную декартову метрическую систему и получить точку geoPointInGlobalMeters
        // 2. Спроецировать центр карты в глобальную декартову систему и получить точку mapCenterInGlobalPixel
        // 3. Получить координаты левого верхнего угла viewPort-а относительно глобальной системы координат по формуле:
        // localCartesianStartX = mapCenterInGlobalPixel.x - (viewPortWidth / 2)
        // localCartesianStartY = mapCenterInGlobalPixel.y - (viewPortWidth / 2)
        // 4. Получить точки относительно viewPort-а по формуле:
        // geoPointInLocalPixelX = geoPointInGlobalPixel.x - localCartesianStartX
        // geoPointInLocalPixelY = geoPointInGlobalPixel.y - localCartesianStartY

        var geoPointInGlobalMeters;
        var mapCenterInGlobalMeters;
        var geoPointInGlobalPixel;
        var mapCenterInGlobalPixel;        
        var viewPortStartInGlobalPixel;
        var geoPointInViewPortPixel;
        var viewPortSize;
        var groundResolution;

        viewPortSize = {
            width: _layer.map.container.clientWidth,
            height: _layer.map.container.clientHeight
        }

        groundResolution = this.getGroundResolution(geoPoint.lat, tileSize);

        geoPointInGlobalMeters = this.project(geoPoint);
        mapCenterInGlobalMeters = this.project(_layer.map.getCenter());

        geoPointInGlobalPixel = {
            x: geoPointInGlobalMeters.x / groundResolution,
            y: geoPointInGlobalMeters.y / groundResolution
        }

        mapCenterInGlobalPixel = {
            x: mapCenterInGlobalMeters.x / groundResolution,
            y: mapCenterInGlobalMeters.y / groundResolution           
        }

        viewPortStartInGlobalPixel = {
            x: mapCenterInGlobalPixel.x - (viewPortSize.width / 2),
            y: mapCenterInGlobalPixel.y - (viewPortSize.height / 2)
        }

        geoPointInViewPortPixel = {
            x: geoPointInGlobalPixel.x - viewPortStartInGlobalPixel.x,
            y: geoPointInGlobalPixel.y - viewPortStartInGlobalPixel.y
        }

        return geoPointInViewPortPixel;
    }

    // apply constructor
    this.initialize.apply(this, arguments);
}

/**
 * @const
 * @type {String}
 */
Crystal.Projections.SphericalMercator.CLASS_NAME = 'Crystal.Projections.SphericalMercator';

/**
 * Ellipsoid radius (in meters).
 * @const
 * @type {Number}
 */
Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS = 6378137;

/**
 * Minimum latitude.
 * @const
 * @type {Number}
 */
Crystal.Projections.SphericalMercator.MIN_LAT = -85.05112878;

/**
 * Maximum latitude.
 * @const
 * @type {Number}
 */    
Crystal.Projections.SphericalMercator.MAX_LAT = 85.05112878;

/**
 * Minimum longitude.
 * @const
 * @type {Number}
 */
Crystal.Projections.SphericalMercator.MIN_LON = -180;

/**
 * Maximum longitude.
 * @const
 * @type {Number}
 */    
Crystal.Projections.SphericalMercator.MAX_LON = 180;




    /**
     * Returns geographic point by screen XY coordinates at a specified zoom level.
     * The pixel at the upper-left corner of the map always has pixel coordinates (0, 0).
     * @param {Number} pixel Screen coordinate. Structure:
     * - {Number} x X coordinate on the map.
     * - {Number} y Y coordinate on the map.
     * @param {Number} zoomLevel Zoom level.
     * @param {Number} tileSize Tile size.
     * @return {Object} Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     */
/*    getGeoPointByPixel: function(pixel, zoomLevel, tileSize)
    {
        var mapSize;
        var clippedX;
        var clippedY;

        mapSize = Crystal.Projections.SphericalMercator.getMapSize(tileSize, zoomLevel);

        clippedX = Crystal.Projections.SphericalMercator.clip(pixel.x, 0, mapSize - 1);
        clippedY = Crystal.Projections.SphericalMercator.clip(pixel.y, 0, mapSize - 1);

        clippedX = (clippedX / mapSize) - 0.5;
        clippedY = 0.5 - (clippedY / mapSize);

        return {
            lat: 90 - 360 * Math.atan(Math.exp((-1 * clippedY) * 2 * Math.PI)) / Math.PI,
            lon: 360 * clippedX
        }
    }*/

    /**
     * Returns screen XY coordinates by geographic point at a specified zoom level.
     * The pixel at the upper-left corner of the map always has pixel coordinates (0, 0).
     * @param {Number} geoPoint Geographic point. Structure:
     * - {Number} lat fLatitude.
     * - {Number} lon Longitude.
     * @param {Number} zoomLevel Zoom level.
     * @param {Number} tileSize Tile size.
     * @return {Object} Structure:
     * - {Number} x X coordinate on the map.
     * - {Number} y Y coordinate on the map.
     */
    /*getPixelByGeoPoint: function(geoPoint, zoomLevel, tileSize)
    {
        var mapSize;
        var clippedLat;
        var clippedLon;
        var x;
        var y;
        var latInRadians;
        var sinLat;

        mapSize = Crystal.Projections.SphericalMercator.getMapSize(tileSize, zoomLevel);

        clippedLat = Crystal.Projections.SphericalMercator.clip(geoPoint.lat, Crystal.Projections.SphericalMercator.MIN_LAT, Crystal.Projections.SphericalMercator.MAX_LAT);
        clippedLon = Crystal.Projections.SphericalMercator.clip(geoPoint.lon, Crystal.Projections.SphericalMercator.MIN_LON, Crystal.Projections.SphericalMercator.MAX_LON);

        latInRadians = Crystal.Utils.Math.degreesToRadians(clippedLat);
        sinLat = Math.sin(latInRadians);
        
        x = ((clippedLon + 180) / 360) * mapSize; 
        y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * mapSize;

        x += 0.5;
        y += 0.5;

        return {
            x: Crystal.Projections.SphericalMercator.clip(x, 0, mapSize - 1),
            y: Crystal.Projections.SphericalMercator.clip(y, 0, mapSize - 1)
        }
    }*/
