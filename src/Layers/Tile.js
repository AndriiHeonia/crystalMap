/**
 * Tile layer module.
 * Provides a XYZ tile layer functionaity.
 * @author Andrey Geonya <a.geonya@gmail.com>
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
        'Draggable',
        'Vendors/PubSub',
        'Layers/Tile/Drawer'
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
        Draggable,
        Vendors_PubSub,
        Layers_Tile_Drawer
    ) {
        /**
         * @type {Layers/Tile}
         */
        var _self;

        /**
         * Stores offset of tile layer before dragging.
         * @type {Object} Structure:
         * - {Number} x Offset by x.
         * - {Number} y Offset by y.
         */
        _containerOffset = {
            x: 0,
            y: 0
        };

        /**
         * @type {Layers/Tile/Drawer} Tile drawer.
         */
        var _drawer;

        /**
         * Initializes a tile layer DOM element.
         */
        function _initContainer() {
            _self.container = Utils_Dom.create(
                'div',
                Utils_Common.createUniqueId('Layers/Tile'),
                'crystal-layer',
                _self.map.container
            );
        }

        /**
         * Destroys a tile layer DOM element.
         */
        function _destroyContainer() {
            _self.map.container.removeChild(_self.container);
            _self.container = null;
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
             * @type {Object} Container of the layer.
             */
            _self.container = null;

            /**
             * @type {Map} Map instance, layer belongs to.
             */
             _self.map = null;

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

                _drawer = new Layers_Tile_Drawer(_self, 1);
            })(arguments[0]);

            /**
             * Handles and process addition to the map notification.
             * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
             */
            _self.onAddToMap = function(mapEvent) {
                _self.map = mapEvent.map;

                _initContainer();
                _drawer.initViewPortTileSize();
                _drawer.draw();
                
                _self.enableDragging(_self.map, _self.map.container);

                Vendors_PubSub.subscribe('Map/CenterChanging', _drawer.draw);
                Vendors_PubSub.subscribe('Map/ZoomChanging', _drawer.draw);
            };

           /**
            * Handles and process removal from the map notification.
            * @param {Events/Map} mapEvent Incapsulates information about the map that has been updated.
            */
            _self.onRemoveFromMap = function(mapEvent) {
                Vendors_PubSub.unsubscribe('Map/CenterChanging', _drawer.draw);
                Vendors_PubSub.unsubscribe('Map/ZoomChanging', _drawer.draw);
                
                _destroyContainer();
                _self.map = null;
            };

            /**
             * @todo doc and test
             */
            _self.onDragStart = function(event) {
                _containerOffset.x = _self.container.style.left ? parseInt(_self.container.style.left, 10) : 0;
                _containerOffset.y = _self.container.style.top ? parseInt(_self.container.style.top, 10) : 0;
            };

            /**
             * @todo doc and test
             */
            _self.onDrag = function(event) {
                var left = _containerOffset.x + event.currentPixel.x - event.startPixel.x;
                var top = _containerOffset.y + event.currentPixel.y - event.startPixel.y;

                Vendors_PubSub.publish('Layers/Tile/Dragging', event, {
                    x: left,
                    y: top
                });

                _self.container.style.cssText += "; left: " + left + "px; top: " + top + "px;";
                _drawer.redraw(left, top);
            };

            /**
             * Determines the layer width and height (in pixels) at a specified zoom level.
             * @return {Number}
             */
            _self.getSize = function() {
                return _self.tileSize * Math.pow(2, _self.map.getZoom());
            };
        };

        constructor.prototype = Draggable;
        constructor.prototype.parent = constructor.prototype;

        return constructor;
    }
);