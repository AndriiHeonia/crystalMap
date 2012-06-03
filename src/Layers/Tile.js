/**
 * Tile layer module.
 * Provides a XYZ tile layer functionaity.
 * @see http://politerm.com.ru/zuludoc/tile_servers.htm
 * @see http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 * @todo should use project and unproject methods from SphericalMercator class
 * @todo setCenter() should be fixed
 * @todo add clipping for projection
 * @todo draw strategy should be configurable
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
        'InterfaceChecker'
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
        InterfaceChecker
    ) {
        /**
         * @type {Object} Container of the layer.
         */
        var _container;
        
        /**
         * @type {Object}
         */
        var _options;

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
            
            viewPortWidthAndHeight.width = Math.ceil(_map.container.offsetWidth / _options.tileSize);
            viewPortWidthAndHeight.height = Math.ceil(_map.container.offsetHeight / _options.tileSize);
            viewPortTileSize = viewPortWidthAndHeight.width * viewPortWidthAndHeight.height;
            
            centralTileXY = _getTileXY.apply(this, [_map.getCenter()]);
            currentTileXY = _getTileXY.apply(this, [_map.getCenter()]);
            
            var centralTileShift = {
                x: this.getGeoPointInGlobalPixel(_map.getCenter()).x - centralTileXY.x * 256,
                y: this.getGeoPointInGlobalPixel(_map.getCenter()).y - centralTileXY.y * 256
            };

            // show central tile
            _showTile.apply(this, [centralTileXY.x, centralTileXY.y, centralTileXY, centralTileShift]);
            showed++;
            
            // show another tiles by spiral from the center
            while(showed < viewPortTileSize) {
                while(currentTileXY.x < centralTileXY.x + spiral) { // move >
                    currentTileXY.x++;
                    _showTile.apply(this, [currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift]);
                    showed++;
                }
                
                while(currentTileXY.y < centralTileXY.y + spiral) { // move v
                    currentTileXY.y++;
                    _showTile.apply(this, [currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift]);
                    showed++;
                }

                while(currentTileXY.x > centralTileXY.x - spiral) { // move <
                    currentTileXY.x--;
                    _showTile.apply(this, [currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift]);
                    showed++;
                }

                while(currentTileXY.y > centralTileXY.y - spiral && currentTileXY.y !== 0) { // move ^
                    currentTileXY.y--;
                    _showTile.apply(this, [currentTileXY.x, currentTileXY.y, centralTileXY, centralTileShift]);
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
            xPixel = centralTilePixel.x + ((x - centralTileXY.x) * _options.tileSize);
            yPixel = centralTilePixel.y + ((y - centralTileXY.y) * _options.tileSize);
            
            subdomain = _options.subdomains[Math.floor(Math.random() * _options.subdomains.length)];
            
            url = _options.url;
            url = url.replace("{x}", x);
            url = url.replace("{y}", y);
            url = url.replace("{z}", _map.getZoom());

            img = Utils_Dom.create('img');
            Utils_Dom.setOpacity(img, 0);
            img.onload = function () {
                Utils_Dom.fadeIn(img, 250);
            };
            img.src = 'http://' + subdomain + '.' + url;
            img.width = img.height = _options.tileSize;
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
            /**
             * @type {Map} Map instance, layer belongs to.
             */
            this.map = null;

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
                Validators_NotUndefined.validate(options, 'Layers/Tile', 'initialize');
                Validators_String.validate(options.url, 'Layers/Tile', 'initialize');
                Validators_Array.validate(options.subdomains, 'Layers/Tile', 'initialize');
                Validators_MoreThan.validate(options.subdomains.length, 0, 'Layers/Tile', 'initialize');
                Validators_Number.validate(options.tileSize, 'Layers/Tile', 'initialize');
                Validators_String.validate(options.errorTileUrl, 'Layers/Tile', 'initialize');
                if(Utils_Type.isUndefined(options.projection) === false) { // @todo to add test
                    InterfaceChecker.isImplements(options.projection, [Interfaces_Projection]);
                }
                else {
                    options.projection = Projections_SphericalMercator;
                }
                
                _options = options;
            })(arguments[0]);

            /**
             * Handles and process addition to the map notification.
             * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
             */
            this.onAddToMap = function(mapEvent) {
                _map = this.map = mapEvent.map;

                _initContainer.call(this);
                _redraw.call(this);

                _map.addListener('ZoomChanging', _redraw);
                _map.addListener('CenterChanging', _redraw);
            };

           /**
            * Handles and process removal from the map notification.
            * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
            */
            this.onRemoveFromMap = function(mapEvent) {
                _map.removeListener('ZoomChanging', _redraw);
                _map.removeListener('CenterChanging', _redraw);
                
                _destroyContainer.call(this);
                _map = null;
            };

            /**
             * Determines the layer width and height (in pixels) at a specified zoom level.
             * @return {Number}
             */
            this.getSize = function() {
                return _options.tileSize * Math.pow(2, _map.getZoom());
            };

            /**
             * Returns ground resolution of the layer.
             * The ground resolution indicates the distance on the ground that’s represented by a single pixel in the map.
             * For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters.
             * @param {Number} lat Latitude (in degrees) at which to measure the ground resolution.
             * @return {Number} The ground resolution, in meters per pixel.
             */
            this.getGroundResolution = function(lat) {
                var size;

                size = this.getSize(_options.tileSize, _map.getZoom());

                return _options.projection.getGroundResolution(lat, size);
            };

            /**
             * Returns point in view port Cartesian coordinate system by geographic point.
             * @param {Object} geoPoint Geographic point. Structure:
             * - {Number} lat Latitude.
             * - {Number} lon Longitude.
             * @return {Object} Structure:
             * - {Number} x X coordinate (in meters).
             * - {Number} y Y coordinate (in meters).
             */
            this.projectToViewPort = function(geoPoint) {
                var geoPointInGlobalPixel;
                var viewPortStartInGlobalPixel;

                geoPointInGlobalPixel = this.getGeoPointInGlobalPixel(geoPoint);
                viewPortStartInGlobalPixel = this.getViewPortStartInGlobalPixel();

                return {
                    x: geoPointInGlobalPixel.x - viewPortStartInGlobalPixel.x,
                    y: geoPointInGlobalPixel.y - viewPortStartInGlobalPixel.y
                };
            };

            this.getGeoPointInGlobalPixel = function(geoPoint) {
                var lat = Utils_Common.clip(geoPoint.lat, _options.projection.MIN_LAT, _options.projection.MAX_LAT);
                var lon = Utils_Common.clip(geoPoint.lon, _options.projection.MIN_LON, _options.projection.MAX_LON);
                
                var x = (lon + 180) / 360;
                var sinLat = Math.sin(lat * Math.PI / 180);
                var y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
                var mapSize = this.getSize();
                
                return {
                    x: Utils_Common.clip(x * mapSize + 0.5, 0, mapSize - 1),
                    y: Utils_Common.clip(y * mapSize + 0.5, 0, mapSize - 1)
                };
            };

            this.getViewPortStartInGlobalPixel = function() {
                var mapCenterInGlobalPixel;
                var viewPortSize;

                viewPortSize = {
                    width: _map.container.clientWidth,
                    height: _map.container.clientHeight
                };
                
                mapCenterInGlobalPixel = this.getGeoPointInGlobalPixel(_map.getCenter());
                
                return {
                    x: mapCenterInGlobalPixel.x - (viewPortSize.width / 2),
                    y: mapCenterInGlobalPixel.y - (viewPortSize.height / 2)
                };
            };
        };

        return constructor;
    }
);