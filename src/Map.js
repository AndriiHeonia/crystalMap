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
                return new Events_Map(this);
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
                this.fireEvent('CenterChanging');
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
                this.fireEvent('ZoomChanging');
            };

            /**
             * Adds an observer to the map.
             * @param {Interfaces/MapObserver} observer Observer to listen map events. Required.
             */
            this.add = function(observer)
            {
                InterfaceChecker.isImplements(observer, [Interfaces_MapObserver]);
                
                _directObservers.push(observer);
                observer.onAddToMap(this.getEventObject());
                this.fireEvent('MapUpdating');
            };

            /**
             * Removes an observer from the map.
             * @param {Interfaces/MapObserver} observer Registered observer. Required.
             */
            this.remove = function(observer)
            {
                InterfaceChecker.isImplements(observer, [Interfaces_MapObserver]);

                observer.onRemoveFromMap(this.getEventObject());
                _directObservers.splice(_directObservers.indexOf(observer), 1);
                this.fireEvent('MapUpdating');
            };
            
            /**
             * Destructor
             */
            this.destroy = function() {
                this.parent.destroy();
                
                // Calls onRemoveFromMap method to each user added observer and clears _directObservers array
                for(var i = 0; i < _directObservers.length; i++) {
                    _directObservers[i].onRemoveFromMap(this.getEventObject);
                }
                _directObservers = [];

                MapRegister.remove(this.container.id);
            };
            
            function _handleDragging(event)
            {
                // @todo
                // console.log('src:');
                // console.log(event.getPixel());
                // console.log(event.getGeoPoint());

                // console.log('converted:');
                // console.log(Crystal.Projections.SphericalMercator.getPixelByGeoPoint(event.getGeoPoint(), 10, 256));
                // console.log(Crystal.Projections.SphericalMercator.getGeoPointByPixel(event.getPixel(), 10, 256));

                        /*_center = event.getGeoPoint();
                this.fireEvent('CenterChanging');*/
            }
            
            function _addDomListeners()
            {
                Utils_Dom.addListener(this.container, 'click', Utils_Common.bind(this, _handleDragging));
            }
        };

        constructor.prototype = Observable;
        constructor.prototype.parent = constructor.prototype;

        return constructor;
    }
);