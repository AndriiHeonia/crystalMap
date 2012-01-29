/**
 * Provides a XYZ tile layer functionaity.
 * @constructor
 * @implements {IMapObserver}
 * @param {Object} options Layer options object. Required.
 * Object params:
 * - {String} url Tile server url (without "http://"). Required.
 * - {Array} subdomains Array with tile server subdomains. Required.
 * - {Number} tileSize Tile size. Required.
 * - {String} errorTileUrl Tile, should be displayed on error. Required.
 */
Crystal.Layers.Tile = function(options)
{
    /**
     * @type {Crystal.Map} Map instance, layer belongs to.
     */
    var _map;
    
    /**
     * @type {Object} Container of the layer.
     */
    var _container;
    
    /**
     * @type {Object}
     */
    var _options;
    
    /**
     * Handles and process addition to the map notification.
     * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
     */
    this.onAddToMap = function(mapEvent)
    {
        _map = mapEvent.getMap();
        _initContainer();
        _showTiles();
    }
    
    /**
     * Handles and process map update notification.
     * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
     */
    this.onMapUpdate = function(mapEvent) 
    {
    }
    
    /**
     * Handles and process removal from the map notification.
     * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
     */
    this.onRemoveFromMap = function(mapEvent) 
    {
    }
    
    /**
     * Initializes a tile container.
     */
    var _initContainer = function()
    {
        _container = Crystal.Utils.Dom.create(
            'div',
            Crystal.Utils.Common.createUniqueId('Crystal.Layers.Tile'),
            'crystal-layer',
            _map.getContainer()
        );
        _container.style.position = 'absolute';
    }
    
    /**
     * Displays tiles.
     */
    var _showTiles = function()
    {
        // http://politerm.com.ru/zuludoc/tile_servers.htm
        // http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#C.2FC.2B.2B

        var xCenter;
        var yCenter;
        var x; // current x
        var y; // current y
        var xSize; // size by x
        var ySize; // size by y
        var size; // xSize * ySize
        var spiral = 1; // spiral number        
        var showed = 0; // tiles showed count
        
        xCenter = x = _getTileX(_map.getCenter().getLon(), _map.getZoom());
        yCenter = y = _getTileY(_map.getCenter().getLat(), _map.getZoom());        
        xSize = ySize = Math.pow(2, _map.getZoom());
        size = xSize * ySize;
        
        // show central tile
        _showTile(x, y);
        showed++;
        
        while(showed < size)
        {
            while(x < xCenter + spiral) // move >
            {
                x++;
                _showTile(x, y);
                showed++;
            }
            
            while(y < yCenter + spiral) // move v
            {
                y++;
                _showTile(x, y);
                showed++;
            }

            while(x > xCenter - spiral) // move <
            {
                x--;
                _showTile(x, y);
                showed++;
            }

            while(y > yCenter - spiral && y != 0) // move ^
            {
                y--;
                _showTile(x, y);
                showed++;
            }
            
            spiral++;
        }
    }
    
    var _showTile = function(x, y)
    {
        var viewPortWidth;
        var viewPortHeight;
        var img;
        var url;
        var xPixel;
        var yPixel;
        var centerTileX;
        var centerTileY;
        
        viewPortWidth = _map.getContainer().offsetWidth;
        viewPortHeight = _map.getContainer().offsetHeight;
        
        centerTileX = _getTileX(_map.getCenter().getLon(), _map.getZoom());
        centerTileY = _getTileY(_map.getCenter().getLat(), _map.getZoom());

        xPixel = ((viewPortWidth / 2) - (_options.tileSize / 2)) + ((x - centerTileX) * _options.tileSize);
        yPixel = ((viewPortHeight / 2) - (_options.tileSize / 2)) + ((y - centerTileY) * _options.tileSize);

        url = _options.url;
        url = url.replace("{x}", x);
        url = url.replace("{y}", y);
        url = url.replace("{z}", _map.getZoom());

        img = Crystal.Utils.Dom.create('img');
        img.src = 'http://' + _options.subdomains[Math.floor(Math.random() * _options.subdomains.length)] + '.' + url;
        img.width = img.height = _options.tileSize;

        img.style.position = 'absolute';
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
    var _getTileX = function(lon, zoom)
    {
        return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));        
    }

    /**
     * Returns Y position of the tile in a tile server.
     * @param {Number} lat Latitude.
     * @param {Number} zoom Zoom level.
     * @return {Number} 
     */
    var _getTileY = function(lat, zoom)
    {
        return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 *Math.pow(2, zoom));
    }
        
    /**
     * Initialization.
     * @todo validate params.
     */
    _options = options;
}

Crystal.Layers.Tile.prototype.CLASS_NAME = 'Crystal.Layers.Tile';