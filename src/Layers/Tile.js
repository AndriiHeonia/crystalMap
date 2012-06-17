/**
 * Tile layer module.
 * Provides a XYZ tile layer functionaity.
 * @see http://politerm.com.ru/zuludoc/tile_servers.htm
 * @see http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
define([
        'Validators/NotUndefined',
        'Validators/String',
        'Validators/Array',
        'Validators/MoreThan',
        'Validators/Number',
        'Utils/Type',
        'Utils/Common',
        'Utils/Dom',
        'Projections/SphericalMercator',
        'Interfaces/Projection',
        'System/InterfaceChecker',
        'Draggable'
    ],
    function(
        Validators_NotUndefined,
        Validators_String,
        Validators_Array,
        Validators_MoreThan,
        Validators_Number,
        Utils_Type,
        Utils_Common,
        Utils_Dom,
        Projections_SphericalMercator,
        Interfaces_Projection,
        System_InterfaceChecker,
        Draggable
    ) {
        /**
         * @type {Layers/Tile}
         */
        var _self;

        /**
         * @type {Object} Container of the layer.
         */
        var _container;

        /**
         * @type {Map} Map instance, layer belongs to.
         */
        var _map;

        /**
         * Initializes a tile container.
         */
        function _initContainer() {
            _container = Utils_Dom.create(
                'div',
                Utils_Common.createUniqueId('Layers/Tile'),
                'crystal-layer',
                _map.container
            );
        }

        /**
         * Destroys a tile container.
         */
        function _destroyContainer() {
            _map.container.removeChild(_container);
            _container = null;
        }

        /**
         * Displays tiles.
         */
        function _redraw() {
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
            var viewPortTileSize; // max count of the tiles, view port can contains
            var spiral = 1; // spiral number
            var showed = 0; // tiles showed count

            _container.innerHTML = '';
            
            viewPortWidthAndHeight.width = Math.ceil(_map.container.offsetWidth / _self.tileSize);
            viewPortWidthAndHeight.height = Math.ceil(_map.container.offsetHeight / _self.tileSize);
            viewPortTileSize = viewPortWidthAndHeight.width * viewPortWidthAndHeight.height;
            
            centralTileXY = _getTileXY(_map.getCenter());
            currentTileXY = _getTileXY(_map.getCenter());
            
            var centralTileShift = {
                x: _self.projection.projectToGlobalCoords(_map.getCenter(), _self.getSize()).x - centralTileXY.x * 256,
                y: _self.projection.projectToGlobalCoords(_map.getCenter(), _self.getSize()).y - centralTileXY.y * 256
            };

            // show central tile
            _showTile(centralTileXY.x, centralTileXY.y, centralTileXY, centralTileShift);
            showed++;
            
            // show another tiles by spiral from the center
            while(showed < viewPortTileSize) {
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
        }

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
            
            viewPortCenter.x = _map.container.offsetWidth / 2;
            viewPortCenter.y = _map.container.offsetHeight / 2;

            centralTilePixel.x = Math.floor(viewPortCenter.x - centralTileShift.x);
            centralTilePixel.y = Math.floor(viewPortCenter.y - centralTileShift.y);
            xPixel = centralTilePixel.x + ((x - centralTileXY.x) * _self.tileSize);
            yPixel = centralTilePixel.y + ((y - centralTileXY.y) * _self.tileSize);
            
            subdomain = _self.subdomains[Math.floor(Math.random() * _self.subdomains.length)];
            
            url = _self.url;
            url = url.replace("{x}", x);
            url = url.replace("{y}", y);
            url = url.replace("{z}", _map.getZoom());

            img = Utils_Dom.create('img');
            Utils_Dom.setOpacity(img, 0);
            img.onload = function () {
                Utils_Dom.fadeIn(img, 250);
            };
            img.src = 'http://' + subdomain + '.' + url;
            img.width = img.height = _self.tileSize;
            img.style.left = xPixel + 'px';
            img.style.top = yPixel + 'px';

            _container.appendChild(img);
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
                x: Math.floor((geoPoint.lon + 180) / 360 * Math.pow(2, _map.getZoom())),
                y: Math.floor((1 - Math.log(Math.tan(geoPoint.lat * Math.PI / 180) + 1 / Math.cos(geoPoint.lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, _map.getZoom()))
            };
        }

        /**
         * @constructor
         * @implements {IMapObserver}
         */
        var constructor = function() {
            _self = this;

            /**
             * Tile server url (without "http://").
             * @type {String}
             */
            _self.url = null;

            /**
             * Array with tile server subdomains.
             * @type {Array}
             */
            _self.subdomains = null;

            /**
             * Tile size.
             * @type {Number}
             */
            _self.tileSize = null;

            /**
             * Tile, should be displayed on error.
             * @type {String}
             */
            _self.errorTileUrl = null;

            /**
             * Projection of the layer.
             * @type {Interfaces/Projection}
             */
            _self.projection = null;

            /**
             * Init.
             * @param {Object} options Layer options object. Required. Structure:
             * - {String} url Tile server url (without "http://"). Required.
             * - {Array} subdomains Array with tile server subdomains. Required.
             * - {Number} tileSize Tile size. Required.
             * - {String} errorTileUrl Tile, should be displayed on error. Required.
             * - {Interfaces/Projection} projection Projection of this layer. Optional. Projections/SphericalMercator by default.
             */
            (function(options) {
                Validators_NotUndefined.validate(options, 'Layers/Tile', 'init');
                Validators_String.validate(options.url, 'Layers/Tile', 'init');
                Validators_Array.validate(options.subdomains, 'Layers/Tile', 'init');
                Validators_MoreThan.validate(options.subdomains.length, 0, 'Layers/Tile', 'init');
                Validators_Number.validate(options.tileSize, 'Layers/Tile', 'init');
                Validators_String.validate(options.errorTileUrl, 'Layers/Tile', 'init');
                
                if(Utils_Type.isUndefined(options.projection) === false) { // @todo to add test
                    System_InterfaceChecker.isImplements(options.projection, [Interfaces_Projection]);
                    _self.projection = options.projection;
                }
                else {
                    _self.projection = Projections_SphericalMercator;
                }
                _self.url = options.url;
                _self.subdomains = options.subdomains;
                _self.tileSize = options.tileSize;
                _self.errorTileUrl = options.errorTileUrl;
            })(arguments[0]);

            /**
             * Handles and process addition to the map notification.
             * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
             */
            _self.onAddToMap = function(mapEvent) {
                _map = mapEvent.map;

                _initContainer();
                _redraw();
                
                _self.enableDragging(_map, _container);
                
                _map.addListener('ZoomChanging', _redraw);
                _map.addListener('CenterChanging', _redraw);
            };

           /**
            * Handles and process removal from the map notification.
            * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
            */
            _self.onRemoveFromMap = function(mapEvent) {
                _map.removeListener('ZoomChanging', _redraw);
                _map.removeListener('CenterChanging', _redraw);
                
                _destroyContainer();
                _map = null;
            };

            // @todo make it!
            _self.onDrag = function(event) {
                var pixel = event.currentPixel;
                _container.style.left = pixel.x + 'px';
                _container.style.top = pixel.y + 'px';
            };

            /**
             * Determines the layer width and height (in pixels) at a specified zoom level.
             * @return {Number}
             */
            _self.getSize = function() {
                return _self.tileSize * Math.pow(2, _map.getZoom());
            };
        };

        constructor.prototype = Draggable;
        constructor.prototype.parent = constructor.prototype;

        return constructor;
    }
);