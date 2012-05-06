/**
 * Provides a functionality to project geographic coordinates to 
 * coordinates in Cartesian coordinate system via Spherical Mercator 
 * projection (WGS-84) and inverse transformations.
 *
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 * @see http://wiki.openstreetmap.org/wiki/Mercator#Spherical_Mercator
 * @see http://kartoweb.itc.nl/geometrics/Map%20projections/mappro.html
 * @static
 */
Crystal.Projections.SphericalMercator = {    
    /**
     * Returns point in Cartesian coordinate system by geographic point.
     * @param {Object} geoPoint Geographic point. Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     * @return {Object} Structure:
     * - {Number} x X coordinate (in meters).
     * - {Number} y Y coordinate (in meters).
     */    
    project: function(geoPoint) 
    {
        return {
            x: 1 * (Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Crystal.Utils.Math.degreesToRadians(geoPoint.lon)).toFixed(10),
            y: 1 * (Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS * Math.log(Math.tan(Math.PI / 4 + Crystal.Utils.Math.degreesToRadians(geoPoint.lat) / 2))).toFixed(10)
        }
    },

    /**
     * Returns geographic point by point in Cartesian coordinate system.
     * @param {Object} Point point in Cartesian coordinate system. Structure:
     * - {Number} x X coordinate (in meters).
     * - {Number} y Y coordinate (in meters).
     * @return {Object} Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     */
	unproject: function(point) 
    {
        return {
            lat: 1 * (Crystal.Utils.Math.radiansToDegrees(2 * Math.atan(Math.exp(point.y / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)) - Math.PI / 2)).toFixed(10),
            lon: 1 * (Crystal.Utils.Math.radiansToDegrees(point.x / Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS)).toFixed(10)
        }
	},

// experimental code:

    /**
     * Clips a number to the specified minimum and maximum values.
     * @param {Number} number The number to clip.
     * @param {Number} minValue Minimum allowable value. 
     * @param {Number} maxValue Maximum allowable value.
     * @return {Number}
     */
    clip: function(number, minValue, maxValue)
    {
        return Math.min(Math.max(number, minValue), maxValue);
    },

    /**
     * Determines the map width and height (in pixels) at a specified zoom level.
     * @param {Number} tileSize Tile size (in pixels).
     * @param {Number} zoomLevel Zoom level.
     * @return {Number}
     */
    getMapSize: function(tileSize, zoomLevel)
    {
        return tileSize * Math.pow(2, zoomLevel);
    },

    /**
     * Returns ground reolution.
     * The ground resolution indicates the distance on the ground that’s represented by a single pixel in the map.
     * For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters.
     * @param {Number} lat Latitude (in degrees) at which to measure the ground resolution.
     * @param {Number} zoomLevel Zoom level.
     * @param {Number} tileSize Tile size.
     * @return {Number} The ground resolution, in meters per pixel.
     */
    getGroundResolution: function(lat, zoomLevel, tileSize)
    {
        var clippedLat;
        var latInRadians;
        var mapSize;

        clippedLat = Crystal.Projections.SphericalMercator.clip(
            lat,
            Crystal.Projections.SphericalMercator.MIN_LAT,
            Crystal.Projections.SphericalMercator.MAX_LAT
        );
        latInRadians = Crystal.Utils.Math.degreesToRadians(clippedLat);
        mapSize = Crystal.Projections.SphericalMercator.getMapSize(tileSize, zoomLevel);

        // ground resolution = cos(latitude * pi/180) * earth circumference / map width
        return Math.cos(latInRadians) * (2 * Math.PI * Crystal.Projections.SphericalMercator.ELLIPSOID_AXIS) / mapSize;        
    },

    /**
     * Returns map scale.
     * The map scale indicates the ratio between map distance and ground distance, when measured in the same units.
     * For instance, at a map scale of 1 : 100,000, each inch on the map represents a ground distance of 100,000 inches.
     * @param {Number} lat Latitude (in degrees) at which to measure the map scale.
     * @param {Number} zoomLevel Zoom level.
     * @param {Number} screenDpi Resolution of the screen, in dots per inch.
     * @return {Number} The map scale, expressed as the denominator N of the ratio 1 : N
     */
    getMapScale: function(lat, zoomLevel, screenDpi)
    {
        // map scale = 1 : ground resolution * screen dpi / 0.0254 meters/inch
        return Crystal.Projections.SphericalMercator.getGroundResolution(lat, zoomLevel) * screenDpi / 0.0254;
    },

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
    getGeoPointByPixel: function(pixel, zoomLevel, tileSize)
    {
        /* @todo try this:
        Dim mapSize = Math.Pow(2, zoomLevel) * 256
        Dim tileX As Integer = Math.Truncate(pixelX / 256)
        Dim tileY As Integer = Math.Truncate(pixelY / 256)

        Dim p As PointF = New Point()
        Dim n As Double = Math.PI - ((2.0 * Math.PI * (ClipByRange(pixelY, mapSize - 1) / 256)) / Math.Pow(2.0, zoomLevel))

        longitude = CSng(((ClipByRange(pixelX, mapSize - 1) / 256) / Math.Pow(2.0, zoomLevel) * 360.0) - 180.0)
        latitude = CSng(180.0 / Math.PI * Math.Atan(Math.Sinh(n)))
        */
/* @see http://help.openstreetmap.org/questions/2687/coordinates-to-pixels-based-on-zoom */
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
    },

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
    getPixelByGeoPoint: function(geoPoint, zoomLevel, tileSize)
    {
        /* @todo try this:
        Dim MinLatitude = -85.05112878
        Dim MaxLatitude = 85.05112878
        Dim MinLongitude = -180
        Dim MaxLongitude = 180
        Dim mapSize = Math.Pow(2, zoomLevel) * 256

        latitude = Clip(latitude, MinLatitude, MaxLatitude)
        longitude = Clip(longitude, MinLongitude, MaxLongitude)

        Dim p As PointF = New Point()
        p.X = CSng((longitude + 180.0) / 360.0 * (1 << zoomLevel))
        p.Y = CSng((1.0 - Math.Log(Math.Tan(latitude * Math.PI / 180.0) + 1.0 / Math.Cos(toRadians(latitude))) / Math.PI) / 2.0 * (1 << zoomLevel))

        Dim tilex As Integer = CInt(Math.Truncate(p.X))
        Dim tiley As Integer = CInt(Math.Truncate(p.Y))
        pixelX = ClipByRange((tilex * 256) + ((p.X - tilex) * 256), mapSize - 1)
        pixelY = ClipByRange((tiley * 256) + ((p.Y - tiley) * 256), mapSize - 1)
        */

        var mapSize;
        var clippedLat;
        var clippedLon;
        var x;
        var y;
        var latInRadians;
        var sinLat;

        // sinLatitude = sin(latitude * pi/180)
        // pixelX = ((longitude + 180) / 360) * tile size * 2^level
        // pixelY = (0.5 – log((1 + sinLatitude) / (1 – sinLatitude)) / (4 * pi)) * tile size * 2^level 

        mapSize = Crystal.Projections.SphericalMercator.getMapSize(tileSize, zoomLevel);

        clippedLat = Crystal.Projections.SphericalMercator.clip(geoPoint.lat, Crystal.Projections.SphericalMercator.MIN_LAT, Crystal.Projections.SphericalMercator.MAX_LAT);
        clippedLon = Crystal.Projections.SphericalMercator.clip(geoPoint.lon, Crystal.Projections.SphericalMercator.MIN_LON, Crystal.Projections.SphericalMercator.MAX_LON);

        latInRadians = Crystal.Utils.Math.degreesToRadians(clippedLat);
        sinLat = Math.sin(latInRadians);
        
        x = ((clippedLon + 180) / 360) * mapSize; 
        y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * mapSize;

        /*x += 0.5;
        y += 0.5;*/

        return {
            x: Crystal.Projections.SphericalMercator.clip(x, 0, mapSize - 1),
            y: Crystal.Projections.SphericalMercator.clip(y, 0, mapSize - 1)
        }
    },

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
    MAX_LON: 180
}