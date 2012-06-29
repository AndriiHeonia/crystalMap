/**
 * Tile drawer. Displays DOM tiles on the screen.
 * @author Andrey Geonya <a.geonya@gmail.com>
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
     * Showed tiles bound.
     * @type {Object} Structure:
     * - {Object} leftTop Structure:
     *  - {Number} x X coordinate in tile grid.
     *  - {Number} y Y coordinate in tile grid.
     * - {Object} rightBottom Structure:
     *  - {Number} x X coordinate in tile grid.
     *  - {Number} y Y coordinate in tile grid.
     */
    var _showedTiles = {
        leftTop: {
            x: 0,
            y: 0
        },
        rightBottom: {
            x: 0,
            y: 0
        }
    };

    /**
     * View port width and height.
     * @type {Object} Structure:
     * - {Number} width View port width.
     * - {Number} height View port height.
     */
    var _viewPortWidthAndHeight = {
        width: 0,
        height: 0
    };

    /**
     * Position of the central tile in a tile grid.
     * @type {Object} Structure:
     *  - {Number} x X coordinate in tile grid.
     *  - {Number} y Y coordinate in tile grid.
     */
    var _centralTileXY = {
        x: 0,
        y: 0
    };

    /**
     * Shift of the central tile from the center.
     * @type {Object} Structure:
     * - {Number} x Shift by x coordinate (in pixels).
     * - {Number} y Shift by y coordinate (in pixels).
     */
    var _centralTileShift = {
        x: 0,
        y: 0
    };

    /**
     * Offset of the draggable layer container (stores previous value on dragging).
     * Helps to check or new tiles should be drawed.
     * @type {Object} Structure:
     * - {Number} x Offset by x coordinate (tiles count).
     * - {Number} y Offset by y coordinate (tiles count).
     */
    var _containerOffset = {
        x: 0,
        y: 0
    };

    /**
     * Displays tile.
     * @param {Number} x X position in a tile grid.
     * @param {Number} y Y position in a tile grid.
     * @patam {Object} container DOM object should contain tile.
     */
    function _drawTile(x, y, container) {
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

        centralTilePixel.x = Math.floor(viewPortCenter.x - _centralTileShift.x);
        centralTilePixel.y = Math.floor(viewPortCenter.y - _centralTileShift.y);
        xPixel = centralTilePixel.x + ((x - _centralTileXY.x) * _layer.tileSize);
        yPixel = centralTilePixel.y + ((y - _centralTileXY.y) * _layer.tileSize);
            
        subdomain = _layer.subdomains[Math.floor(Math.random() * _layer.subdomains.length)];
            
        url = _layer.url;
        url = url.replace("{x}", x);
        url = url.replace("{y}", y);
        url = url.replace("{z}", _layer.map.getZoom());

        img = Utils_Dom.create('img', x + '_' + y);
        Utils_Dom.setOpacity(img, 0);
        img.onload = function () {
            Utils_Dom.fadeIn(img, 250);
        };
        img.src = 'http://' + subdomain + '.' + url;
        img.width = img.height = _layer.tileSize;
        img.style.left = xPixel + 'px';
        img.style.top = yPixel + 'px';

        container.appendChild(img);
    }

    /**
     * Updates classes for the bordered tiles.
     */
    function _updateTileClasses() {
        var topTile;
        var rightTile;
        var bottomTile;
        var leftTile;

        _resetTileClasses('topTile');
        _resetTileClasses('bottomTile');
        _resetTileClasses('leftTile');
        _resetTileClasses('rightTile');

        // update top and bottom tile classes
        for(var i = _showedTiles.leftTop.x; i <= _showedTiles.rightBottom.x; i++) {
            topTile = document.getElementById(i + '_' + _showedTiles.leftTop.y);
            topTile.className = 'topTile';
            bottomTile = document.getElementById(i + '_' + _showedTiles.rightBottom.y);
            bottomTile.className = 'bottomTile';
        }

        // update corner, left and right tile classes
        leftTile = document.getElementById(_showedTiles.leftTop.x + '_' + _showedTiles.leftTop.y);
        leftTile.className = 'leftTile topTile';
        rightTile = document.getElementById(_showedTiles.rightBottom.x + '_' + _showedTiles.leftTop.y);
        rightTile.className = 'rightTile topTile';
        for(var j = _showedTiles.leftTop.y + 1; j < _showedTiles.rightBottom.y; j++) {
            leftTile = document.getElementById(_showedTiles.leftTop.x + '_' + j);
            leftTile.className = 'leftTile';
            rightTile = document.getElementById(_showedTiles.rightBottom.x + '_' + j);
            rightTile.className = 'rightTile';
        }
        leftTile = document.getElementById(_showedTiles.leftTop.x + '_' + j);
        leftTile.className = 'leftTile bottomTile';
        rightTile = document.getElementById(_showedTiles.rightBottom.x + '_' + j);
        rightTile.className = 'rightTile bottomTile';
    }

    /**
     * Removes tile classes.
     * @param {String} className Class name of the tiles.
     */
    function _resetTileClasses(className) {
        var elements;

        elements = document.getElementsByClassName(className);
        while(typeof(elements[0]) !== 'undefined') {
            elements[0].removeAttribute('class');
        }
    }

    /**
     * Removes tiles by class.
     * @param {String} className Class name.
     */
    function _removeTilesByClass(className) {
        var elements;

        elements = document.getElementsByClassName(className);
        _layer.container.style.display = 'none';
        while(typeof(elements[0]) !== 'undefined') {
            _layer.container.removeChild(elements[0]);
        }
        _layer.container.style.display = 'block';
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
     * Draws tiles in bordered left colum.
     */
    function _drawLeftTiles() {
        var documentFragment;

        documentFragment = document.createDocumentFragment();

        _showedTiles.leftTop.x--;
        for(var i = _showedTiles.leftTop.y; i <= _showedTiles.rightBottom.y; i++) {
            _drawTile(_showedTiles.leftTop.x, i, documentFragment);
        }
        _layer.container.appendChild(documentFragment);
        _removeTilesByClass('rightTile');
        _showedTiles.rightBottom.x--;
        _updateTileClasses();
    }

    /**
     * Draws tiles in bordered right colum.
     */
    function _drawRightTiles() {
        var documentFragment;

        documentFragment = document.createDocumentFragment();

        _showedTiles.rightBottom.x++;
        for(var i = _showedTiles.leftTop.y; i <= _showedTiles.rightBottom.y; i++) {
            _drawTile(_showedTiles.rightBottom.x, i, documentFragment);
        }
        _layer.container.appendChild(documentFragment);
        _removeTilesByClass('leftTile');
        _showedTiles.leftTop.x++;
        _updateTileClasses();
    }

    /**
     * Draws tiles in bordered top row.
     */
    function _drawTopTiles() {
        var documentFragment;

        documentFragment = document.createDocumentFragment();

        _showedTiles.leftTop.y--;
        for(var i = _showedTiles.leftTop.x; i <= _showedTiles.rightBottom.x; i++) {
            _drawTile(i, _showedTiles.leftTop.y, documentFragment);
        }
        _layer.container.appendChild(documentFragment);
        _removeTilesByClass('bottomTile');
        _showedTiles.rightBottom.y--;
        _updateTileClasses();
    }

    /**
     * Draws tiles in bordered bottom row.
     */
    function _drawBottomTiles() {
        var documentFragment;

        documentFragment = document.createDocumentFragment();

        _showedTiles.rightBottom.y++;
        for(var i = _showedTiles.leftTop.x; i <= _showedTiles.rightBottom.x; i++) {
            _drawTile(i, _showedTiles.rightBottom.y, documentFragment);
        }
        _layer.container.appendChild(documentFragment);
        _removeTilesByClass('topTile');
        _showedTiles.leftTop.y++;
        _updateTileClasses();
    }

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

        /**
         * Init.
         * @param {Layers/Tile} layer Layer, drawer belongs to. Required.
         * @param {Number} tileBufferSize Number of cached tiles on each side. Optional. 1 by default.
         */
        (function(layer, tileBufferSize) {
            _layer = layer;
            _tileBufferSize = tileBufferSize || 1;
        })(arguments[0], arguments[1]);

        _self.initViewPortTileSize = function() {
            var viewPortWidthAndHeight = {
                width: null,
                height: null
            };
            _viewPortWidthAndHeight.width = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetWidth / _layer.tileSize);
            _viewPortWidthAndHeight.height = (_tileBufferSize * 2) + Math.ceil(_layer.map.container.offsetHeight / _layer.tileSize);
        };

        /**
         * Clears all previous tiles and displays new tiles in view port.
         */
        _self.draw = function() {
            var leftTop;
            var rightBottom;
            var viewPortHalfWidth;
            var viewPortHalfHeight;
            var documentFragment;

            documentFragment = document.createDocumentFragment();

            _centralTileXY = _getTileXY(_layer.map.getCenter());
            _centralTileShift = {
                x: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).x - _centralTileXY.x * _layer.tileSize,
                y: _layer.projection.projectToGlobalCoords(_layer.map.getCenter(), _layer.getSize()).y - _centralTileXY.y * _layer.tileSize
            };

            _layer.container.innerHTML = '';

            viewPortHalfWidth = Math.ceil(_viewPortWidthAndHeight.width / 2);
            viewPortHalfHeight = Math.ceil(_viewPortWidthAndHeight.height / 2);
            _showedTiles.leftTop = leftTop = {
                x: _centralTileXY.x - viewPortHalfWidth,
                y: _centralTileXY.y - viewPortHalfHeight
            },
            rightBottom = {
                x: _centralTileXY.x + viewPortHalfWidth,
                y: _centralTileXY.y + viewPortHalfHeight
            };

            for(var i = leftTop.x; i < rightBottom.x; i++) {
                _showedTiles.rightBottom.x = i;
                for(var j = leftTop.y; j < rightBottom.y; j++) {
                    _showedTiles.rightBottom.y = j;
                    _drawTile(i, j, documentFragment);
                }
            }

            _layer.container.appendChild(documentFragment);
            _updateTileClasses();
        };

        /**
         * Appends new tiles to view port and removes old tiles.
         * @param {Number} left Tile layer offset by x coordinate.
         * @param {Number} top Tile layer offset by y coordinate.
         */
        _self.redraw = function(left, top) {
            var offsetX;
            var offsetY;
            var unroundedOffsetX = left / _layer.tileSize;
            var unroundedOffsetY = top / _layer.tileSize;

            // @see http://jsperf.com/math-round-vs-hack/6
            offsetX = ~~(unroundedOffsetX + (unroundedOffsetX > 0 ? .5 : -.5));
            offsetY = ~~(unroundedOffsetY + (unroundedOffsetY > 0 ? .5 : -.5));
            
            // draws left or right column with tiles
            if(offsetX > _containerOffset.x) {
                _drawLeftTiles();
            }
            else if(offsetX < _containerOffset.x) {
                _drawRightTiles();
            }
            _containerOffset.x = offsetX;
            
            // draws top or bottom row with tiles
            if(offsetY > _containerOffset.y) {
                _drawTopTiles();
            }
            else if(offsetY < _containerOffset.y) {
                _drawBottomTiles();
            }
            _containerOffset.y = offsetY;
        };
    };

    return constructor;
});