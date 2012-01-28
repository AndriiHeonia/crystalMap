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
        //N = H * W
        //H = W = 2^Z, где  H – количество плиток по высоте,
        //W – количество плиток по ширине,
        //Z – номер уровня, начиная с нуля 
        var h, w;
        h = w = Math.pow(2, _map.getZoom());
        
        for(var x = 0; x < w; x++)
        {
            for (var y = 0; y < h; y++)
            {
                var img = Crystal.Utils.Dom.create('img');
                
                var url = _options.url;
                url = url.replace("{x}", x);
                url = url.replace("{y}", y);
                url = url.replace("{z}", _map.getZoom());
                
                img.src = 'http://' + _options.subdomains[0] + '.' + url;
                img.width = img.height = _options.tileSize;
                
                img.style.position = 'absolute';
                img.style.left = (x * _options.tileSize) + 'px';
                img.style.top = (y * _options.tileSize) + 'px';
                
                _container.appendChild(img);
            }
        }
    }
        
    /**
     * Initialization.
     * @todo validate params.
     */
    _options = options;
}

Crystal.Layers.Tile.prototype.CLASS_NAME = 'Crystal.Layers.Tile';