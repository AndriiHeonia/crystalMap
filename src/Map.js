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
        'MapRegister'
    ],
    function(
        Observable,
        Utils_Type,
        Validators_DomElement,
        Validators_GeoPoint,
        Validators_Number,
        Validators_NotNull,
        MapRegister
    ) {

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
    var _userObservers = [];


    /**
     * @constructor
     * @extends {Observable}
     */
    var func = function() {
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
                
            containerIsStr = Crystal.Utils.Type.isString(container);
            this.container = containerIsStr ? document.getElementById(container) : container;
                
            if(containerIsStr) {
                Validators_NotNull.validate(this.container, Crystal.Map.CLASS_NAME, 'initialize');
            }
            else {
                Validators_DomElement.validate(this.container, Crystal.Map.CLASS_NAME, 'initialize');
            }
            if(center) {
                Validators_GeoPoint.validate(center);
            }
            if(zoom) {
                Validators_Number.validate(zoom, Crystal.Map.CLASS_NAME, 'initialize');
            }
            
            this.container.innerHTML = '';
            this.container.style.position = 'relative';
            this.container.style.backgroundColor = '#F4F2EE';
            _center = center || {lat: 0, lon: 0};
            _zoom = zoom || 0;

            MapRegister.add(this);
                
            // events, which can be fired by this object
            this.registerEvent([
                'MapUpdating',
                'ZoomChanging',
                'CenterChanging'
            ]);
                
            //_addDomListeners.call(this);
         })();
    };

    func.prototype = Observable;

    return func;
});