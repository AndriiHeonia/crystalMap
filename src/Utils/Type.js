/**
 * Provides a type checking utilities.
 * @static
 */
Crystal.Utils.Type = {
    /**
     * Checks String type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isString: function(object)
    {
        return Object.prototype.toString.call(object) === '[object String]';
    },

    /**
     * Checks Number type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isNumber: function(object)
    {
        return Object.prototype.toString.call(object) === '[object Number]';
    },

    /**
     * Checks Boolean type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isBoolean: function(object)
    {
        return Object.prototype.toString.call(object) === '[object Boolean]';
    },

    /**
     * Checks Array type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isArray: function(object)
    {
        return Object.prototype.toString.call(object) === '[object Array]';
    },

    /**
     * Checks Function type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isFunction: function(object)
    {
        return Object.prototype.toString.call(object) === '[object Function]';
    },

    /**
     * Checks undefined type.
     * @static
     * @param {Object} object Any value should be checked. Required.
     * @return {Boolean}
     */
    isUndefined: function(object)
    {
        return typeof(object) === 'undefined';
    }    
}