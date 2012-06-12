/**
 * Map module.
 * Provides a map functionaity.
 * Fires the next events:
 * - MapUpdating - when any object added to the map or removed from the map;
 * - ZoomChanging - when map zoom changed;
 * - CenterChanging - when map center changed.
 */
define([
        'Observable',
        'Utils/Type',
        'Validators/DomElement',
        'Validators/GeoPoint',
        'Validators/Number',
        'Validators/NotNull',
        'MapRegister',
        'Events/Map',
        'InterfaceChecker',
        'Interfaces/MapObserver',
        'Utils/Dom',
        'Utils/Common',
        'Map/Behavior'
    ],
    function(
        Observable,
        Utils_Type,
        Validators_DomElement,
        Validators_GeoPoint,
        Validators_Number,
        Validators_NotNull,
        MapRegister,
        Events_Map,
        InterfaceChecker,
        Interfaces_MapObserver,
        Utils_Dom,
        Utils_Common,
        Map_Behavior
    ) {
        /**
         * @type {Map}
         */
        var _self;

        /**
         * @type {Object}
         */
        var _center;

        /**
         * @type {Number}
         */
        var _zoom;

        /**
         * @type {Array}
         */
        var _directObservers = [];

        /**
         * @type {Map/Behavior} Behavior of this map.
         */
        var _behavior;

        /**
         * @constructor
         * @extends {Observable}
         */
        var constructor = function() {
            _self = this;

            /**
             * DOM element, which contains this map.
             * @type {Object}
             */
            this.container = null;

            /**
             * Base layer
             * @todo to think about attaching base layer to the map!
             * @type {Layers/Tile}
             */
            this.baseLayer = null;

            /**
             * Initialization.
             * @param {String|Object} container DOM element or ID of the DOM element, which should contain this map. Required.
             * @param {Object} center Geographic coordinates of the center. Optional.
             * @param {Number} zoom Zoom level. Optional.
             */
            (function(container, center, zoom) {
                var containerIsStr;
                    
                containerIsStr = Utils_Type.isString(container);
                _self.container = containerIsStr ? document.getElementById(container) : container;
                    
                if(containerIsStr) {
                    Validators_NotNull.validate(_self.container, 'Map', 'initialize');
                }
                else {
                    Validators_DomElement.validate(_self.container, 'Map', 'initialize');
                }
                if(center) {
                    Validators_GeoPoint.validate(center);
                }
                if(zoom) {
                    Validators_Number.validate(zoom, 'Map', 'initialize');
                }
                
                _self.container.innerHTML = '';
                _self.container.style.position = 'relative';
                _self.container.style.backgroundColor = '#F4F2EE';
                _center = center || {lat: 0, lon: 0};
                _zoom = zoom || 0;

                MapRegister.add(_self);
                    
                // events, which can be fired by this object
                _self.registerEvent([
                    'MapUpdating',
                    'ZoomChanging',
                    'CenterChanging'
                ]);

                _behavior = new Map_Behavior(_self);
                    
                //_addDomListeners.call(this);
             })(arguments[0], arguments[1], arguments[2]);

            /**
            * Returns an event object with information about the map.
            * @return {Events.Map}
            */
            this.getEventObject = function()
            {
                return new Events_Map(_self);
            };

            /**
            * Returns geographic coordinates of the center.
            * @return {Object} Coordinates of the center.
            */
            this.getCenter = function()
            {
                return _center;
            };

            /**
             * Sets geographic coordinates of the center.
             * @param {Object} center Coordinates of the center. Required.
             */
            this.setCenter = function(center)
            {
                Validators_GeoPoint.validate(center);
                
                _center = center;
                _self.fireEvent('CenterChanging');
            };

            /**
             * Returns zoom level of the map.
             * @return {Number} Zoom level.
             */
            this.getZoom = function()
            {
                return _zoom;
            };

            /**
             * Sets zoom level of the map.
             * @param {Number} zoom Zoom level. Required.
             */
            this.setZoom = function(zoom)
            {
                Validators_Number.validate(zoom, 'Map', 'setZoom');
                _zoom = zoom;
                _self.fireEvent('ZoomChanging');
            };

            /**
             * Adds an observer to the map.
             * @param {Interfaces/MapObserver} observer Observer to listen map events. Required.
             */
            this.add = function(observer)
            {
                InterfaceChecker.isImplements(observer, [Interfaces_MapObserver]);
                
                _directObservers.push(observer);
                if(_self.baseLayer === null) {
                    _self.baseLayer = observer; // @todo shouldn't be first object
                }
                observer.onAddToMap(_self.getEventObject());
                _self.fireEvent('MapUpdating');
            };

            /**
             * Removes an observer from the map.
             * @param {Interfaces/MapObserver} observer Registered observer. Required.
             */
            this.remove = function(observer)
            {
                InterfaceChecker.isImplements(observer, [Interfaces_MapObserver]);

                observer.onRemoveFromMap(_self.getEventObject());
                _directObservers.splice(_directObservers.indexOf(observer), 1);
                _self.fireEvent('MapUpdating');
            };
            
            /**
             * Destructor
             */
            this.destroy = function() {
                _self.parent.destroy();
                
                // Calls onRemoveFromMap method to each user added observer and clears _directObservers array
                for(var i = 0; i < _directObservers.length; i++) {
                    _directObservers[i].onRemoveFromMap(_self.getEventObject);
                }
                _directObservers = [];

                MapRegister.remove(_self.container.id);
            };

            // @todo doc and test
            this.projectToViewPort = function(geoPoint) {
                return _self.baseLayer.projection.projectToViewPort(
                    geoPoint,
                    _self.getCenter(),
                    _self.baseLayer.getSize(),
                    {
                        width: _self.container.clientWidth,
                        height: _self.container.clientHeight
                    }
                );
            };

            // @todo doc and test
            this.unprojectFromViewPort = function(pixel) {
                return _self.baseLayer.projection.unprojectFromViewPort(
                    pixel,
                    _self.getCenter(),
                    _self.baseLayer.getSize(),
                    {
                        width: _self.container.clientWidth,
                        height: _self.container.clientHeight
                    }
                );
            };
        };

        constructor.prototype = Observable;
        constructor.prototype.parent = constructor.prototype;

        return constructor;
    }
);