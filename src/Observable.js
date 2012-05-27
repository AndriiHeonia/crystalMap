/**
 * Observable module.
 * Provides an observable (subject) functionaity.
 * @see http://en.wikipedia.org/wiki/Observer_pattern
 */
define(["Utils/Type"], function(Utils_Type) {
    /**
     * @type {Object} observers (listeners) of this Observable.
     */
    var _observers = {};

    return {
        /**
         * Returns an event object with information about this Observable.
         * This method should be overriden by child classes.
         */
        getEventObject: function() {
            throw new Error('getEventObject method should be implemented.');
        },
        
        /**
         * Registers the specified event(s) to the list of events which this Observable may fire.
         * @param {String|Array} eventName Event name or an array of the event names. Required.
         */
        registerEvent: function(eventName) {
            if(Utils_Type.isString(eventName) === false && Utils_Type.isArray(eventName) === false) {
                throw new TypeError('registerEvent method called with invalid event name(s).');
            }
            
            if(Utils_Type.isString(eventName) === true) {
                _observers[eventName] = [];
            }
            else if(Utils_Type.isArray(eventName) === true) {
                for(var i = 0; i < eventName.length; i++) {
                    _observers[eventName[i]] = [];
                }
            }
        },

        /**
         * Appends an event handler to this object.
         * @param {String} eventName The name of the event to listen for. Required.
         * @param {Function} handler The method the event invokes. Required.
         */
        addListener: function(eventName, handler) {
            if(Utils_Type.isString(eventName) === false || Utils_Type.isUndefined(this._observers[eventName]) === true) {
                throw new TypeError('addListener method called with invalid event name.');
            }

            if(Utils_Type.isFunction(handler) === false) {
                throw new TypeError('addListener method called with invalid handler.');
            }

            _observers[eventName].push(handler);
        },
        
        /**
         * Removes an event handler.
         * @param {String} eventName The name of event the handler was associated with. Required.
         * @param {Function} handler The handler to remove. Must be a reference to the function passed into the addListener call. Required.
         */
        removeListener: function(eventName, handler) {
            if(Utils_Type.isString(eventName) === false || Utils_Type.isUndefined(this._observers[eventName]) === true) {
                throw new TypeError('removeListener method called with invalid event name.');
            }
            
            if(_observers[eventName].indexOf(handler) == -1) {
                throw new TypeError('removeListener method called with invalid handler.');
            }
            
            _observers[eventName].splice(_observers[eventName].indexOf(handler), 1);
        },
        
        /**
         * Fires the event.
         * @param {String} eventName The name of event must be fired. Required.
         */
        fireEvent: function(eventName) {
            if(Utils_Type.isUndefined(this._observers[eventName]) === true) {
                throw new TypeError('fireEvent method called with invalid event name.');
            }
            
            for(var i = 0; i < this._observers[eventName].length; i++) {
                _observers[eventName][i].call(this, this.getEventObject());
            }
        }
    };
});