/**
 * Tile drawer. Displays DOM tiles on the screen.
 */
define(['Utils/Dom'], function(Utils_Dom) {
    /**
     * @type {Layers/Tile/Drawer}
     */
    var _self;

    /**
     * @type {Layers/Tile}
     */
    var _layer;

    /**
     * @type {Number}
     */
    var _tileBufferSize;

    /**
     * Number of tiles, should be displayed in view port.
     * @type {Number}
     */
    var _viewPortTileSize = null;

    /**
     * Displays tile.
     * @param {Number} x X position in a tile grid.
     * @param {Number} y Y position in a tile grid.
     * @param {Object} centralTileXY Position of the central tile in a tile grid. Structure:
     * - {Number} x Offset by x.
     * - {Number} y Offset by y.
     * @param {Object} centralTileShift
     */
    function _showTile(x, y, centralTileXY, centralTileShift) {
        console.log(x, y, centralTileXY, centralTileShift);
        var viewPortCenter = {
            x: null,
            y: null
        };
        var centralTilePixel = { // position of the central tile in view port
            x: null,
            y: null
        };
        var img;
        var url;
        var xPixel; // x position on the screen
        var yPixel; // y position on the screen
        var subdomain; // subdomain of the tile server
            
        viewPortCenter.x = _layer.map.container.offsetWidth / 2;
        viewPortCenter.y = _layer.map.container.offsetHeight / 2;

        centralTilePixel.x = Math.floor(viewPortCenter.x - centralTileShift.x);
        centralTilePixel.y = Math.floor(viewPortCenter.y - centralTileShift.y);
        xPixel = centralTilePixel.x + ((x - centralTileXY.x) * _layer.tileSize);
        yPixel = centralTilePixel.y + ((y - centralTileXY.y) * _layer.tileSize);
            
        subdomain = _layer.subdomains[Math.floor(Math.random() * _layer.subdomains.length)];
            
        url = _layer.url;
        url = url.replace("{x}", x);
        url = url.replace("{y}", y);
        url = url.replace("{z}", _layer.map.getZoom());

        img = Utils_Dom.create('img');
        Utils_Dom.setOpacity(img, 0);
        img.onload = function () {
            Utils_Dom.fadeIn(img, 250);
        };
        img.src = 'http://' + subdomain + '.' + url;
        img.width = img.height = _layer.tileSize;
        img.style.left = xPixel + 'px';
        img.style.top = yPixel + 'px';

        _layer.container.appendChild(img);
    }

    /**
     * Returns x and y position of the tile in a tile server.
     * @param {Object} geoPoint Geographic point. Structure:
     * - {Number} lat Latitude.
     * - {Number} lon Longitude.
     * @return {Object} Structure:
     * - {Number} x Row number.
     * - {Number} y Col number.
     */
    function _getTileXY(geoPoint) {
        return {
            x: Math.floor((geoPoint.lon + 180) / 360 * Math.pow(2, _layer.map.getZoom())),
            y: Math.floor((1 - Math.log(Math.tan(geoPoint.lat * Math.PI / 180) + 1 / Math.cos(geoPoint.lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, _layer.map.getZoom()))
        };
    }

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

        /**
         * Init.
         * @param {Layers/Tile} layer Layer, drawer belongs to. Required.
         * @param {Number} tileBufferSize Number of cached tiles on each side. Optional. 0 by default.
         */
        (function(layer, tileBufferSize) {
            _layer = layer;
            _tileBufferSize = tileBufferSize || 0;
        })(arguments[0], arguments[1]);

        /**
         * Displays tiles.
         */
        _self.redraw = function() {
            var centralTileXY = { // position of the central tile in a tile grid
                x: null,
                y: null
            };
            var currentTileXY = { // position of the current tile in a tile grid
                x: null,
                y: null
            };
            var viewPortWidthAndHeight = { // max count of the tiles, view port can contains by x and y
                width: null,
                height: null
            };
            var spiral = 1; // spiral number
            var showed = 0; // tiles showed count
            var centralTileShift = {
                x: null,
                y: null
            };

            _layer.container.innerHTML = '';
            
            if(_viewPortTileSize === null) {
                viewPortWidthAndHeight.width = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetWidth / _layer.tileSize);
                viewPortWidthAndHeight.height = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetHeight / _layer.tileSize);
                _viewPortTileSize = viewPortWidthAndHeight.width * viewPortWidthAndHeight.height;
            }

            centralTileXY = _getTileXY(_layer.map.getCenter());
            currentTileXY = _getTileXY(_layer.map.getCenter());
                
            centralTileShift = {
                x: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).x - centralTileXY.x * 256,
                y: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).y - centralTileXY.y * 256
            };

            // show central tile
            _showTile(centralTileXY.x, centralTileXY.y, centralTileXY, centralTileShift);
            showed++;
                
            // show another tiles by spiral from the center
            while(showed < _viewPortTileSize) {
                while(currentTileXY.x < centralTileXY.x + spiral) { // move >
                    currentTileXY.x++;
                    _showTile(currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift);
                    showed++;
                }
                while(currentTileXY.y < centralTileXY.y + spiral) { // move v
                    currentTileXY.y++;
                    _showTile(currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift);
                    showed++;
                }
                while(currentTileXY.x > centralTileXY.x - spiral) { // move <
                    currentTileXY.x--;
                    _showTile(currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift);
                    showed++;
                }
                while(currentTileXY.y > centralTileXY.y - spiral && currentTileXY.y !== 0) { // move ^
                    currentTileXY.y--;
                    _showTile(currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift);
                    showed++;
                }
                spiral++;
            }
        };

        // experimental code
        _self.drawNewTiles = function() {
            var viewPortWidthAndHeight = {};
            viewPortWidthAndHeight.width = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetWidth / _layer.tileSize);
            viewPortWidthAndHeight.height = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetHeight / _layer.tileSize);
            var centralTileXY = _getTileXY(_layer.map.getCenter());
            var centralTileShift = {
                x: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).x - centralTileXY.x * 256,
                y: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).y - centralTileXY.y * 256
            };
           
           for(var i = 0; i < viewPortWidthAndHeight.height; i++) {
                _showTile(
                    centralTileXY.x - (Math.ceil(viewPortWidthAndHeight.width / 2) + 1),
                    centralTileXY.y - (Math.ceil(viewPortWidthAndHeight.height / 2) - 1 - i),
                    centralTileXY,
                    centralTileShift
                );
           }
        };
    };

    return constructor;
});