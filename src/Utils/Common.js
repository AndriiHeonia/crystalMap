/**
 * Provides a common utilities.
 * @static
 */
Crystal.Utils.Common = {}

/**
 * Creates an unique id.
 * @static
 * @param {String} prefix Id prefix. Optional.
 * @return {String} Generated id.
 */
Crystal.Utils.Common.createUniqueId = function(prefix)
{
    var date = new Date;
    var time = date.getTime();
    
    return prefix ? prefix + '_' + time : '' + time;    
}

Crystal.Utils.Common.CLASS_NAME = 'Crystal.Utils.Common';