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
    }
}