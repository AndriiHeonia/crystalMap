/**
 * Provides a XYZ tile layer functionaity.
 * @see http://politerm.com.ru/zuludoc/tile_servers.htm
 * @see http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
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
     * Initialization.
     * @todo validate params.
     */
    _options = options;

    /**
     * Handles and process addition to the map notification.
     * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
     */
    this.onAddToMap = function(mapEvent)
    {
        _map = mapEvent.getMap();
        _initContainer();
        _redraw();
    }
    
   /**
    * Handles and process map update notification.
    * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
    */
    this.onMapUpdate = function(mapEvent)
    {
        _map = mapEvent.getMap();
        _redraw();
    }
    
   /**
    * Handles and process removal from the map notification.
    * @param {Crystal.Events.Map} mapEvent Incapsulates information about the map that has been updated.
    */
    this.onRemoveFromMap = function(mapEvent)
    {
        _map = mapEvent.getMap();
        _redraw();
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
            _map.getContainer()
        );
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
        
        viewPortXTileSize = Math.ceil(_map.getContainer().offsetWidth / _options.tileSize);
        viewPortYTileSize = Math.ceil(_map.getContainer().offsetHeight / _options.tileSize);
        viewPortTileSize = viewPortXTileSize * viewPortYTileSize;
        
        xCenter = x = _getTileX(_map.getCenter().getLon(), _map.getZoom());
        yCenter = y = _getTileY(_map.getCenter().getLat(), _map.getZoom());        
        
        // show central tile
        _showTile(x, y);
        showed++;
        
        // show another tiles by spiral from the center
        while(showed < viewPortTileSize)
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
        
        xCenter = _getTileX(_map.getCenter().getLon(), _map.getZoom());
        yCenter = _getTileY(_map.getCenter().getLat(), _map.getZoom());        
        
        viewPortXCenter = _map.getContainer().offsetWidth / 2;
        viewPortYCenter = _map.getContainer().offsetHeight / 2;
                
        xPixelCenter = Math.floor(viewPortXCenter - _options.tileSize / 2);
        yPixelCenter = Math.floor(viewPortYCenter - _options.tileSize / 2);
        xPixel = xPixelCenter + ((x - xCenter) * _options.tileSize);
        yPixel = yPixelCenter + ((y - yCenter) * _options.tileSize);
        
        subdomain = _options.subdomains[Math.floor(Math.random() * _options.subdomains.length)];
        
        url = _options.url;
        url = url.replace("{x}", x);
        url = url.replace("{y}", y);
        url = url.replace("{z}", _map.getZoom());

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
        return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 *Math.pow(2, zoom));
    }        
}

Crystal.Layers.Tile.prototype.CLASS_NAME = 'Crystal.Layers.Tile';