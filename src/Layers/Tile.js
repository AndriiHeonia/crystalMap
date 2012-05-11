/**
 * Provides a XYZ tile layer functionaity.
 * @see http://politerm.com.ru/zuludoc/tile_servers.htm
 * @see http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 * @constructor
 * @implements {IMapObserver}
 * @todo should use project and unproject methods from SphericalMercator class
 * @todo setCenter() should be fixed
 * @todo add clipping for projection
 */
Crystal.Layers.Tile = function()
{   
    /**
     * @type {Crystal.Map} Map instance, layer belongs to.
     */
    this.map = null;

    /**
     * @type {Object} Container of the layer.
     */
    var _container;
    
    /**
     * @type {Object}
     */
    var _options;

    /**
     * Initialization.
     * @param {Object} options Layer options object. Required. Structure:
     * - {String} url Tile server url (without "http://"). Required.
     * - {Array} subdomains Array with tile server subdomains. Required.
     * - {Number} tileSize Tile size. Required.
     * - {String} errorTileUrl Tile, should be displayed on error. Required.
     * - {Crystal.IProjection} projection Projection of this layer. Optional.Crystal.Projections.SphericalMercator by default.
     */
    this.initialize = function(options)
    {
        Crystal.Validators.NotUndefined.validate(options, this.constructor.CLASS_NAME, 'initialize');
        Crystal.Validators.String.validate(options.url, this.constructor.CLASS_NAME, 'initialize');
        Crystal.Validators.Array.validate(options.subdomains, this.constructor.CLASS_NAME, 'initialize');
        Crystal.Validators.MoreThan.validate(options.subdomains.length, 0, this.constructor.CLASS_NAME, 'initialize');
        Crystal.Validators.Number.validate(options.tileSize, this.constructor.CLASS_NAME, 'initialize');
        Crystal.Validators.String.validate(options.errorTileUrl, this.constructor.CLASS_NAME, 'initialize');        
        if(Crystal.Utils.Type.isUndefined(options.projection) === false)  // @todo to add test
        {
            Crystal.Interface.isImplements(options.projection, [Crystal.IProjection]);
        }
        else
        {
            options.projection = Crystal.Projections.SphericalMercator;
        }
        
        _options = options;
    }

    /**
     * Handles and process addition to the map notification.
     * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
     */
    this.onAddToMap = function(mapEvent)
    {
        this.map = mapEvent.map;

        _initContainer.call(this);
        _redraw.call(this);

        this.map.addListener('ZoomChanging', _redraw);
        this.map.addListener('CenterChanging', _redraw);        
    }
    
   /**
    * Handles and process removal from the map notification.
    * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
    */
    this.onRemoveFromMap = function(mapEvent)
    {
        this.map.removeListener('ZoomChanging', _redraw);
        this.map.removeListener('CenterChanging', _redraw);
        
        _destroyContainer.call(this);
        this.map = null;
    }

    /**
     * Determines the layer width and height (in pixels) at a specified zoom level.
     * @return {Number}
     */
    this.getSize = function()
    {
        return _options.tileSize * Math.pow(2, this.map.getZoom());
    }

    /**
     * Returns ground reolution of the layer.
     * The ground resolution indicates the distance on the ground that’s represented by a single pixel in the map.
     * For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters.
     * @param {Number} lat Latitude (in degrees) at which to measure the ground resolution.
     * @return {Number} The ground resolution, in meters per pixel.
     */
    this.getGroundResolution = function(lat)
    {
        var size;

        size = this.getSize(_options.tileSize, this.map.getZoom());

        return _options.projection.getGroundResolution(lat, size);
    }

    /**
     * Returns layer scale.
     * The scale indicates the ratio between map distance and ground distance, when measured in the same units.
     * For instance, at a map scale of 1 : 100,000, each inch on the map represents a ground distance of 100,000 inches.
     * @param {Number} lat Latitude (in degrees) at which to measure the map scale.
     * @param {Number} screenDpi Resolution of the screen, in dots per inch.
     * @return {Number} The map scale, expressed as the denominator N of the ratio 1 : N
     */
    this.getScale = function(lat, screenDpi)
    {
        // map scale = 1 : ground resolution * screen dpi / 0.0254 meters/inch
        return this.getGroundResolution(lat) * screenDpi / 0.0254;
    }

    /**
     * Returns point in view port Cartesian coordinate system by geographic point.
     * @param {Object} geoPoint Geographic point. Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     * @return {Object} Structure:
     * - {Number} x X coordinate (in meters).
     * - {Number} y Y coordinate (in meters).
     */   
    this.projectToViewPort = function(geoPoint)
    {
        var geoPointInGlobalMeters;
        var mapCenterInGlobalMeters;
        var geoPointInGlobalPixel;
        var mapCenterInGlobalPixel;        
        var viewPortStartInGlobalPixel;
        var geoPointInViewPortPixel;
        var viewPortSize;
        var groundResolution;

        viewPortSize = {
            width: this.map.container.clientWidth,
            height: this.map.container.clientHeight
        }

        groundResolution = this.getGroundResolution(geoPoint.lat);

        geoPointInGlobalMeters = _options.projection.project(geoPoint);
        mapCenterInGlobalMeters = _options.projection.project(this.map.getCenter());

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

        return {
            x: geoPointInGlobalPixel.x - viewPortStartInGlobalPixel.x,
            y: geoPointInGlobalPixel.y - viewPortStartInGlobalPixel.y
        }
    }

    /**
     * Initializes a tile container.
     */
    function _initContainer()
    {
        _container = Crystal.Utils.Dom.create(
            'div',
            Crystal.Utils.Common.createUniqueId('Crystal.Layers.Tile'),
            'crystal-layer',
            this.map.container
        );
    }

    /**
     * Destroys a tile container.
     */
    function _destroyContainer()
    {
        this.map.container.removeChild(_container);
        _container = null;
    }

    /**
     * Displays tiles.
     */
    function _redraw()
    {
        var xCenter; // x position of the central tile in a tile grid
        var yCenter; // y position of the central tile in a tile grid
        var x; // x position of the current tile in a tile grid
        var y; // y position of the current tile in a tile grid
        var spiral = 1; // spiral number        
        var showed = 0; // tiles showed count
        var viewPortXTileSize; // max count of the tiles, view port can contains by x
        var viewPortYTileSize; // max count of the tiles, view port can contains by y
        var viewPortTileSize; // max count of the tiles, view port can contains
        
        _container.innerHTML = '';
        
        viewPortXTileSize = Math.ceil(this.map.container.offsetWidth / _options.tileSize);
        viewPortYTileSize = Math.ceil(this.map.container.offsetHeight / _options.tileSize);
        viewPortTileSize = viewPortXTileSize * viewPortYTileSize;
        
        xCenter = x = _getTileX.apply(this, [this.map.getCenter().lon, this.map.getZoom()]);
        yCenter = y = _getTileY.apply(this, [this.map.getCenter().lat, this.map.getZoom()]);        
        
        // show central tile
        _showTile.apply(this, [x, y]);
        showed++;
        
        // show another tiles by spiral from the center
        while(showed < viewPortTileSize)
        {
            while(x < xCenter + spiral) // move >
            {
                x++;
                _showTile.apply(this, [x, y]);
                showed++;
            }
            
            while(y < yCenter + spiral) // move v
            {
                y++;
                _showTile.apply(this, [x, y]);
                showed++;
            }

            while(x > xCenter - spiral) // move <
            {
                x--;
                _showTile.apply(this, [x, y]);
                showed++;
            }

            while(y > yCenter - spiral && y != 0) // move ^
            {
                y--;
                _showTile.apply(this, [x, y]);
                showed++;
            }
            
            spiral++;
        }
    }
    
    /**
     * Displays tile.
     * @param {Number} x X position in a tile grid.
     * @param {Number} y Y position in a tile grid.
     */
    function _showTile(x, y)
    {
        var viewPortXCenter;
        var viewPortYCenter;
        var img;
        var url;
        var xCenter; // x position of the central tile in a tile grid
        var yCenter; // y position of the central tile in a tile grid
        var xPixelCenter; // x position of the central tile on the screen
        var yPixelCenter; // y position of the central tile on the screen
        var xPixel; // x position on the screen
        var yPixel; // y position on the screen
        var subdomain; // subdomain of the tile server
        
        xCenter = _getTileX.apply(this, [this.map.getCenter().lon, this.map.getZoom()]);
        yCenter = _getTileY.apply(this, [this.map.getCenter().lat, this.map.getZoom()]);        
        
        viewPortXCenter = this.map.container.offsetWidth / 2;
        viewPortYCenter = this.map.container.offsetHeight / 2;
                
        xPixelCenter = Math.floor(viewPortXCenter - _options.tileSize / 2);
        yPixelCenter = Math.floor(viewPortYCenter - _options.tileSize / 2);
        xPixel = xPixelCenter + ((x - xCenter) * _options.tileSize);
        yPixel = yPixelCenter + ((y - yCenter) * _options.tileSize);
        
        subdomain = _options.subdomains[Math.floor(Math.random() * _options.subdomains.length)];
        
        url = _options.url;
        url = url.replace("{x}", x);
        url = url.replace("{y}", y);
        url = url.replace("{z}", this.map.getZoom());

        img = Crystal.Utils.Dom.create('img');
        Crystal.Utils.Dom.setOpacity(img, 0);
        img.onload = function () {
            Crystal.Utils.Dom.fadeIn(img, 250);
        };
        img.src = 'http://' + subdomain + '.' + url;
        img.width = img.height = _options.tileSize;
        img.style.left = xPixel + 'px';
        img.style.top = yPixel + 'px';

        _container.appendChild(img);
    }

    /**
     * Returns X position of the tile in a tile server.
     * @param {Number} lon Longitude.
     * @param {Number} zoom Zoom level.
     * @return {Number}
     */
    function _getTileX(lon, zoom)
    {
        return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));        
    }

    /**
     * Returns Y position of the tile in a tile server.
     * @param {Number} lat Latitude.
     * @param {Number} zoom Zoom level.
     * @return {Number} 
     */
    function _getTileY(lat, zoom)
    {
        return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    }
    
    // apply constructor
    this.initialize.apply(this, arguments);    
}

/**
 * @const
 * @type {String}
 */
Crystal.Layers.Tile.CLASS_NAME = 'Crystal.Layers.Tile';