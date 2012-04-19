/**
 * Provides a common utilities.
 * @static
 */
Crystal.Utils.Common = {
    /**
     * Creates an unique id.
     * @static
     * @param {String} prefix Id prefix. Optional.
     * @return {String} Generated id.
     */
    createUniqueId: function(prefix)
    {
        var date = new Date;
        var time = date.getTime();

        return prefix ? prefix + '_' + time : '' + time;    
    },
    
    /**
     * Binds scope with a function
     * @todo to write spec
     * @param {Object} scope
     * @param {Function} func
     */
    bind: function(scope, func)
    {
        return function() {
            func.apply(scope, arguments);
        }
    }
}