/**
 * Abstract class. Provides an observable (subject) functionaity.
 * @see http://en.wikipedia.org/wiki/Observer_pattern
 * @constructor
 */
Crystal.Observable = function()
{
    /**
     * @type {Object} observers (listeners) of this Observable.
     */
    this._observers = {};
    
    /**
     * Returns an event object with information about this Observable.
     * This method should be overriden by child classes.
     */
    this.getEventObject = function()
    {
        throw new Error('getEventObject method should be implemented.');
    }
    
    /**
     * Registers the specified event(s) to the list of events which this Observable may fire.
     * @param {String|Array} eventName Event name or an array of the event names. Required.
     */
    this.registerEvent = function(eventName)
    {
        if(Object.prototype.toString.call(eventName) != '[object String]' && Object.prototype.toString.call(eventName) != '[object Array]')
        {
            throw new TypeError('registerEvent method called with invalid event name(s).');
        }
        
        if(Object.prototype.toString.call(eventName) == '[object String]')
        {
            this._observers[eventName] = [];
        }
        else if (Object.prototype.toString.call(eventName) == '[object Array]')
        {
            for(var i = 0; i < eventName.length; i++)
            {
                this._observers[eventName[i]] = [];
            }
        }
    }
    
    /**
     * Appends an event handler to this object.
     * @param {String} eventName The name of the event to listen for. Required.
     * @param {Function} handler The method the event invokes. Required.
     */
    this.addListener = function(eventName, handler)
    {
        if(Object.prototype.toString.call(eventName) != '[object String]' || typeof(this._observers[eventName]) == 'undefined')
        {
            throw new TypeError('addListener method called with invalid event name.');
        }

        if(Object.prototype.toString.call(handler) != '[object Function]')
        {
            throw new TypeError('addListener method called with invalid handler.');
        }

        this._observers[eventName].push(handler);
    }
    
    /**
     * Removes an event handler.
     * @param {String} eventName The name of event the handler was associated with. Required.
     * @param {Function} handler The handler to remove. Must be a reference to the function passed into the addListener call. Required.
     */
    this.removeListener = function(eventName, handler)
    {
        if(Object.prototype.toString.call(eventName) != '[object String]' || typeof(this._observers[eventName]) == 'undefined')
        {
            throw new TypeError('removeListener method called with invalid event name.');
        }
        
        if(this._observers[eventName].indexOf(handler) == -1)
        {
            throw new TypeError('removeListener method called with invalid handler.');
        }
        
        this._observers[eventName].splice(this._observers[eventName].indexOf(handler), 1);
    }
    
    /**
     * Fires the event.
     * @param {String} eventName The name of event must be fired. Required.
     */
    this.fireEvent = function(eventName)
    {
        if(typeof(this._observers[eventName]) == 'undefined')
        {
            throw new TypeError('fireEvent method called with invalid event name.');
        }
        
        for(var i = 0; i < this._observers[eventName].length; i++)
        {
            this._observers[eventName][i].call(this, this.getEventObject());
        }
    }
}