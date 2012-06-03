/**
 * Common utils module.
 * Provides a common utilities
 */
define({
    /**
     * Creates an unique id.
     * @param {String} prefix Id prefix. Optional.
     * @return {String} Generated id.
     */
    createUniqueId: function(prefix) {
        var date = new Date();
        var time = date.getTime();

        return prefix ? prefix + '_' + time : '' + time;
    },
    
    /**
     * Binds scope with a function
     * @param {Object} scope
     * @param {Function} func
     */
    bind: function(scope, func) {
        return function() {
            return func.apply(scope, arguments);
        };
    }
});